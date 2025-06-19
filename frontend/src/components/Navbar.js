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

  return (
    <nav className="navbar vibrant-navbar" style={{ 
      width: '100%', 
      height: '120px', 
      top: '-2px', 
      background: '#121618', 
      position: 'relative', 
      boxShadow: 'none', 
      padding: 0, 
      margin: 0, 
      border: 0, 
      backgroundColor: '#121618',
      zIndex: 1000
    }}>
      <div className="navbar-container" style={{ position: 'relative', height: '100%', padding: '0 20px' }}>
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
            <span className="brand-soft-text" style={{ color: '#857878', fontWeight: 700, letterSpacing: '2px', fontSize: '2rem', fontFamily: 'Oswald, Arial, sans-serif' }}>SOFT</span>
          </span>
        </Link>

        <button
          className="hamburger"
          aria-label="Toggle menu"
          onClick={() => setMenuOpen(!menuOpen)}
          style={{
            background: 'none',
            border: 'none',
            display: 'none',
            fontSize: '32px',
            color: '#fff',
            cursor: 'pointer',
            position: 'absolute',
            top: '50%',
            right: '20px',
            transform: 'translateY(-50%)',
            zIndex: 1001,
            padding: '10px',
          }}
        >
          <i className={`fas ${menuOpen ? 'fa-times' : 'fa-bars'}`}></i>
        </button>

        <ul className="navbar-nav desktop-nav" style={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          gap: '2.5rem',
          marginLeft: 'auto',
          zIndex: 10,
        }}>
          <li><Link to="/" className="nav-link">Home</Link></li>
          <li><Link to="/menus/create" className="nav-link">Create Menu</Link></li>
          <li><span className="nav-link" style={{ cursor: 'default', opacity: 0.6 }}>Make Reservation</span></li>
          <li>
            <a
              href="#footer-contact"
              className="nav-link"
              onClick={e => {
                e.preventDefault();
                const el = document.getElementById('footer-contact');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }}>
              Contact
            </a>
          </li>
        </ul>

        <div className={`mobile-nav-overlay${menuOpen ? ' open' : ''}`}>
          <ul className="navbar-nav mobile-nav">
            <li><Link to="/" className="nav-link" onClick={() => setMenuOpen(false)}>Home</Link></li>
            <li><Link to="/menus/create" className="nav-link" onClick={() => setMenuOpen(false)}>Create Menu</Link></li>
            <li><span className="nav-link" style={{ cursor: 'default', opacity: 0.6 }}>Make Reservation</span></li>
            <li>
              <a
                href="#footer-contact"
                className="nav-link"
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
          .hamburger { display: block !important; }
          
          .mobile-nav-overlay {
            display: none;
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100vh;
            background-color: rgba(18, 22, 24, 0.98);
            z-index: 1000;
          }
          
          .mobile-nav-overlay.open {
            display: flex;
            justify-content: center;
            align-items: center;
          }
          
          .mobile-nav {
            display: flex;
            flex-direction: column;
            align-items: center;
            gap: 2rem;
            padding: 0;
            margin: 0;
            list-style: none;
          }
          
          .mobile-nav .nav-link {
            color: #fff;
            text-decoration: none;
            font-size: 1.5rem;
            font-weight: 500;
            transition: color 0.2s;
            padding: 0.5rem 1rem;
          }
        }
        
        @media (min-width: 1025px) {
          .mobile-nav-overlay { display: none !important; }
          .hamburger { display: none !important; }
          .desktop-nav { display: flex !important; }
          .navbar-brand-text { display: flex !important; }
        }
        
        .nav-link {
          color: #fff;
          text-decoration: none;
          font-weight: 500;
          transition: color 0.2s;
        }
        
        .nav-link:hover {
          color: #2196f3 !important;
        }
        
        .navbar-brand span span:last-child {
          color: #857878 !important;
        }
      `}</style>
    </nav>
  );
};

export default Navbar; 