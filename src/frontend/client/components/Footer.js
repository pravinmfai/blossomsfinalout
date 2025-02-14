import React from 'react';
import '../styles/Footer.css';
import logo from '../assest/icon.svg';
import "@fortawesome/fontawesome-free/css/all.min.css";

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
            <p>+91 74186 03504</p>
            <p>blossomsbotique.mfai@gmail.com</p>
          </div>
        </div>

        {/* Social Media Icons */}
        <div className="footer-social">
          <a href="tel:+917418603504" className="icon-circle"><i className="fas fa-phone"></i></a>
          <a href="https://wa.me/917418603504?text=Hi!%20I%20found%20your%20boutique%20online%20and%20want%20to%20know%20more!" className="icon-circle"><i className="fab fa-whatsapp"></i></a>
          <a href="mailto:blossomsbotique.mfai@gmail.com" className="icon-circle"><i className="far fa-envelope"></i></a>
          <a href="https://www.instagram.com/blossomsboutique65" className="icon-circle"><i className="fab fa-instagram"></i></a>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="footer-bottom">
        <p>© 2024 All Rights Reserved. Blossoms Boutique enhanced by MindFulAI Pvt Ltd.</p>
      </div>
    </footer>
  );
};

export default Footer;