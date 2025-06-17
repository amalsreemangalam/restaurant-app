import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-content">
          <div className="footer-section">
            <h3 className="footer-title">Restaurant Menu</h3>
            <p className="footer-description">
              Transform your restaurant's digital presence with our powerful menu management system. 
              Create stunning menus that your customers will love!
            </p>
            <div className="social-links">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="social-link">
                <i className="fab fa-facebook"></i>
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="social-link">
                <i className="fab fa-twitter"></i>
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="social-link">
                <i className="fab fa-instagram"></i>
              </a>
            </div>
          </div>
          
          <div className="footer-section">
            <h3 className="footer-title">Quick Links</h3>
            <ul className="footer-links">
              <li>
                <Link to="/" className="footer-link">
                  <i className="fas fa-home"></i> Home
                </Link>
              </li>
              <li>
                <Link to="/menus/create" className="footer-link">
                  <i className="fas fa-plus"></i> Create Menu
                </Link>
              </li>
              <li>
                <a href="#features" className="footer-link">
                  <i className="fas fa-star"></i> Features
                </a>
              </li>
              <li>
                <a href="#pricing" className="footer-link">
                  <i className="fas fa-tag"></i> Pricing
                </a>
              </li>
            </ul>
          </div>
          
          <div className="footer-section" id="footer-contact">
            <h3 className="footer-title">Get in Touch</h3>
            <ul className="footer-contact">
              <li>
                <i className="fas fa-envelope"></i>
                <a href="mailto:support@restaurantmenu.com">support@restaurantmenu.com</a>
              </li>
              <li>
                <i className="fas fa-phone"></i>
                <a href="tel:+15551234567">(555) 123-4567</a>
              </li>
              <li>
                <i className="fas fa-map-marker-alt"></i>
                123 Restaurant Street, Foodville, FL 12345
              </li>
            </ul>
          </div>
        </div>
        
        <div className="footer-bottom">
          <p>&copy; {new Date().getFullYear()} Restaurant Menu. All rights reserved.</p>
          <div className="footer-bottom-links">
            <a href="#privacy">Privacy Policy</a>
            <a href="#terms">Terms of Service</a>
            <a href="#cookies">Cookie Policy</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 