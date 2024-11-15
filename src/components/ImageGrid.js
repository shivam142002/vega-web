
// src/components/ImageGrid.js
import React from 'react';
import { useNavigate } from 'react-router-dom';

const ImageGrid = ({ images, onSelectImage }) => {
  const navigate = useNavigate();


   // Handles image selection and navigates to AddCaptionPage
  const handleAddCaptionClick = (image) => {
    onSelectImage(image);
    navigate('/add-caption'); // Navigate to AddCaptionPage
  };

  return (
    <div className="image-grid">
      {images.map((image, index) => (
        <div key={index} className="image-card">
          <img src={image} alt="search result" />
          <button onClick={() => handleAddCaptionClick(image)}>Add Caption</button>
        </div>
      ))}
    </div>
  );
};

export default ImageGrid;
