import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Forgotpass = () => {
  const [Email, setEmail] = useState('');
  const navigate = useNavigate();

  const handleClick = async (e) => {
    e.preventDefault();
    const response = await fetch('https://ak-solution-and-service.onrender.com/Ak_Web/User/forgotpass', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: Email }),
    });
    if (response.ok) {
      window.alert('Reset password link has been sent to your email address');
      navigate('/');
    } else {
      window.alert('Something went wrong');
    }
  };

  return (
    <div className="forgotpass-container">
      <style>
        {`
          body {
            font-family: 'Arial', sans-serif;
            margin: 0;
            padding: 0;
            background: url('https://kosichi.ca/wp-content/uploads/2022/06/IT-Solution-Design-Dubai-UAE.jpg') no-repeat center center fixed;
            background-size: cover;
          }
          .forgotpass-container {
            display: flex;
            justify-content: center;
            align-items: center;
            height: 100vh;
            padding: 20px;
            background: rgba(0, 0, 0, 0.6);
          }
          .forgotpass-form-container {
            background: #fff;
            padding: 40px;
            border-radius: 8px;
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
            max-width: 400px;
            width: 100%;
            opacity: 0;
            animation: fadeIn 1s forwards;
          }
          .forgotpass-header {
            text-align: center;
            margin-bottom: 20px;
          }
          .forgotpass-header h2 {
            font-size: 1.8rem;
            color: #007bff;
            margin-bottom: 10px;
            font-weight: bold;
          }
          .forgotpass-header p {
            color: #333;
          }
          .form-group {
            margin-bottom: 20px;
          }
          label {
            display: block;
            margin-bottom: 5px;
            color: #333;
            font-weight: bold;
          }
          input[type="text"] {
            width: 100%;
            padding: 12px;
            border-radius: 4px;
            border: 1px solid #ddd;
            background-color: #f9f9f9;
            transition: border-color 0.3s, background-color 0.3s;
          }
          input[type="text"]:focus {
            border-color: #007bff;
            background-color: #fff;
            outline: none;
          }
          button {
            width: 100%;
            padding: 12px;
            background-color: #007bff;
            color: #fff;
            font-weight: bold;
            border-radius: 4px;
            border: none;
            cursor: pointer;
            transition: background-color 0.3s;
          }
          button:hover {
            background-color: #0056b3;
          }
          .error-message {
            color: red;
            text-align: center;
            margin-top: 20px;
          }
          @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
          }
        `}
      </style>

      <div className="forgotpass-form-container">
        <div className="forgotpass-header">
          <h2>Forgot Password</h2>
          <p>Please enter your email address to receive a password reset link.</p>
        </div>
        <form onSubmit={handleClick}>
          <div className="form-group">
            <label htmlFor="email">Email Address</label>
            <input
              type="text"
              id="email"
              value={Email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email address"
            />
          </div>
          <button type="submit">Send Verification Link</button>
        </form>
      </div>
    </div>
  );
};

export default Forgotpass;
