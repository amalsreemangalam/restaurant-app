import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="navbar vibrant-navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-brand vibrant-brand">
          <span>Restaurant <span className="brand-highlight">Menu</span></span>
        </Link>
        {/* Hamburger icon for mobile */}
        <button
          className="hamburger"
          aria-label="Toggle menu"
          onClick={() => setMenuOpen((open) => !open)}
          style={{
            background: 'none',
            border: 'none',
            display: 'none',
            fontSize: 28,
            color: '#fff',
            cursor: 'pointer',
            marginLeft: 'auto',
          }}
        >
          <span className="fa fa-bars"></span>
        </button>
        <ul
          className="navbar-nav"
          style={{
            display: menuOpen ? 'flex' : '',
            flexDirection: menuOpen ? 'column' : '',
            position: menuOpen ? 'absolute' : '',
            top: menuOpen ? 56 : '',
            right: menuOpen ? 0 : '',
            background: menuOpen ? '#444' : '',
            width: menuOpen ? '100vw' : '',
            zIndex: menuOpen ? 999 : '',
            boxShadow: menuOpen ? '0 4px 24px rgba(30,41,59,0.10)' : '',
            padding: menuOpen ? '1rem 0' : '',
            gap: menuOpen ? '1.2rem' : '',
            transition: 'all 0.2s',
          }}
        >
          <li>
            <Link to="/" className="nav-link" onClick={() => setMenuOpen(false)}>
              <i className="fas fa-home"></i> Home
            </Link>
          </li>
          <li>
            <Link to="/menus/create" className="nav-link" onClick={() => setMenuOpen(false)}>
              <i className="fas fa-plus"></i> Create Menu
            </Link>
          </li>
          <li>
            <a
              href="#footer-contact"
              className="nav-link"
              onClick={e => {
                e.preventDefault();
                setMenuOpen(false);
                const el = document.getElementById('footer-contact');
                if (el) {
                  el.scrollIntoView({ behavior: 'smooth' });
                }
              }}
            >
              <i className="fas fa-envelope"></i> Contact
            </a>
          </li>
        </ul>
      </div>
      <style>{`
        @media (max-width: 768px) {
          .navbar-nav {
            display: none;
          }
          .hamburger {
            display: block !important;
          }
          .navbar-nav[style*='flex'] {
            display: flex !important;
          }
        }
      `}</style>
    </nav>
  );
};

export default Navbar; 