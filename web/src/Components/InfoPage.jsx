import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FaFacebookF, FaLinkedinIn, FaInstagram, FaTwitter } from 'react-icons/fa';

const InfoPage = () => {
  const navigate = useNavigate();

  const handleLoginClick = () => {
    navigate('/login'); // Navigate to login page
  };

  return (
    <div style={styles.container}>
      <header style={styles.header}>
        <div style={styles.headerContent}>
          <button onClick={handleLoginClick} style={styles.loginButton}>Login</button>
          <div>
            <h1 style={styles.brandName}>AK Solutions and Services</h1>
            <p style={styles.tagline}>Your Trusted Partner in Success</p>
          </div>
        </div>
      </header>

      <section style={styles.section}>
        <h2 style={styles.sectionTitle}>What We Do</h2>
        <p>
          At AK Solutions & Services, we specialize in helping businesses thrive in the digital world.
          Whether you need a professional website, a mobile app, or internet services, we're here to take
          your business online and drive success.
        </p>
      </section>

      <section style={styles.section}>
        <h2 style={styles.sectionTitle}>Our Services</h2>
        <ul>
          <li>Website Development</li>
          <li>Mobile App Development</li>
          <li>Internet Services</li>
          <li>Business Consultation for Digital Growth</li>
        </ul>
      </section>

      <section style={styles.section}>
        <h2 style={styles.sectionTitle}>Why Choose Us?</h2>
        <p>
          With years of experience in digital solutions, we understand the importance of building a strong
          online presence. Our team is dedicated to delivering custom solutions that meet your unique business
          needs. From small startups to large enterprises, we're here to make your digital journey successful.
        </p>
      </section>

      <footer style={styles.footer}>
        <div style={styles.socialButtons}>
          <a href="#" style={styles.socialButton}><FaFacebookF /></a>
          <a href="#" style={styles.socialButton}><FaLinkedinIn /></a>
          <a href="https://www.instagram.com/zyberxss/?igsh=a3VmM3FkbXhwOTVw" style={styles.socialButton}><FaInstagram /></a>
          <a href="https://x.com/ZyberxSs" style={styles.socialButton}><FaTwitter /></a>
        </div>
      </footer>
    </div>
  );
};

const styles = {
  container: {
    fontFamily: 'Arial, sans-serif',
    lineHeight: '1.6',
    padding: '20px',
    backgroundImage: 'url(https://kosichi.ca/wp-content/uploads/2022/06/IT-Solution-Design-Dubai-UAE.jpg)',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    color: 'black',
  },
  header: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    color: '#fff',
    padding: '10px 20px',
    position: 'relative',
  },
  headerContent: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  loginButton: {
    backgroundColor: '#fff',
    color: '#fff',
    padding: '10px 20px',
    border: '1px solid #1976d2',
    borderRadius: '5px',
    cursor: 'pointer',
    fontSize: '16px',
    animation: 'color-change 1.3s infinite', // Adjusted to 1 second for a faster animation
  },
  brandName: {
    fontSize: '2rem',
    color: '#fff',
    textAlign: 'center',
    marginBottom: '10px',
    fontWeight: 'bold',
  },
  tagline: {
    fontSize: '1.2rem',
    color: '#e3f2fd',
    textAlign: 'center',
    marginBottom: '30px',
    fontWeight: 'normal',
  },
  section: {
    margin: '20px 0',
    padding: '15px',
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    borderRadius: '5px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
  },
  sectionTitle: {
    color: '#1976d2',
  },
  footer: {
    textAlign: 'center',
    marginTop: '30px',
    padding: '10px',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  socialButtons: {
    display: 'flex',
    justifyContent: 'center',
    marginTop: '20px',
  },
  socialButton: {
    margin: '0 10px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '40px',
    height: '40px',
    background: '#e3f2fd',
    borderRadius: '50%',
    color: '#1976d2',
    fontSize: '1.2rem',
    transition: 'background 0.3s, color 0.3s, transform 0.3s',
  },
};

// Define keyframes for color-change animation
const styleSheet = document.createElement("style");
styleSheet.type = "text/css";
styleSheet.innerText = `
  @keyframes color-change {
    0% {
      background-color: #007bff;
    }
    50% {
      background-color: #1CCAD8;
    }
    100% {
      background-color: #007bff;
    }
  }
  @media (max-width: 768px) {
    .loginButton {
      font-size: 14px;
      padding: 8px 16px;
    }
    .brandName {
      font-size: 1.5rem;
    }
    .tagline {
      font-size: 1rem;
    }
    .section {
      margin: 10px 0;
      padding: 10px;
    }
    .footer {
      padding: 5px;
    }
  }
`;
document.head.appendChild(styleSheet);

export default InfoPage;
