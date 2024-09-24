import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

function Signup() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [storedData, setStoredData] = useState([]); // Ensure it's an array

  const handleSignup = (e) => {
    e.preventDefault();

    // Generate new ID
    const newId = storedData.length > 0 ? Math.max(...storedData.map(user => user.id)) + 1 : 1;

    const userData = {
      id: newId,
      username,
      email,
      password,
    };

    const newData = [...storedData, userData]; // Push new user data to existing data
    const data = JSON.stringify({ record: newData });

    const config = {
      method: 'PUT',
      url: 'https://api.jsonbin.io/v3/b/66edd349acd3cb34a8883822',
      headers: {
        'Content-Type': 'application/json',
        'X-Master-Key': '$2a$10$TRg9uhpN518zGFmD8frOc.BinTYz0ProIsQzjfvDUiFGBcm7ExPYq',
      },
      data: data,
    };

    axios(config)
      .then((response) => {
        console.log(response.data);
        setMessage('Signup successful! User data stored.');
        fetchStoredData();
        clearForm();
      })
      .catch((error) => {
        console.error('Error:', error);
        setMessage('Signup failed.');
      });
  };

  const fetchStoredData = () => {
    const config = {
      method: 'GET',
      url: 'https://api.jsonbin.io/v3/b/66edd349acd3cb34a8883822/latest',
      headers: {
        'X-Master-Key': '$2a$10$TRg9uhpN518zGFmD8frOc.BinTYz0ProIsQzjfvDUiFGBcm7ExPYq',
      },
    };

    axios(config)
      .then((response) => {
        // Ensure the fetched record is an array
        setStoredData(Array.isArray(response.data.record) ? response.data.record : []);
        console.log('Stored data:', response.data.record);
      })
      .catch((error) => {
        console.error('Error fetching stored data:', error);
      });
  };

  const clearForm = () => {
    setUsername('');
    setEmail('');
    setPassword('');
  };

  useEffect(() => {
    fetchStoredData();
  }, []);

  return (
    <div className="container mt-5">
      <h2>Signup</h2>
      <form onSubmit={handleSignup} className="mb-4">
        <div className="mb-3">
          <label className="form-label">Username:</label>
          <input
            type="text"
            className="form-control"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Email:</label>
          <input
            type="email"
            className="form-control"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Password:</label>
          <input
            type="password"
            className="form-control"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">Signup</button>
      </form>
      {message && <div className="alert alert-info">{message}</div>}
    </div>
  );
}

export default Signup;
