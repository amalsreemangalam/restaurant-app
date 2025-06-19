import React from 'react';

const Footer = () => {
  return (
    <footer style={{
      background: '#000',
      padding: '3rem 0',
      width: '100%',
      marginTop: '0',
    }}>
      <div style={{
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'center',
        alignItems: 'stretch',
        gap: '2.5rem',
        maxWidth: '1400px',
        margin: '0 auto',
        padding: '0 1rem',
      }}>
        {/* Left Box: Connect With Us */}
        <div style={{
          flex: '1 1 320px',
          minWidth: '220px',
          minHeight: '160px',
          height: '10rem',
          background: 'transparent',
          border: '2px solid #fff',
          borderRadius: '1.25rem',
          padding: '0.75rem 1.2rem',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'flex-start',
        }}>
          <div style={{ color: '#00aaff', fontWeight: 700, fontSize: '1.3rem', marginBottom: '0.5rem', letterSpacing: '1px', textTransform: 'uppercase' }}>
            CONNECT WITH US
          </div>
          <div style={{ display: 'flex', alignItems: 'center', marginBottom: '0.3rem', color: '#bfa94c', fontSize: '1.1rem' }}>
            <span style={{ marginRight: '0.7rem', fontSize: '1.3rem' }}>&#128222;</span>
            <span style={{ color: '#fff', fontWeight: 500, fontSize: '1.1rem' }}>+91 9567843340</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', color: '#bfa94c', fontSize: '1.1rem' }}>
            <span style={{ marginRight: '0.7rem', fontSize: '1.3rem' }}>&#9993;</span>
            <span style={{ color: '#fff', fontWeight: 500, fontSize: '1.1rem' }}>info@deepnetsoft.com</span>
          </div>
        </div>
        {/* Center Box: Logo and Social */}
        <div style={{
          flex: '1 1 320px',
          minWidth: '220px',
          minHeight: '160px',
          height: '10rem',
          background: 'transparent',
          border: '2px solid #fff',
          borderRadius: '1.25rem',
          padding: '0.75rem 1.2rem',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
          {/* Logo */}
          <div style={{ marginBottom: '0.5rem' }}>
            <svg width="60" height="60" viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg">
              <polygon points="30,5 55,30 30,55 5,30" fill="#0099ff" />
              <polygon points="30,15 45,30 30,45 15,30" fill="#0066cc" />
            </svg>
          </div>
          <div style={{ fontSize: '2rem', fontWeight: 700, letterSpacing: '2px', color: '#00aaff', marginBottom: '0.1rem', fontFamily: 'Oswald, Arial, sans-serif' }}>
            DEEP <span style={{ color: '#fff' }}>NET</span> <span style={{ color: '#bdbdbd' }}>SOFT</span>
          </div>
          <div style={{ display: 'flex', gap: '1.2rem', marginTop: '0.3rem' }}>
            <button style={{ color: '#fff', fontSize: '1.3rem', background: 'none', border: 'none', cursor: 'pointer' }} aria-label="Facebook"><i className="fab fa-facebook-f"></i></button>
            <button style={{ color: '#fff', fontSize: '1.3rem', background: 'none', border: 'none', cursor: 'pointer' }} aria-label="Twitter"><i className="fab fa-twitter"></i></button>
            <button style={{ color: '#fff', fontSize: '1.3rem', background: 'none', border: 'none', cursor: 'pointer' }} aria-label="Instagram"><i className="fab fa-instagram"></i></button>
            <button style={{ color: '#fff', fontSize: '1.3rem', background: 'none', border: 'none', cursor: 'pointer' }} aria-label="YouTube"><i className="fab fa-youtube"></i></button>
          </div>
        </div>
        {/* Right Box: Find Us */}
        <div style={{
          flex: '1 1 320px',
          minWidth: '220px',
          minHeight: '160px',
          height: '10rem',
          background: 'transparent',
          border: '2px solid #fff',
          borderRadius: '1.25rem',
          padding: '0.75rem 1.2rem',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'flex-start',
        }}>
          <div style={{ color: '#00aaff', fontWeight: 700, fontSize: '1.3rem', marginBottom: '0.5rem', letterSpacing: '1px', textTransform: 'uppercase' }}>
            FIND US
          </div>
          <div style={{ display: 'flex', alignItems: 'center', color: '#bfa94c', fontSize: '1.1rem', marginBottom: '0.2rem' }}>
            <span style={{ marginRight: '0.7rem', fontSize: '1.3rem' }}>&#128205;</span>
            <span style={{ color: '#bdbdbd', fontWeight: 500, fontSize: '1.1rem' }}>First floor, Geo infopark,</span>
          </div>
          <div style={{ color: '#bdbdbd', fontWeight: 500, fontSize: '1.1rem', marginLeft: '2.1rem' }}>
            Infopark EXPY, Kakkanad
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 