import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import logo from '../assets/images/22e31e486860545013e0a63ba8cb7e94004971f7.png';

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setMenuOpen(false);
  }, [location]);

  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [menuOpen]);

  const navLinkStyle = {
    color: '#fff',
    textDecoration: 'none',
    fontWeight: 500,
    transition: 'color 0.3s ease',
    pointerEvents: 'auto',
    cursor: 'pointer'
  };

  return (
    <nav className="navbar vibrant-navbar" style={{ 
      width: '100%', 
      height: '120px', 
      top: 0,
      background: '#121618', 
      position: 'relative', 
      boxShadow: 'none', 
      padding: 0, 
      margin: 0, 
      border: 0, 
      backgroundColor: '#121618',
      zIndex: 1000,
      marginBottom: '-1px'
    }}>
      <div className="navbar-container" style={{ position: 'relative', height: '100%', padding: '0 20px' }}>
        <button
          className="hamburger"
          aria-label="Toggle menu"
          onClick={() => setMenuOpen(!menuOpen)}
          style={{
            background: 'none',
            border: 'none',
            display: 'none',
            fontSize: '24px',
            color: '#fff',
            cursor: 'pointer',
            position: 'absolute',
            top: '50%',
            right: '20px',
            left: 'auto',
            transform: 'translateY(-50%)',
            zIndex: 1001,
            padding: '8px',
            width: '40px',
            height: '40px',
            borderRadius: '4px',
            transition: 'background-color 0.3s ease'
          }}
        >
          <i className={`fas ${menuOpen ? 'fa-times' : 'fa-bars'}`} style={{ fontSize: '20px' }}></i>
        </button>

        <Link to="/" className="navbar-brand vibrant-brand" style={{ display: 'flex', alignItems: 'center', gap: '0.7rem', position: 'relative', zIndex: 20 }}>
          <img 
            src={logo} 
            alt="Logo" 
            style={{ 
              height: '96px', 
              width: '96px', 
              objectFit: 'contain', 
              marginRight: '0.5rem', 
              display: 'block', 
              position: 'absolute', 
              left: 0, 
              top: '55%', 
              transform: 'translateY(0%)', 
              zIndex: 30, 
            }} 
          />
          <span className="navbar-brand-text" style={{ marginLeft: '110px', marginTop: '130px', display: 'flex', flexDirection: 'column', lineHeight: 1.1 }}>
            <span>
              <span style={{ color: '#00aaff', fontWeight: 700, letterSpacing: '2px', fontSize: '2rem', fontFamily: 'Oswald, Arial, sans-serif' }}>DEEP </span>
              <span style={{ color: '#fff', fontWeight: 700, letterSpacing: '2px', fontSize: '2rem', fontFamily: 'Oswald, Arial, sans-serif' }}>NET</span>
            </span>
            <span className="brand-soft-text" style={{ color: '#d72660', fontWeight: 700, letterSpacing: '2px', fontSize: '2rem', fontFamily: 'Oswald, Arial, sans-serif' }}>SOFT</span>
          </span>
        </Link>

        <ul className="navbar-nav desktop-nav" style={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          gap: '2.5rem',
          marginLeft: 'auto',
          zIndex: 10,
          listStyle: 'none'
        }}>
          <li><Link to="/" className="nav-link" style={navLinkStyle}>Home</Link></li>
          <li><Link to="/menus/create" className="nav-link" style={navLinkStyle}>Create Menu</Link></li>
          <li><span style={{ ...navLinkStyle, opacity: 0.6, cursor: 'default' }}>Make Reservation</span></li>
          <li>
            <a
              href="#footer-contact"
              className="nav-link"
              style={navLinkStyle}
              onClick={e => {
                e.preventDefault();
                const el = document.getElementById('footer-contact');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }}>
              Contact
            </a>
          </li>
        </ul>

        <div className={`mobile-nav-overlay${menuOpen ? ' open' : ''}`} style={{
          position: 'fixed',
          top: 0,
          right: 0,
          left: 'auto',
          width: '250px',
          height: '100vh',
          background: '#121618',
          transform: menuOpen ? 'translateX(0)' : 'translateX(100%)',
          transition: 'transform 0.3s ease-in-out',
          boxShadow: menuOpen ? '-2px 0 8px rgba(0,0,0,0.5)' : 'none',
          zIndex: 1000,
        }}>
          <ul className="navbar-nav mobile-nav" style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            width: '100%',
            gap: '2rem',
            padding: '120px 0',
            margin: 0,
            listStyle: 'none',
          }}>
            <li style={{ width: '100%', textAlign: 'center' }}><Link to="/" className="nav-link" onClick={() => setMenuOpen(false)} style={navLinkStyle}>Home</Link></li>
            <li style={{ width: '100%', textAlign: 'center' }}><Link to="/menus/create" className="nav-link" onClick={() => setMenuOpen(false)} style={navLinkStyle}>Create Menu</Link></li>
            <li style={{ width: '100%', textAlign: 'center' }}><span style={{ ...navLinkStyle, opacity: 0.6, cursor: 'default' }}>Make Reservation</span></li>
            <li style={{ width: '100%', textAlign: 'center' }}>
              <a
                href="#footer-contact"
                className="nav-link"
                style={navLinkStyle}
                onClick={e => {
                  e.preventDefault();
                  setMenuOpen(false);
                  const el = document.getElementById('footer-contact');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }}>
                Contact
              </a>
            </li>
          </ul>
        </div>
      </div>

      <style>{`
        @media (max-width: 1024px) {
          .desktop-nav { display: none !important; }
          .navbar-brand-text { display: none !important; }
          .hamburger { 
            display: flex !important;
            align-items: center;
            justify-content: center;
          }
          
          .hamburger:hover {
            background-color: rgba(255, 255, 255, 0.1);
          }
          
          .mobile-nav-overlay {
            display: block;
          }
          
          .mobile-nav {
            opacity: 1;
            visibility: visible;
          }
        }
        
        @media (min-width: 1025px) {
          .mobile-nav-overlay { display: none !important; }
          .hamburger { display: none !important; }
          .desktop-nav { display: flex !important; }
          .navbar-brand-text { display: flex !important; }
        }

        /* Remove all hover effects */
        .nav-link:hover,
        .nav-link:focus,
        .nav-link:active,
        a:hover,
        a:focus,
        a:active {
          color: #00aaff !important;
          text-decoration: none !important;
          opacity: 1 !important;
        }

        /* Add overlay for the rest of the screen */
        .mobile-nav-overlay::before {
          content: '';
          position: fixed;
          top: 0;
          right: 250px;
          left: 0;
          bottom: 0;
          background: rgba(0, 0, 0, 0.5);
          opacity: ${menuOpen ? '1' : '0'};
          visibility: ${menuOpen ? 'visible' : 'hidden'};
          transition: opacity 0.3s ease-in-out;
          z-index: 999;
          pointer-events: ${menuOpen ? 'auto' : 'none'};
        }

        /* Close menu when clicking outside */
        .mobile-nav-overlay.open::before {
          cursor: pointer;
        }
      `}</style>
    </nav>
  );
};

export default Navbar; 