// src/pages/HowToUse.js
import React, { useState, useEffect } from 'react';
import './Product.css';
import axios from 'axios';

function Product() {
  const [selectedImage, setSelectedImage] = useState(null);
  const [loading, setLoading] = useState(false); // To manage loading state
  const [result, setResult] = useState(null); // To store the result message
  const formData = new FormData();

  const handleImageChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      setSelectedImage(event.target.files[0]);
      setResult(null); //reset result message when new image is uploaded
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!selectedImage) {
      alert("Please upload an image!");
      return;
    }
    const formData = new FormData();
    formData.append("file", selectedImage);

    // if<  0.5 benign (1 - number)

    try {
      const res = await axios.post("http://localhost:8000/upload/", formData, {
          headers: {
              "Content-Type": "multipart/form-data",
          },
      });
      const responseObject = JSON.parse(res.data);
      const number = responseObject.predictions[0][0][0];
      if (number < 0.5) {
        setResult(
          `Our model has identified your lesion as potentially benign with a probability of ${Math.floor((1-number)*100)}%. However, please note that distinguishing between benign and malignant lesions can be challenging based on visual inspection alone, even for dermatologists. This machine-learning result is intended as diagnostic support and should not replace a medical diagnosis. We strongly recommend consulting a dermatologist for a thorough assessment, as a biopsy may be necessary for complete accuracy. For more information on our model’s inner workings, please visit the Model Details page.`
        );
      } else {
        setResult(
          `Our model has identified your lesion as potentially malignant with a probability of ${Math.floor(number * 100)}%. However, please note that distinguishing between benign and malignant lesions can be challenging based on visual inspection alone, even for dermatologists. This machine-learning result is intended as diagnostic support and should not replace a medical diagnosis. We strongly recommend consulting a dermatologist for a thorough assessment, as a biopsy may be necessary for complete accuracy. For more information on our model’s inner workings, please visit the Model Details page.`
        )
      }
      
      console.log(number);
    } catch (error) {
        console.error("Error uploading the file:", error); // Log any errors
    }
  }

  return (
    <div className="how-to-container">
      <h1>How to Use the Product</h1>

      {/* Step 1 */}
      <div className="step">
        <h2>Step 1: Upload Image</h2>
        <input type="file" accept="image/*" onChange={handleImageChange} />
        {selectedImage && (
          <p className="image-preview">Image selected: {selectedImage.name}</p>
        )}
        <ul className="instructions">
          <li>Use the Highest-Quality Camera Available: Please take photos with the best camera accessible to you (e.g., smartphone, digital camera).</li>
          <li>Make Sure it’s a Skin Lesion: we define a lesion as a pigmented region of the skin, usually called a birth-mark or a mole.</li>
          <li>Center the Lesion: Position the camera close enough so that the lesion is clearly the focal point of the image.</li>
          <li>Ensure Clear Focus and Lighting: Make sure the image is in focus, in well-lit conditions, and free of shadows.</li>
          <li>Ensure JPEG File Type: Convert your image to JPEG.</li>
        </ul>
      </div>

      {/* Step 2 */}
      <div className="step">
        <h2>Step 2: Generate Diagnostic Support</h2>
        <button onClick={handleSubmit} className="save-button">
          Generate Diagnostic Support
        </button>

         {/* Show loading message with moving dots */}
         {loading && (
          <div className="loading">
            <span>Generating Results</span>
            <span className="dots">...</span>
          </div>
        )}

        {/* Show result after processing */}
        {result && (
          <div className="result">
            <p>{result}</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default Product;
