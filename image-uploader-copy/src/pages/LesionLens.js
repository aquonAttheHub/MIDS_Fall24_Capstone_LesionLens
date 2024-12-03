import React from 'react';
import './LesionLens.css';

function LesionLens() {
  return (
    <div className="lesion-lens-container">
      <h1 className="lesion-header">The Problem</h1>
      <hr className="divider" />
      <p className="lesion-text">
        Melanoma is a malignant skin lesion with a substantial global impact, with incidence across the continents 
        ranging from approximately 8,000 in Africa to 150,000 in Europe 
        (<a href="https://gco.iarc.who.int/media/globocan/factsheets/cancers/16-melanoma-of-skin-fact-sheet.pdf" target="_blank" rel="noopener noreferrer">World Health Organization, 2020</a>).
        Early-stage melanomas, along with other malignant skin lesions, are often difficult to differentiate from 
        benign lesions by visual examination alone, even for trained clinicians. Thus, diagnostic processes for skin 
        lesions are inefficient, with unnecessary biopsy rates reaching up to 99.9% 
        (<a href="https://www.isic-archive.com/mission" target="_blank" rel="noopener noreferrer">International Skin Imaging Collaboration</a> n.d.),
        , leading to higher healthcare costs and potentially exacerbating patient anxiety. 
        Additionally, even in areas with access to dermatological care, patients face barriers such as high costs 
        and long wait times. In the United States, the average out-of-pocket cost for an uninsured dermatology 
        appointment is over $150, and wait times for consultations can extend up to 78 days (
        <a href="https://walkindermatology.com/how-much-does-it-cost-to-see-a-dermatologist-without-insurance/" target="_blank" rel="noopener noreferrer">Walk-in Dermatology</a>
        ,n.d-a, n.d.-b). The health risks associated with delayed or missed melanoma diagnoses emphasize the need 
        to improve visual diagnostic accuracy for skin lesions. The five-year survival rate of this skin cancer 
        ranges from 99% for stage 1 to 30% for stage 4 melanoma (
          <a href="https://www.healthline.com/health/melanoma-prognosis-and-survival-rates" target="_blank" rel="noopener noreferrer">Healthline</a>
          Healthline
        , 2023). Given the rapid growth of 
        smartphones and mobile health solutions, there is a promising opportunity to enhance access to care through 
        direct-to-consumer tele-consultation services for skin lesions. However, challenges remain, particularly 
        regarding the inconsistent quality of patient-acquired images in telemedicine (
          <a href="https://www.isic-archive.com/mission" target="_blank" rel="noopener noreferrer">International Skin Imaging Collaboration</a>
        , n.d.). Thus, we are motivated to develop a low-cost, non-invasive, and efficient diagnostic 
        tool for skin lesions.
      </p>


      <h1 className="lesion-header">Our Solution</h1>
      <hr className="divider" />
      <p className="lesion-text">
        Our solution, LesionLens, is a minimum viable product for a web application that offers near-instant visual 
        diagnostic support, providing insights on potential malignancy risk through a machine learning-powered model 
        that takes in user images. Recognizing the limitations of visual assessment, we aim to provide affordable 
        and rapid support to individuals concerned about skin lesions, with a focus on the following target users: 
        high-risk individuals with frequent atypical lesions; people who may avoid healthcare due to cost, 
        convenience, or past negative experiences; and broadly those seeking quick, reliable information about their 
        lesions. While LesionLens does not provide formal diagnoses, it offers diagnostic support and always directs 
        users to consult a dermatologist. Additionally, it provides general informational resources to help users 
        understand common lesion features, associated risks, the biopsy process and recommended next steps. LesionLens 
        sets itself apart from existing solutions through its affordability and direct-to-patient accessibility, 
        enabling use without a dermatologist or specialized imaging equipment. We offer clear photo-taking 
        instructions to address common quality issues with patient-acquired images and have designed our model to 
        handle image noise, lighting variations, and positioning inconsistencies.
      </p>
    </div>
  );
}
export default LesionLens;