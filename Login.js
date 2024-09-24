import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Login({ onLogin }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState(''); 
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('https://api.jsonbin.io/v3/b/66edd349acd3cb34a8883822/latest', {
        headers: {
          'X-Master-Key': '$2a$10$TRg9uhpN518zGFmD8frOc.BinTYz0ProIsQzjfvDUiFGBcm7ExPYq'
        }
      });
      const binData = await response.json();
      const users = Array.isArray(binData.record) ? binData.record : [];

      const user = users.find(user => user.username === username && user.password === password);

      if (user) {
        onLogin();
        navigate('/');
      } else {
        setMessage('Invalid username or password');
      }
    } catch (error) {
      console.error('Error fetching user data:', error);
      setMessage('An error occurred during login');
    }
  };

  return (
    <div style={{ backgroundColor:'#ddd',color:'darkred', width: '350px', margin: '0 auto' }} className="container col-md-4 mt-5 text-center">
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="loginUsername" className="form-label">Username</label>
          <input
            type="text"
            className="form-control"
            id="loginUsername"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="loginPassword" className="form-label">Password</label>
          <input
            type="password"
            className="form-control"
            id="loginPassword"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button type="submit" className="btn btn-primary">Login</button>
      </form>
      {message && <div className="mt-3 alert alert-danger">{message}</div>}
    </div>
  );
}

export default Login;
