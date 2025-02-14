import React from 'react';
import '../styles/Footer.css';
import logo from '../assest/icon.svg';

const Footer = () => {
  return (
    <footer>
      {/* Subscription Section */}
      <div className="subscription-section">
        <div className="subscription-text">
          <h2>Stay Up to Date About Our <br /> Latest Offers.</h2>
        </div>
        <div className="subscribe-form">
          <input type="email" placeholder="Enter your email address" />
          <button type="submit">Subscribe</button>
        </div>
      </div>

      {/* Footer Info Section */}
      <div className="footer-info">
        <div className="footer-left">
          {/* Logo */}
          <div className="footer-logo">
            <img src={logo} alt="Blossoms Boutique" />
          </div>
          {/* Address */}
          <div className="footer-contact">
            <p>5/191, Bettalada, Water falls, Kookalthorai Post, Kotagiri,</p>
            <p>Nilgiris - 643217</p>
            <p>+91 XXXXX XXXXX</p>
            <p>Blossoms@gmail.com</p>
          </div>
        </div>

        {/* Social Media Icons */}
        <div className="footer-social">
          <a href="#" className="icon-circle"><i className="fas fa-phone"></i></a>
          <a href="#" className="icon-circle"><i className="fab fa-whatsapp"></i></a>
          <a href="#" className="icon-circle"><i className="far fa-envelope"></i></a>
          <a href="#" className="icon-circle"><i className="fab fa-instagram"></i></a>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="footer-bottom">
        <p>© 2024 All Rights Reserved. Blossoms Boutique enhanced by MindFulAI</p>
      </div>
    </footer>
  );
};

export default Footer;