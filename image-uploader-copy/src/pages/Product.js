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

    try {
      const res = await axios.post("http://localhost:8000/upload/", formData, {
          headers: {
              "Content-Type": "multipart/form-data",
          },
      });
      setResult(res.data); // Update state with server response
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
          <li>Center the Lesion: Position the camera close enough so that the lesion is clearly the focal point of the image.</li>
          <li>Ensure Clear Focus and Lighting: Make sure the image is in focus, in well-lit conditions, and free of shadows.</li>
          <li>Ensure JPEG File Type: Convert your image to JPEG.</li>
          <li>View Sample Images: For examples of acceptable photo quality, click the button below.</li>
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
