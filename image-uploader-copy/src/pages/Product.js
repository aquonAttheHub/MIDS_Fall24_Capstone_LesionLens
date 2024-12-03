// src/pages/HowToUse.js
import React, { useState } from 'react';
import './Product.css';

function Product() {
  const [selectedImage, setSelectedImage] = useState(null);
  const [loading, setLoading] = useState(false); // To manage loading state
  const [result, setResult] = useState(null); // To store the result message

  const handleImageChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      setSelectedImage(event.target.files[0]);
      setResult(null); //reset result message when new image is uploaded
    }
  };

  const handleSave = () => {
    if (selectedImage) {
      console.log("Image sent to model:", selectedImage);
      //make API call here
      alert("Image successfully sent to the model!");
      // Show loading state
      setLoading(true);

      // Simulate a 10-second delay to mock model processing
      setTimeout(() => {
        setLoading(false);
        
        // Simulate the result after 10 seconds
        setResult(
          "Our model has identified your lesion as potentially benign with a confidence level of 78%. However, please note that distinguishing between benign and malignant lesions can be challenging based on visual inspection alone, even for dermatologists. This machine-learning result is intended as diagnostic support and should not replace a medical diagnosis. We strongly recommend consulting a dermatologist for a thorough assessment, as a biopsy may be necessary for complete accuracy. For more information on our model’s inner workings, please visit the Model Details page."
        );
      }, 3000); // 10 seconds
    } else {
      alert("Please upload an image first.");
    }
  };

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
          <li>Center the Lesion: Position the camera close enough so that the lesion is clearly the focal point of the image.</li>
          <li>Ensure Clear Focus and Lighting: Make sure the image is in focus, in well-lit conditions, and free of shadows.</li>
          <li>Ensure JPEG File Type: Convert your image to JPEG.</li>
          <li>View Sample Images: For examples of acceptable photo quality, click the button below.</li>
        </ul>
      </div>

      {/* Step 2 */}
      <div className="step">
        <h2>Step 2: Generate Diagnostic Support</h2>
        <button onClick={handleSave} className="save-button">
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
