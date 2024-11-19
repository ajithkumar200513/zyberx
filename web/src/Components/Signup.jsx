import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Signup = () => {
  const [Name, setName] = useState('');
  const [Email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [PhNo, setPhNo] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [Error, setError] = useState(null);
  const [loading, setLoading] = useState(false); // Loading state
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // Show animation
    const data = { name: Name, email: Email, password: password, phone: PhNo };
    try {
      const response = await fetch(
        'https://ak-solution-and-service.onrender.com/Ak_Web/User/signup',
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(data),
        }
      );
      if (response.ok) {
        setLoading(false); // Hide animation
        window.alert('Sign up completed');
        navigate('/');
      } else {
        const json = await response.json();
        setError(json.error);
        setLoading(false); // Hide animation
      }
    } catch (error) {
      setError('Something went wrong. Please try again.');
      setLoading(false); // Hide animation
    }
  };

  return (
    <div>
      <style>
        {`
          body {
            font-family: 'Arial', sans-serif;
            margin: 0;
            padding: 0;
            background-size: cover;
          }
          .body-signup {
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            min-height: 100vh;
            padding: 20px;
            background: #2F2F2F;
            position: relative;
          }
          .header {
            width: 100%;
            text-align: center;
            padding: 20px;
            margin-bottom: 20px;
          }
          .brand-name {
            font-size: 2rem;
            color: #ffd700;
            margin-bottom: 10px;
            font-weight: bold;
          }
          .tagline {
            font-size: 1.2rem;
            color: #fff;
            font-weight: bold;
            margin: 10px 0;
          }
          .container-signup {
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            background-color: black; 
            padding: 30px;
            border-radius: 10px;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
            max-width: 500px;
            width: 100%;
            position: relative;
          }
          form {
            width: 100%;
          }
          label {
            display: block;
            margin-bottom: 8px;
            color: #fff;
            font-size: 0.9rem;
            text-align: left;
          }
          input[type="text"],
          input[type="email"],
          input[type="password"] {
            width: calc(100% - 22px);
            padding: 10px;
            border-radius: 8px;
            border: 1px solid #ddd;
            background-color: #f9f9f9;
            margin-bottom: 15px;
            font-size: 0.9rem;
          }
          input[type="text"]:focus,
          input[type="email"]:focus,
          input[type="password"]:focus {
            border-color: #ffd700;
            background-color: #fff;
            outline: none;
          }
          .checkbox-container {
            display: flex;
            align-items: center;
            margin-bottom: 15px;
          }
          .show-password {
            margin-left: 5px;
            cursor: pointer;
            font-size: 0.9rem;
          }
          button {
            width: 100%;
            padding: 12px;
            background-color: #ffd700;
            color: #000;
            font-weight: bold;
            border-radius: 8px;
            border: none;
            cursor: pointer;
            transition: background-color 0.3s;
            font-size: 1rem;
          }
          button:hover {
            background-color: #ffcc00;
          }
          .error-message {
            color: red;
            margin-top: 10px;
            text-align: center;
            font-size: 0.9rem;
          }
          .loading-overlay {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.7);
            display: flex;
            justify-content: center;
            align-items: center;
            z-index: 10;
          }
          .rotating-circle {
            width: 50px;
            height: 50px;
            border: 5px solid #ffd700;
            border-top: 5px solid transparent;
            border-radius: 50%;
            animation: spin 1s linear infinite;
          }
          @keyframes spin {
            from {
              transform: rotate(0deg);
            }
            to {
              transform: rotate(360deg);
            }
          }
          @media (max-width: 768px) {
            .container-signup {
              padding: 20px;
            }
          }
          @media (max-width: 480px) {
            input[type="text"],
            input[type="email"],
            input[type="password"] {
              padding: 8px;
              font-size: 0.9rem;
            }
            button {
              padding: 10px;
              font-size: 0.9rem;
            }
          }
        `}
      </style>
      <div className="body-signup">
        <div className="header">
          <div className="brand-name">ZyberX</div>
          <div className="tagline">Innovate Beyond Boundaries</div>
        </div>
        <div className="container-signup">
          {loading && (
            <div className="loading-overlay">
              <div className="rotating-circle"></div>
            </div>
          )}
          <form onSubmit={handleSubmit}>
            <label>Name</label>
            <input
              type="text"
              onChange={(e) => setName(e.target.value)}
              value={Name}
              required
            />
            <label>Email</label>
            <input
              type="email"
              onChange={(e) => setEmail(e.target.value)}
              value={Email}
              required
            />
            <label>Phone Number</label>
            <input
              type="text"
              onChange={(e) => setPhNo(e.target.value)}
              value={PhNo}
              required
            />
            <label>Set Password</label>
            <input
              type={showPassword ? 'text' : 'password'}
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              required
            />
            <div className="checkbox-container">
              <input
                type="checkbox"
                id="showPassword"
                onChange={() => setShowPassword(!showPassword)}
                checked={showPassword}
              />
              <label htmlFor="showPassword" className="show-password">
                Show Password
              </label>
            </div>
            <button type="submit">Sign Up</button>
            {Error && <div className="error-message">{Error}</div>}
          </form>
        </div>
      </div>
    </div>
  );
};

export default Signup;
