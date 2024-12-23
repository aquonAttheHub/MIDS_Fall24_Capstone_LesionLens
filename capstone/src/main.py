from fastapi import FastAPI, UploadFile, HTTPException
from fastapi_cache import FastAPICache
from fastapi_cache.decorator import cache
from fastapi_cache.backends.redis import RedisBackend
from fastapi.middleware.cors import CORSMiddleware

from redis.asyncio import Redis
from contextlib import asynccontextmanager

from typing import Any

import torch
import torchvision
import asyncio

from PIL import Image
from hashlib import sha256
import io
import os
import json
import logging
import numpy as np
import cv2
from detectron2.config import get_cfg # masking library
from detectron2.engine import DefaultPredictor # masking library
from dotenv import load_dotenv

from sagemaker.tensorflow import TensorFlowModel
import boto3

# 4 Main tabs - home page, info about data and model, app itself (define terms), meet the team page
# pip install -r requirements.txt + pip install git+https://github.com/facebookresearch/detectron2.git

load_dotenv()

logger = logging.getLogger(__name__)

#LOCAL_REDIS_URL = "redis://localhost:6379/"

# Creat AWS Boto3 Client Session
sagemaker_runtime = boto3.client('sagemaker-runtime', aws_access_key_id=os.getenv("AWS_ACCESS_KEY_ID"),
            aws_secret_access_key=os.getenv("AWS_SECRET_ACCESS_KEY"),
            region_name=os.getenv("REGION_NAME"))


@asynccontextmanager
async def lifespan_mechanism(app: FastAPI):
    logging.info("Starting Up LesionLens Application")
    
    # Load the Redis Cache
    redis = Redis(host="localhost", port=6379, decode_responses=True)  # Adjust host/port as needed
    backend = RedisBackend(redis)
    FastAPICache.init(backend, prefix="fastapi-cache")

    yield
    # We don't need a shutdown event for our system, but we could put something
    # here after the yield to deal with things during shutdown
    logging.info("Shutting Down LesionLens Application")


async def invoke_model(model_name, payload):
    """Function to invoke a specific model on the SageMaker multi-model endpoint."""
    try:
        response = sagemaker_runtime.invoke_endpoint(
            EndpointName=model_name,
            ContentType='application/json',  # Use 'application/x-npy' if the model expects raw bytes
            Body=json.dumps(payload)
        )
        # Decode the response
        result = json.loads(response["Body"].read().decode())
        return result
    except Exception as e:
        return {model_name: str(e)}


app = FastAPI(lifespan=lifespan_mechanism)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # Allow requests from your frontend
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/")
def read_home():
	return {"message": "Welcome to LesionLens!"}
	

@app.get("/health")
def read_health():
	return {"status": "healthy"}


@app.get("/hello")
def say_hello(name : str):
	if name:
		return {"message": f"Hello {name}"}


@app.post("/upload")
async def get_image_classification(file: UploadFile):

    image_bytes = await file.read()
    image_hash = sha256(image_bytes).hexdigest()
    cache_backend = FastAPICache.get_backend() 
    cached_result = await cache_backend.get(image_hash)

    if cached_result:
        return cached_result

    resized_image = resize_image(image_bytes)
    hair_removed_image = remove_hair(resized_image)
    masked_image = mask_image(hair_removed_image)
    normalized_image = normalize_image(masked_image).astype(np.float32)
    input_data = np.expand_dims(normalized_image, axis=0)

    # Create request payload
    try:
        # Example preprocessing
        input_data_list = input_data.tolist()
        payload = {"instances": input_data_list}

        # List of your model names
        model_names = ["test-endpoint-serverless-ensemble-1", "test-endpoint-serverless-ensemble-2-1", "test-endpoint-serverless-ensemble-31", "test-endpoint-serverless-ensemble-4"]

        # Use asyncio.gather to call all models concurrently
        tasks = [invoke_model(model_name, payload) for model_name in model_names]
        ensemble_results = await asyncio.gather(*tasks)
        ensemble_results = np.array([ensemble_result["predictions"][0][0] for ensemble_result in ensemble_results]).flatten()
        ensemble_results = np.expand_dims(ensemble_results, axis=0)

        input_data_list = ensemble_results.tolist()
        payload = {"instances": input_data_list}

        response = sagemaker_runtime.invoke_endpoint(
            EndpointName="test-serverless-metalearn-nosenet-4-1",
            ContentType='application/json',  # Use 'application/x-npy' if the model expects raw bytes
            Body=json.dumps(payload)
        )
        body_content = response['Body'].read().decode()

        await cache_backend.set(image_hash, body_content) 

        return body_content

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


def resize_image(jpeg_image):
    # Resize input image to be (224, 224, 3)
    # input: jpeg_image (byte)
    # output: resized_image (numpy.ndarray)

    # Convert binary image to Pillow Image
    img = Image.open(io.BytesIO(jpeg_image))

    # Convert to numpy array (as OpenCV expects images in numpy array format)
    img_np = np.array(img).astype(np.uint8)

    # Resize using OpenCV
    resized_image = cv2.resize(img_np, (224, 224), interpolation=cv2.INTER_LANCZOS4).astype(np.uint8)

    # Return as np.uint8 (in case resizing changed dtype)
    return resized_image


def remove_hair(resized_image, white_pixel_threshold=1000):
    # Remove the hair in the image
    # input: resized_image (numpy.ndarray)
    # output: hair_removed_image (numpy.ndarray)

    # Convert to grayscale
    gray = cv2.cvtColor(resized_image, cv2.COLOR_BGR2GRAY)

    # Apply a black-hat filter (which highlights dark objects like hair on a light background)
    kernel = cv2.getStructuringElement(cv2.MORPH_RECT, (5, 5))
    blackhat = cv2.morphologyEx(gray, cv2.MORPH_BLACKHAT, kernel)

    # Apply a binary threshold to get the hair mask
    _, hair_mask = cv2.threshold(blackhat, 20, 255, cv2.THRESH_BINARY)

    # Calculate the sum of white pixels in the mask
    white_pixel_count = np.sum(hair_mask == 255)

    # If the number of white pixels is below the threshold, skip inpainting
    if white_pixel_count < white_pixel_threshold:
        return resized_image

    # Inpaint the original image using the hair mask
    hair_removed_image = cv2.inpaint(resized_image, hair_mask, inpaintRadius=1, flags=cv2.INPAINT_TELEA)


    # Convert image to RGB
    hair_removed_image = cv2.cvtColor(hair_removed_image, cv2.COLOR_BGR2RGB)

    # Return the hair removed image
    return hair_removed_image


def mask_image(hair_removed_image):
    # Mask image
    # input: hair_removed_image (numpy.ndarray)
    # output: masked_image (numpy.ndarray)

    # Read configuration and model weights paths for masking predictor
    config_path = '../mask_rcnn_config.yaml' # TODO: save yaml and insert proper path 
    # path on google drive: '/content/drive/MyDrive/MIDS 210A - Capstone Project/Code/mask_rcnn_config.yaml'

    model_weights_path = '../mask_rcnn_model_weights.pth' # TODO: save pth and insert proper path
    # path on google drive: '/content/drive/MyDrive/MIDS 210A - Capstone Project/Code/mask_rcnn_model_weights.pth'

    # Load the configuration and model weights
    cfg = get_cfg()
    cfg.merge_from_file(config_path)  # Loading the saved configuration
    cfg.MODEL.WEIGHTS = model_weights_path  # Loading the saved model weights
    cfg.MODEL.ROI_HEADS.SCORE_THRESH_TEST = 0.5  # Set the threshold for inference
    cfg.MODEL.DEVICE = "cpu"

    # Initialize the predictor with the loaded model
    predictor = DefaultPredictor(cfg)

    # Make predictions on the input image (RGB)
    outputs = predictor(hair_removed_image)

    # Extract predicted masks and confidence scores
    predicted_masks = outputs["instances"].pred_masks.to("cpu").numpy()
    predicted_scores = outputs["instances"].scores.to("cpu").numpy()

    # Check if any mask was detected
    if len(predicted_scores) > 0:
        # Select the mask with the highest confidence score
        highest_confidence_index = np.argmax(predicted_scores)
        highest_confidence_mask = predicted_masks[highest_confidence_index]

        # Create a binary mask (0 or 255)
        binary_predicted_mask = (highest_confidence_mask > 0).astype(np.uint8)

        # Apply the mask to the image (RGB)
        masked_image = cv2.bitwise_and(hair_removed_image, hair_removed_image, mask=binary_predicted_mask * 255)

        # Return masked_image
        return masked_image
    else:
    	# If no mask was found, return original image
        masked_image = hair_removed_image
        return masked_image


def normalize_image(masked_image):
	# Normalize image pixel values
	# input: masked_image (numpy.ndarray)
	# output: normalized_image (numpy.ndarray)

	# Get maximum pixel value
    max_pixel_value = np.max(masked_image)

    # If maximum pixel value is greater than 0 (preventing 0 division), then divide all pixels by maximum value
    if max_pixel_value > 0:
        normalized_image = masked_image / max_pixel_value  

    # Return normalized image
    return normalized_image


