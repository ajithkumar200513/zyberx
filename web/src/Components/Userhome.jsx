import React, { useEffect, useState } from 'react';
import { UseUserLogout } from '../Hooks/UseUserLogout';
import { UseUserContext } from '../Hooks/UseUserContext';

const UserHome = () => {
  const { logout } = UseUserLogout();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [contactNumber, setContactNumber] = useState('');
  const [address, setAddress] = useState('');
  const [productName, setProductName] = useState('');
  const [productDescription, setProductDescription] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [companyAddress, setCompanyAddress] = useState('');
  const { User } = UseUserContext();
  const [Data, setData] = useState([]);

  const handleLogout = () => {
    logout();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name || !email || !contactNumber || !address || !productName || !productDescription) {
      alert('Please fill in all required fields.');
      return;
    }
    const data = {
      Name: name,
      Email: email,
      Product_Name: productName,
      Product_Description: productDescription,
      Address: address,
      Contact_Number: contactNumber,
      Customer_Address: companyAddress,
      Customer_Name: companyName
    };

    const response = await fetch(`http://localhost:4000/Ak_Web/UserAccess/postdata/${User.userid}`, {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${User.token}`
      }
    });

    if (response.ok) {
      alert('Data submitted successfully');
    } else {
      alert('Failed to submit data');
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(`http://localhost:4000/Ak_Web/UserAccess/getdata/${User.userid}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${User.token}`
        }
      });

      if (response.ok) {
        setData(await response.json());
      } else {
        console.error('Failed to fetch data');
      }
    };

    fetchData();
  }, [User]);

  return (
    <div className="user-home">
      <header className="header">
        <h1 className="brand-name">AK Solutions and Services</h1>
      </header>
      <button onClick={handleLogout} className="logout-button">Logout</button>
      <div className="form-container">
        <form onSubmit={handleSubmit} className="user-form">
          <label htmlFor='cn'>Name</label>
          <input type='text' id='cn' value={name} onChange={(e) => setName(e.target.value)} />

          <label htmlFor='pid'>Email</label>
          <input type='text' id='pid' value={email} onChange={(e) => setEmail(e.target.value)} />

          <label htmlFor='cno'>Contact no</label>
          <input type='text' id='cno' value={contactNumber} onChange={(e) => setContactNumber(e.target.value)} />

          <label htmlFor="address">Address</label>
          <textarea
            id="address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            rows="5"
          />

          <label htmlFor='pna'>Product Name</label>
          <input type='text' id='pna' value={productName} onChange={(e) => setProductName(e.target.value)} />

          <label htmlFor="product-description">Product Description</label>
          <textarea
            id="product-description"
            value={productDescription}
            onChange={(e) => setProductDescription(e.target.value)}
            rows="5"
          />

          <label htmlFor='cna'>Company Name(Optional)</label>
          <input type='text' id='cna' value={companyName} onChange={(e) => setCompanyName(e.target.value)} />

          <label htmlFor='company-address'>Company Address(Optional)</label>
          <input type='text' id='company-address' value={companyAddress} onChange={(e) => setCompanyAddress(e.target.value)} />

          <button type="submit" className="submit-button">Submit</button>
        </form>
      </div>
      <table className="data-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Product Name</th>
            <th>Email</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {Data.length > 0 ? Data.map((item, index) => (
            <tr key={index}>
              <td>{item.Name}</td>
              <td>{item.Product_Name}</td>
              <td>{item.Email}</td>
              <td>{item.Approved ? <p>Approved</p> : <p>Pending</p>}</td>
            </tr>
          )) : <tr><td colSpan="4">Data Not Available</td></tr>}
        </tbody>
      </table>
      <style>
        {`
          .user-home {
            font-family: Arial, sans-serif;
            background-color: #e0f7fa; /* Light cyan background */
            padding: 20px;
            min-height: 100vh;
            color: #333;
            box-sizing: border-box;
            opacity: 0;
            animation: fadeIn 1s forwards;
          }
          .header {
            text-align: center;
            margin-bottom: 20px;
            opacity: 0;
            animation: fadeIn 1s 0.5s forwards;
          }
          .brand-name {
            font-size: 2rem;
            font-weight: bold;
            color: #007bff;
            background: linear-gradient(45deg, #007bff, #00aaff);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            animation: pulsate 1.5s infinite;
            display: inline-block;
          }
          .logout-button {
            background-color: #007bff;
            color: white;
            border: none;
            padding: 10px 20px;
            border-radius: 5px;
            cursor: pointer;
            transition: background-color 0.3s;
            float: right;
            margin-bottom: 20px;
          }
          .logout-button:hover {
            background-color: #0056b3;
          }
          .form-container {
            background: rgba(255, 255, 255, 0.9);
            padding: 20px;
            border-radius: 10px;
            max-width: 800px;
            margin: auto;
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
            opacity: 0;
            animation: slideUp 1s 1s forwards;
          }
          .user-form label {
            display: block;
            margin: 10px 0 5px;
          }
          .user-form input,
          .user-form textarea {
            width: 100%;
            padding: 10px;
            margin-bottom: 10px;
            border: 1px solid #ddd;
            border-radius: 5px;
            box-sizing: border-box;
            font-size: 1rem;
          }
          .submit-button {
            background-color: #007bff;
            color: white;
            border: none;
            padding: 10px 20px;
            border-radius: 5px;
            cursor: pointer;
            transition: background-color 0.3s;
            font-size: 1rem;
          }
          .submit-button:hover {
            background-color: #0056b3;
          }
          .data-table {
            width: 100%;
            border-collapse: collapse;
            margin-top: 20px;
          }
          .data-table th,
          .data-table td {
            padding: 10px;
            text-align: left;
            border-bottom: 1px solid #ddd;
          }
          .data-table th {
            background-color: #007bff;
            color: white;
          }
          .data-table tr:nth-child(even) {
            background-color: #f9f9f9;
          }
          @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
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
    </div>
  );
};

export default UserHome;
