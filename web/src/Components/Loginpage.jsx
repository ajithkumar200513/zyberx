import React, { useState } from 'react';
import { UseAdminLogin } from '../Hooks/UseAdminLogin';
import { UseUserLogin } from '../Hooks/UseUserLogin';
import { Link } from 'react-router-dom';
import { FaFacebookF, FaLinkedinIn, FaInstagram, FaTwitter } from 'react-icons/fa'; // Import updated icons

const Loginpage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [type, setType] = useState('');
  const [showPassword, setShowPassword] = useState(false);
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
    <div className="login-container">
      <style>
        {`
          body {
            font-family: 'Arial', sans-serif;
            margin: 0;
            padding: 0;
            background: url('https://kosichi.ca/wp-content/uploads/2022/06/IT-Solution-Design-Dubai-UAE.jpg') no-repeat center center fixed;
            background-size: cover;
          }
          .login-container {
            display: flex;
            justify-content: center;
            align-items: center;
            height: 100vh;
            padding: 20px;
            background: rgba(0, 0, 0, 0.6);
          }
          .login-form-container {
            background: #fff;
            padding: 40px;
            border-radius: 8px;
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
            max-width: 500px;
            width: 100%;
            opacity: 0;
            animation: fadeIn 1s forwards;
          }
          .brand-name {
            font-size: 2rem;
            color: #007bff;
            text-align: center;
            margin-bottom: 10px;
            font-weight: bold;
          }
          .tagline {
            font-size: 1.2rem;
            color: #333;
            text-align: center;
            margin-bottom: 30px;
            font-weight: normal;
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
          input[type="text"],
          input[type="password"],
          select {
            width: 100%;
            padding: 12px;
            border-radius: 4px;
            border: 1px solid #ddd;
            background-color: #f9f9f9;
            transition: border-color 0.3s, background-color 0.3s;
          }
          input[type="text"]:focus,
          input[type="password"]:focus,
          select:focus {
            border-color: #007bff;
            background-color: #fff;
            outline: none;
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
            color: #fff;
            font-weight: bold;
            border-radius: 4px;
            border: none;
            cursor: pointer;
            transition: background-color 0.3s;
          }
          input[type="submit"]:hover {
            background-color: #0056b3;
          }
          .error-message {
            color: red;
            text-align: center;
            margin-top: 20px;
          }
          .form-link {
            text-align: center;
            margin-top: 20px;
          }
          .form-link a {
            color: #007bff;
            text-decoration: none;
          }
          .form-link a:hover {
            text-decoration: underline;
          }
          .social-buttons {
            display: flex;
            justify-content: center;
            margin-top: 20px;
          }
          .social-buttons a {
            margin: 0 10px;
            display: flex;
            align-items: center;
            justify-content: center;
            width: 40px;
            height: 40px;
            background: #f1f1f1;
            border-radius: 50%;
            color: #333;
            font-size: 1.2rem;
            transition: background 0.3s, color 0.3s;
          }
          .social-buttons a:hover {
            background: #007bff;
            color: #fff;
          }
          @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
          }
        `}
      </style>

      <div className="login-form-container">
        <div className="brand-name">ZyberX</div>
        <div className="tagline">Innovate Beyond Boundaries</div>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="user">Select User Type</label>
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
          <div className="form-group">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              name="username"
              id="username"
              placeholder="Enter Your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <div style={{ position: 'relative' }}>
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
            </div>
          </div>
          <input type="submit" value="Login" />
        </form>
        <div className="form-link">
          <p><Link to='/user/forgotpass'>Forgot password?</Link></p>
          <p>Don't have an account? <Link to='/user/signup'>Signup</Link></p>
        </div>
        <div className="social-buttons">
          <a href="#"><FaFacebookF /></a>
          <a href="#"><FaLinkedinIn /></a>
          <a href="https://www.instagram.com/zyberxss/?igsh=a3VmM3FkbXhwOTVw"><FaInstagram /></a>
          <a href="https://x.com/ZyberxSs"><FaTwitter /></a>
        </div>
        {error && <div className="error-message">{error}</div>}
        {usererror && <div className="error-message">{usererror}</div>}
      </div>
    </div>
  );
};

export default Loginpage;
