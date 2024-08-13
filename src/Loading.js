// Loading.js
import React from 'react';
import './Loading.css';  // 必要に応じてスタイルを定義

const Loading = () => {
  return (
    <div className="loading-overlay">
      <div className="loading-spinner">
        {/* スピナーやローディングメッセージを表示 */}
        <div className="spinner"></div>
        <h3 className='loading-h3'>...画像生成中...</h3>
      </div>
    </div>
  );
};

export default Loading;
