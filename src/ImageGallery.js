// src/ImageGallery.js
import React from 'react';
import imageData from './Data';

const ImageGallery = () => {
  return (
    <div>
      <div style={{ display: 'flex', flexWrap: 'wrap' }}>
        {imageData.map((image) => (
          <div key={image.id} style={{ margin: '10px' }}>
            <img src={image.url} alt={image.description} style={{ width: '80%', height: '80%', objectFit: 'contain', padding: '2vw' }} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ImageGallery;
