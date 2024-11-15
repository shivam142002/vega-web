

// src/components/App.js
import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import SearchBar from './components/SearchBar';
import ImageGrid from './components/ImageGrid';
import AddCaptionPage from './components/AddCaptionPage';

import './App.css';

const App = () => {
    // State to store fetched images and the selected image
  const [images, setImages] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);

  // Handles image search by querying the Unsplash API
  const handleSearch = async (query) => {
    try {
      const response = await fetch(`https://api.unsplash.com/search/photos?query=${query}&client_id=GNJ9P2c3vewJTtrKrhklk3Eran9xERLnb_TIs0ha5-Q`);
      const data = await response.json();
      setImages(data.results.map(img => img.urls.small));     // Map the results to extract small image URLs
    } catch (error) {
      console.error('Error fetching images:', error);
    }
  };

  return (
    <Router>
      <div className="app">
      
        <header className="header">
          <h2>Name - Shivam Kumar</h2>
          <a href="mailto:shivam142002@gmail.com" >
            Email - shivam142002@gmail.com
          </a>
        </header>
        <h1>Image Caption & Shape Editor</h1>
        <Routes>
          <Route 
            path="/" 
            element={
              <>
                <SearchBar onSearch={handleSearch} />
                <ImageGrid images={images} onSelectImage={setSelectedImage} />
              </>
            } 
          />
          <Route 
            path="/add-caption" 
            element={<AddCaptionPage imageUrl={selectedImage} />} 
          />
        </Routes>
      </div>
    </Router>
  );
};

export default App;


