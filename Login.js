import React, { useState } from 'react'; // Import React and useState together
import axios from 'axios'; // Import axios for API requests
import { useHistory } from 'react-router-dom'; // Import useHistory for navigation (React Router v5)
import { FaUser, FaLock } from 'react-icons/fa';

import './login.css';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const history = useHistory(); // Use useHistory instead of useNavigate

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:5000/api/login', {
        username,
        password,
      });

      if (response.data.message === 'Login successful') {
        // Navigate to my_collection.js on success
        history.push('/UniqueCollection');
      }
    } catch (error) {
      console.error('Login error:', error);
      setError(error.response?.data?.error || 'An error occurred');
    }
  };

  return (
    <div className="login-container">
      <form onSubmit={handleLogin}>
        <h2>Login</h2>
        <div className="input-container">
        <FaUser className="icon-user" />
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        </div>
        <div className='input-container'>
        <FaLock className='icon-lock'/>
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        </div>
        {error && <p className="error-message">{error}</p>}
        <button  className="login-btn" type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;
