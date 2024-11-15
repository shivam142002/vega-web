// src/components/AddCaptionPage.js
import React from 'react';
import CanvasEditor from './CanvasEditor';
const AddCaptionPage = ({ imageUrl }) => {
  // Display a message if no image is selected
  if (!imageUrl) {
    return <p>No image selected. Go back and select an image.</p>;
  }

  return (
    <div className="add-caption-page">
      <h2>Selected Image</h2>
      <div className="add-caption-page">
      <h2>Canvas Editor</h2>
      <CanvasEditor imageUrl={imageUrl} />
    </div>
    </div>
  );
};

export default AddCaptionPage;
