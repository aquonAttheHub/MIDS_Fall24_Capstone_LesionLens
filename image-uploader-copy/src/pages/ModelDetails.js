import React from 'react';
import './LesionLens.css';

function ModelDetails() {
  return (
    <div className="lesion-lens-container">
      <h1 className="lesion-header">Data Sources</h1>
      <hr className="divider" />
      <p className="lesion-text">
        The image data we used came from 5 different sources: the BCN_20000 Dataset (
        <a href="https://www.nature.com/articles/sdata2018161" target="_blank" rel="noopener noreferrer">Department of Dermatology, Hospital Clínic de Barcelona</a>
        , n.d.), the HAM10000 Dataset (
        <a href="https://www.nature.com/articles/sdata2018161" target="_blank" rel="noopener noreferrer">ViDIR Group, Department of Dermatology, Medical University of Vienna</a>
        , n.d.), the MSK Dataset (
        <a href="https://arxiv.org/abs/1710.05006" target="_blank" rel="noopener noreferrer">Anonymous</a>
        , n.d.), and the SIIM-ISIC 2020 Challenge Dataset (
        <a href="https://challenge2020.isic-archive.com/" target="_blank" rel="noopener noreferrer">International Skin Imaging Collaboration</a>
        , n.d.). After combining these datasets, we cleaned the resulting data by deduplicating 
        images and removing unlabeled, inconsistently labeled, and inconclusively labeled images. 
        This left us with approximately 20,000 images. The data’s main label was a binary target 
        indicating whether or not a lesion was malignant.
      </p>

      <h1 className="lesion-header">Image Data Processing</h1>
      <hr className="divider" />
      <p className="lesion-text">
        All images fed into our model underwent the following processing: first we resized the image, 
        then we ran a noise removal function that eliminated hair and other such noise, then we ran a masking 
        predictor to essentially blackout the skin surrounding the lesion, and then we normalized the RGB values. 
        Your input image will undergo the same such processing before being fed into our model. Please also note 
        that our backend ensures that your image is not stored anywhere to maintain ultimate privacy.
     </p>

      <h1 className="lesion-header">Image Augmentation</h1>
      <hr className="divider" />
      <p className="lesion-text">
        Before training our model, we augmented our training data using layered color, geometric, and warping 
        augmentations. This was our method of making our model more robust to noise in input data and variations 
        in image quality. This also serves to improve performance metrics by creating synthetic data for the 
        underrepresented malignant class.
      </p>

      <h1 className="lesion-header">Model Architecture</h1>
      <hr className="divider" />
      <p className="lesion-text">
        Our model is an ensemble of 4 hyperparameter-tuned and fine-tuned transfer learning models 
        well suited for image classification tasks like ours: MobileNet, Densenet121, Densenet169, 
        and Nasnetmobile. We utilized pruning methods to select the best 4 models out of the initial 
        set of models we had trained and tested. We ensembled the 4 chosen models using a Logistic 
        Regression meta-learner.
      </p>

      <h1 className="lesion-header">Model Evaluation</h1>
      <hr className="divider" />
      <p className="lesion-text">
        Here are our model’s performance metrics when tested on unseen data compared to the best external 
        models using the same data and the best dermatologist performance using similar data. As you can 
        see, certain metrics are not always disclosed, which complicates interpretation of performance. 
        Furthermore, the dermatologists’ performance demonstrates that the task of visually assessing 
        malignancy in lesions is a difficult feat, and further testing is often needed for reliable 
        assessment.
      </p>
      <hr className="divider" />
      <table className="model-performance-table">
        <thead>
          <tr>
            <th>Model Name</th>
            <th>Accuracy</th>
            <th>Precision</th>
            <th>Recall</th>
            <th>F1 Score</th>
            <th>AUC</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>*Internal Best Binary Ensemble Model</td>
            <td>87.4%</td>
            <td>86.7%</td>
            <td>87.4%</td>
            <td>86.6%</td>
            <td>76.1%</td>
          </tr>
          <tr>
            <td>External Best Binary Model</td>
            <td>88.8%</td>
            <td>Not reported.</td>
            <td>83.8%</td>
            <td>DNot reported.</td>
            <td>88.8%</td>
          </tr>
          <tr>
            <td>Dermatologists’ Best Binary Performance</td>
            <td>84.0%</td>
            <td>Not reported.</td>
            <td>85.5%</td>
            <td>Not reported.</td>
            <td>71.0%</td>
          </tr>
        </tbody>
      </table>
      <p className="definitions">
        <strong>Definitions:</strong> Accuracy is the proportion of correct predictions. 
        Precision is how often the model's positive predictions are correct. 
        Recall is how many of the actual positives the model found. 
        F1 score is a balance between precision and recall. 
        AUC is how good the model is at telling apart different classes.
      </p>
    </div>
  );
}

export default ModelDetails;