import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="navbar vibrant-navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-brand vibrant-brand">
          <span>Restaurant <span className="brand-highlight">Menu</span></span>
        </Link>
        <ul className="navbar-nav">
          <li>
            <Link to="/" className="nav-link">
              <i className="fas fa-home"></i> Home
            </Link>
          </li>
          <li>
            <Link to="/menus/create" className="nav-link">
              <i className="fas fa-plus"></i> Create Menu
            </Link>
          </li>
          <li>
            <a href="#footer-contact" className="nav-link" onClick={e => {
              e.preventDefault();
              const el = document.getElementById('footer-contact');
              if (el) {
                el.scrollIntoView({ behavior: 'smooth' });
              }
            }}>
              <i className="fas fa-envelope"></i> Contact
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar; 