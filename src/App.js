// src/App.js
import React, { useState } from 'react';
import './App.css';
import Login from './Login';
import Loading from './Loading';  // Loadingコンポーネントをインポート
import CharacterLevel from './Character';  // 新しいコンポーネントをインポート

const apiKey = process.env.REACT_APP_OPENAI_API_KEY;

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [workspaceId, setWorkspaceId] = useState('');
  const [userId, setUserId] = useState('');

  const handleLogin = (wsId, uId) => {
    setWorkspaceId(wsId);
    setUserId(uId);
    setIsLoggedIn(true);
  };

  const [imageUrl, setImageUrl] = useState('');
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [count, setCount] = useState(10);
  const [totalCount, setTotalCount] = useState(0); 
  const [isGenerating, setIsGenerating] = useState(false);

  const generateImage = async () => {
    const response = await fetch('https://api.openai.com/v1/images/generations', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: "dall-e-3",
        prompt: "アニメ風かわいいドラゴンのキャラクターを1024x1024の大きさの一枚絵で生成して",
        size: "1024x1024",
        quality: "standard",
        n: 1,
      }),
    });

    const data = await response.json();
    return data.data[0].url;
  };

  const generateDescription = async () => {
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: "gpt-4o",
        messages: [
          { role: "system", content: "You are a helpful assistant." },
          { role: "user", content: "かわいいドラゴンのキャラクターの名前と、性格100文字を出力してください。応答はJSON形式で、下記の形式にしてください。JSON以外は出力しないでください。マークアップの記号も付与しないでください。{name: (名前), char: (性格)}" },
        ],
      }),
    });

    const data = await response.json();
    return JSON.parse(data.choices[0].message.content);
  };

  const handleClick = async () => {
    if (isGenerating) return; 

    setCount(prevCount => prevCount - 1);
    setTotalCount(prevTotal => prevTotal + 1); 

    if (count - 1 === 0) {
      setIsGenerating(true); 

      try {
        const imageUrl = await generateImage();
        setImageUrl(imageUrl);

        const description = await generateDescription();
        setName(description.name);
        setDescription(description.char);

      } catch (error) {
        console.error("Error generating image or description:", error);
      } finally {
        setIsGenerating(false); 
        setCount(10); 
      }
    }
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial', height: '100%' }}>
      {isLoggedIn ? (
        <div>
          <p className='Login-p'>Workspace ID: {workspaceId}</p>
          <p className='Login-p'>User ID: {userId}</p>
          {/* {imageUrl && <img src={imageUrl} alt="Generated Character" style={{ width: '80%', height: '80%', objectFit: 'contain', padding: '2vw' }} />} */}
          <CharacterLevel
            totalCount={totalCount}
            count={count}
            name={name}
            description={description}
            isGenerating={isGenerating}
            handleClick={handleClick}
          />
        </div>
      ) : (
        <Login onLogin={handleLogin} />
      )}
      {isGenerating && <Loading />}  {/* ここでLoadingを表示 */}
    </div>
  );
}

export default App;
