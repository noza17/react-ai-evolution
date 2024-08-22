// src/Character.js
import React from 'react';
import './App.css';
import ImageGallery from './ImageGallery';
import Loading from './Loading';  // Loadingコンポーネントをインポート

const CharacterLevel = ({ totalCount, count, name, description, isGenerating, handleClick }) => {
  return (
    <div style={{ padding: '20px', fontFamily: 'Arial', height: '100%' }}>
      {isGenerating && <Loading />}  {/* ここでLoadingを表示 */}
      <div className='ai-evolution'>

        <div className='Image'>
          <ImageGallery />
          {/* {imageUrl && <img src={imageUrl} alt="Generated Character" style={{ width: '80%', height: '80%', objectFit: 'contain', padding: '2vw' }} />} */}
        </div>

        <div className='Level'>
          <div style={{ display: 'flex', marginBottom: '20px', justifyContent: 'flex-start' }}>
            <div className='Exp'>
              <h3>いまの経験値</h3>
              <h1>{totalCount}</h1>
            </div>
            <div className='Lv'>
              <h3>レベルアップまで</h3>
              <h1>{count}</h1>
            </div>
          </div>
          <div>
            <h2 className='name'>{name}</h2>
            <p style={{ fontSize: '30px' }}>{description}</p>
          </div>
        </div>
      </div>
      <button className='click-button' onClick={handleClick} disabled={isGenerating}>クリック</button>
    </div>
  );
};

export default CharacterLevel;
