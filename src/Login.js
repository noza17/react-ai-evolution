// src/Login.js
import React, { useState } from 'react';

const Login = ({ onLogin }) => {
  const [workspaceId, setWorkspaceId] = useState('');
  const [userId, setUserId] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    // 簡易なバリデーション
    if (workspaceId === '123' && userId === '456') {
      onLogin(workspaceId, userId);
    } else {
      alert('Invalid Workspace ID or User ID');
    }
  };

  return (
    <div style={{ width: '300px', margin: 'auto', padding: '50px', textAlign: 'center', border: '1px solid #ccc', borderRadius: '8px' , background: '#fff'}}>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: '15px' }}>
          <input
            type="text"
            placeholder="Workspace ID"
            value={workspaceId}
            onChange={(e) => setWorkspaceId(e.target.value)}
            style={{ width: '100%', padding: '10px', boxSizing: 'border-box' }}
            required
          />
        </div>
        <div style={{ marginBottom: '15px' }}>
          <input
            type="text"
            placeholder="User ID"
            value={userId}
            onChange={(e) => setUserId(e.target.value)}
            style={{ width: '100%', padding: '10px', boxSizing: 'border-box' }}
            required
          />
        </div>
        <button type="submit" style={{ padding: '10px 20px', backgroundColor: '#28a745', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
