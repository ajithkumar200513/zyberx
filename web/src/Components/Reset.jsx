import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Reset = () => {
  const [password, setNewPassword] = useState('');
  const [cpass, setCpass] = useState('');
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const navigate = useNavigate();

  const handleClick = async (e) => {
    e.preventDefault();
    const token = window.location.pathname.split("/").pop();
    if (password === cpass) {
      const response = await fetch(`http://localhost:4000/Ak_Web/User/reset/${token}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ newPassword: password }),
      });
      if (response.ok) {
        setSuccessMessage("Password successfully changed.");
        setTimeout(() => navigate('/'), 2000); // Redirect after 2 seconds
      } else {
        setError("Something went wrong. Please try again.");
      }
    } else {
      setError("Passwords do not match.");
    }
  };

  return (
    <div className="reset-container">
      <style>
        {`
          body {
            font-family: 'Arial', sans-serif;
            margin: 0;
            padding: 0;
            background: url('https://kosichi.ca/wp-content/uploads/2022/06/IT-Solution-Design-Dubai-UAE.jpg') no-repeat center center fixed;
            background-size: cover;
          }
          .reset-container {
            display: flex;
            justify-content: center;
            align-items: center;
            height: 100vh;
            padding: 20px;
            background: rgba(0, 0, 0, 0.6);
          }
          .reset-form-container {
            background: #fff;
            padding: 40px;
            border-radius: 8px;
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
            max-width: 400px;
            width: 100%;
            opacity: 0;
            animation: fadeIn 1s forwards;
          }
          .reset-header {
            text-align: center;
            margin-bottom: 20px;
          }
          .reset-header h2 {
            font-size: 1.8rem;
            color: #007bff;
            margin-bottom: 10px;
            font-weight: bold;
          }
          .reset-header p {
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
          .success-message {
            color: green;
            text-align: center;
            margin-top: 20px;
          }
          @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
          }
        `}
      </style>

      <div className="reset-form-container">
        <div className="reset-header">
          <h2>Reset Password</h2>
          <p>Enter your new password below.</p>
        </div>
        <form onSubmit={handleClick}>
          <div className="form-group">
            <label htmlFor="np">New Password</label>
            <input
              id="np"
              type="text"
              value={password}
              onChange={(e) => setNewPassword(e.target.value)}
              placeholder="Enter new password"
            />
          </div>
          <div className="form-group">
            <label htmlFor="cp">Confirm Password</label>
            <input
              id="cp"
              type="text"
              value={cpass}
              onChange={(e) => setCpass(e.target.value)}
              placeholder="Confirm new password"
            />
          </div>
          <button type="submit">Change Password</button>
        </form>
        {error && <div className="error-message">{error}</div>}
        {successMessage && <div className="success-message">{successMessage}</div>}
      </div>
    </div>
  );
};

export default Reset;
