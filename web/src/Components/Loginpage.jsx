import React, { useState } from 'react';
import { UseAdminLogin } from '../Hooks/UseAdminLogin';
import { UseUserLogin } from '../Hooks/UseUserLogin';
import { Link } from 'react-router-dom';

const Loginpage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [type, setType] = useState('');
  const [showPassword, setShowPassword] = useState(false); // For toggling password visibility
  const { Adminlogin, error } = UseAdminLogin();
  const { Userlogin, usererror } = UseUserLogin();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (type === 'Admin') {
      await Adminlogin(email, password);
    } else if (type === 'User') {
      await Userlogin(email, password);
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
            background: url('https://kosichi.ca/wp-content/uploads/2022/06/IT-Solution-Design-Dubai-UAE.jpg') no-repeat center center fixed;
            background-size: cover;
          }
          .body-log {
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            min-height: 100vh;
            padding: 20px;
            opacity: 0;
            animation: fadeIn 1s forwards;
          }
          .header {
            width: 100%;
            text-align: center;
            padding: 20px;
            margin-bottom: 20px;
            opacity: 0;
            animation: fadeIn 1s 0.5s forwards;
          }
          .brand-name {
            font-size: 2rem;
            color: #fff;
            margin-bottom: 10px;
            animation: pulsate 1.5s infinite;
          }
          .tagline {
            font-size: 1.2rem;
            color: #fff;
            font-weight: bold;
            margin: 10px 0;
            animation: slideIn 1s 0.5s forwards;
          }
          .container {
            display: flex;
            flex-direction: row;
            justify-content: center;
            align-items: center;
            background-color: rgba(255, 255, 255, 0.9); /* Semi-transparent white background */
            padding: 40px;
            border-radius: 10px;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
            max-width: 900px;
            width: 100%;
            opacity: 0;
            animation: slideUp 1s 1s forwards;
          }
          .container-log {
            flex: 1;
            text-align: center;
          }
          h2 {
            margin-bottom: 20px;
            color: #333;
            font-size: 1.8rem;
          }
          .log-form {
            width: 100%;
          }
          .input-field {
            position: relative;
            margin-bottom: 20px;
          }
          input[type="text"],
          input[type="password"],
          select {
            width: 100%;
            padding: 12px 16px;
            border-radius: 8px;
            border: 1px solid #ddd;
            background-color: #f9f9f9;
            transition: 0.3s;
          }
          input[type="text"]:focus,
          input[type="password"]:focus,
          select:focus {
            border-color: #007bff;
            background-color: #fff;
            outline: none;
          }
          .underline {
            height: 2px;
            width: 100%;
            background-color: #007bff;
            position: absolute;
            bottom: 0;
            left: 0;
            transform: scaleX(0);
            transition: transform 0.3s ease-in-out;
          }
          input:focus + .underline {
            transform: scaleX(1);
          }
          select {
            margin-bottom: 20px;
            padding: 12px;
          }
          .input-field-password {
            position: relative;
          }
          .show-password {
            position: absolute;
            right: 15px;
            top: 50%;
            transform: translateY(-50%);
            cursor: pointer;
          }
          input[type="submit"] {
            width: 100%;
            padding: 12px;
            background-color: #007bff;
            color: white;
            font-weight: bold;
            border-radius: 8px;
            border: none;
            cursor: pointer;
            transition: background-color 0.3s;
          }
          input[type="submit"]:hover {
            background-color: #0056b3;
          }
          /* Error message style */
          .error-message {
            color: red;
            margin-top: 20px;
            text-align: center;
          }
          /* Freelance image styling */
          .image-container {
            flex: 1;
            display: flex;
            justify-content: center;
            align-items: center;
          }
          .freelance-image {
            max-width: 400px;
            width: 100%;
            height: auto;
            border-radius: 10px;
          }
          /* Responsive Styles */
          @media (max-width: 768px) {
            .container {
              flex-direction: column;
              padding: 30px;
            }
            .freelance-image {
              max-width: 300px;
            }
            h2 {
              font-size: 1.5rem;
            }
          }
          @media (max-width: 480px) {
            input[type="text"],
            input[type="password"],
            select {
              padding: 10px;
              font-size: 1rem;
            }
            input[type="submit"] {
              padding: 10px;
              font-size: 1rem;
            }
            .show-password {
              right: 10px;
            }
            .freelance-image {
              max-width: 250px;
            }
          }
          @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
          }
          @keyframes slideIn {
            from { transform: translateY(-20px); opacity: 0; }
            to { transform: translateY(0); opacity: 1; }
          }
          @keyframes slideUp {
            from { transform: translateY(20px); opacity: 0; }
            to { transform: translateY(0); opacity: 1; }
          }
          @keyframes pulsate {
            0% { transform: scale(1); color: #fff; }
            50% { transform: scale(1.1); color: #ffdd57; }
            100% { transform: scale(1); color: #fff; }
          }
        `}
      </style>

      <div className="body-log">
        <div className="header">
          <div className="brand-name">AK Solutions and Services</div>
          <div className="tagline">
          Your Trusted Partner in Success
          </div>
          
        </div>
        <div className="container">
          <main className="container-log">
            <h2>Login</h2>
            <form onSubmit={handleSubmit} className="log-form">
              <div>
                <label htmlFor="user">Select Usertype</label>
                <select
                  id="user"
                  value={type}
                  onChange={(e) => setType(e.target.value)}
                >
                  <option value="">Select</option>
                  <option value="Admin">Admin</option>
                  <option value="User">User</option>
                </select>
              </div>
              <div className="input-field">
                <input
                  type="text"
                  name="username"
                  id="username"
                  placeholder="Enter Your Username"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <div className="underline"></div>
              </div>
              <div className="input-field input-field-password">
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  id="password"
                  placeholder="Enter Your Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <span
                  className="show-password"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? '👁️' : '👁️‍🗨️'}
                </span>
                <p><Link to = '/user/forgotpass'>Forgot password</Link></p>
                <div className="underline"></div>
              </div>
              <input type="submit" value="Login" />
            </form>
            <p>Don't have an account? <Link to='/user/signup'>Signup</Link></p>
          </main>
          <div className="image-container">
            <img
              src="https://miro.medium.com/v2/resize:fit:1400/0*zMJATOkFHNFakSr5.png" // Freelance project image link
              alt="Freelance Projects"
              className="freelance-image"
            />
          </div>
        </div>
        {error && <div className="error-message">{error}</div>}
        {usererror && <div className="error-message">{usererror}</div>}
      </div>
    </div>
  );
};

export default Loginpage;
