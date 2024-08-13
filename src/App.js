import React, { useState } from 'react';
import './App.css';  // これにより、CSSファイルがインポートされます

const apiKey = process.env.REACT_APP_OPENAI_API_KEY;

function App() {
  const [imageUrl, setImageUrl] = useState('');
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [count, setCount] = useState(10);
  const [totalCount, setTotalCount] = useState(0); // 累計カウント用のステート
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
    if (isGenerating) return; // 生成中なら無視

    setCount(prevCount => prevCount - 1);
    setTotalCount(prevTotal => prevTotal + 1); // ボタンを押すごとに累計カウントを増やす

    if (count - 1 === 0) {
      setIsGenerating(true); // 生成中フラグを立てる

      try {
        const imageUrl = await generateImage();
        setImageUrl(imageUrl);

        const description = await generateDescription();
        setName(description.name);
        setDescription(description.char);

      } catch (error) {
        console.error("Error generating image or description:", error);
      } finally {
        setIsGenerating(false); // 生成が終わったらフラグを戻す
        setCount(10); // カウントをリセット
      }
    }
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial', background: '#111',height: '100%' }}>
      <div className='ai-evolution'>

        <div className='Image'>
          {imageUrl && <img src={imageUrl} alt="Generated Character" style={{ width: '80%', height: '80%', objectFit: 'contain', padding: '2vw'}} />}
        </div>

        <div className='Level'>
          <div style={{ display: 'flex', marginBottom: '20px', justifyContent: 'flex-start' }}>
            <div style={{ padding: '50px' }}>
              <h3>いまの経験値</h3>
              <h1>{totalCount}</h1>
            </div>
            <div style={{ padding: '50px' }}>
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
      <button className='click-button' onClick={handleClick} disabled={isGenerating}></button>
    </div>
  );
}

export default App;
