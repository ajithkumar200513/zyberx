import React, { useEffect, useState } from 'react';
import { UseAdminLogout } from '../Hooks/UseAdminLogut';
import { UseAdminContext } from '../Hooks/UseAdminContext';

const Adminhome = () => {
  const { logout } = UseAdminLogout();
  const { Admin } = UseAdminContext();
  const [Data, setData] = useState([]);
  const [pData, setpData] = useState([]);
  const [check, setCheck] = useState(false);

  const handleBtnClick = async (value) => {
    const response = await fetch(`https://ak-solution-and-service.onrender.com/Ak_Web/Admin/getdata/${value}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${Admin.token}`
      }
    });
    if (response.ok) {
      setCheck(true);
      setpData(await response.json());
    }
  };

  const handleClick = () => {
    logout();
  };

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(`https://ak-solution-and-service.onrender.com/Ak_Web/Admin/getdata/`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${Admin.token}`
        }
      });

      if (response.ok) {
        setData(await response.json());
      } else {
        console.error('Failed to fetch data');
      }
    };

    fetchData();
  }, [Admin.userid]);

  const handleApprove = async (e, value) => {
    e.preventDefault();

    try {
      const response = await fetch(`https://ak-solution-and-service.onrender.com/Ak_Web/Admin/updatedata/${value}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${Admin.token}`
        }
      });

      if (response.ok) {
        alert('Item successfully approved!');
        const updatedData = await response.json();
        setpData(prevData =>
          prevData.map(item =>
            item._id === value ? { ...item, Approved: true } : item
          )
        );
      } else {
        alert('Failed to approve item. Please try again.');
      }
    } catch (error) {
      console.error('Error approving item:', error);
      alert('An error occurred while approving the item.');
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
            background-color:  #2F2F2F;
          }
          .body-admin {
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
          }
          .brand-name {
            font-size: 2rem;
            color: #ffd700; /* Golden color */
            margin-bottom: 10px;
            font-weight: bold;
          }
          .tagline {
            font-size: 1.2rem;
            color: #fff; /* White color */
            font-weight: bold;
            margin: 10px 0;
            animation: slideIn 1s 0.5s forwards;
          }
          .container {
            display: flex;
            flex-direction: row;
            justify-content: center;
            align-items: center;
            background-color: rgba(0, 0, 0, 0.8); /* Semi-transparent black background */
            padding: 40px;
            border-radius: 10px;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
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
            color: #ffd700; /* Golden color */
            font-size: 1.8rem;
          }
          table {
            width: 100%;
            border-collapse: collapse;
            margin: 20px 0;
            color: #fff; /* White color for table text */
          }
          th, td {
            padding: 12px;
            border: 1px solid #ddd;
            text-align: center;
          }
          th {
            background-color: #000; /* Black background for header */
            color: #ffd700; /* Golden text for header */
          }
          button {
            padding: 8px 12px;
            border: none;
            background-color: #ffd700; /* Golden color */
            color: #000;
            font-weight: bold;
            border-radius: 5px;
            cursor: pointer;
            transition: background-color 0.3s;
          }
          button:hover {
            background-color: #ffcc00; /* Slightly darker golden color */
          }
          .error-message {
            color: red;
            margin-top: 20px;
            text-align: center;
          }
          @media (max-width: 768px) {
            .container {
              flex-direction: column;
              padding: 30px;
            }
          }
          @media (max-width: 480px) {
            table {
              font-size: 0.9rem;
            }
            button {
              padding: 6px 10px;
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
        `}
      </style>

      <div className="body-admin">
        <div className="header">
          <div className="brand-name">ZyberX</div>
          <div className="tagline">Innovate Beyond Boundaries</div>
        </div>
        <div className="container">
          <main className="container-log">
            <h2>Admin Dashboard</h2>
            <button onClick={handleClick}>Logout</button>
            {!check && <table>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Phone</th>
                  <th>View Info</th>
                </tr>
              </thead>
              <tbody>
                {Data.length > 0 ? Data.map((item, index) => (
                  <tr key={index}>
                    <td>{item.name}</td>
                    <td>{item.email}</td>
                    <td>{item.phone}</td>
                    <td><button onClick={() => handleBtnClick(item._id)}>View Info</button></td>
                  </tr>
                )) : <tr><td colSpan="4">No Data Available</td></tr>}
              </tbody>
            </table>}
            {check && <table>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Product Name</th>
                  <th>Email</th>
                  <th>Approved</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {pData.length > 0 ? pData.map((item, index) => (
                  <tr key={index}>
                    <td>{item.Name}</td>
                    <td>{item.Product_Name}</td>
                    <td>{item.Email}</td>
                    <td>{item.Approved ? <p>Approved</p> : <p>Pending</p>}</td>
                    <td>{!item.Approved ? <button onClick={(e) => handleApprove(e, item._id)}>Approve</button> : <p>Approved</p>}</td>
                  </tr>
                )) : <tr><td colSpan="5">No Data Available</td></tr>}
              </tbody>
            </table>}
          </main>
        </div>
      </div>
    </div>
  );
};

export default Adminhome;
