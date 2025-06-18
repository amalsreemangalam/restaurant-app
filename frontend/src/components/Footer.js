import React from 'react';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container" style={{padding: '1.2rem 0'}}>
        <div style={{textAlign: 'center', fontSize: '1rem', marginBottom: '0.3rem', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.3rem'}}>
          <span style={{display: 'flex', alignItems: 'center', gap: '0.7rem', flexWrap: 'wrap', justifyContent: 'center'}}>
            <span style={{fontWeight: 600}}>Restaurant Menu</span>
            <span>|</span>
            <a href="mailto:support@restaurantmenu.com" style={{color: '#4ecdc4', textDecoration: 'none'}}>support@restaurantmenu.com</a>
            <span>|</span>
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" style={{color: '#4ecdc4', margin: '0 0.2rem'}}><i className="fab fa-facebook"></i></a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" style={{color: '#4ecdc4', margin: '0 0.2rem'}}><i className="fab fa-twitter"></i></a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" style={{color: '#4ecdc4', margin: '0 0.2rem'}}><i className="fab fa-instagram"></i></a>
          </span>
        </div>
        <div className="footer-bottom" style={{margin: 0, padding: 0, textAlign: 'center', fontSize: '0.95rem'}}>
          <p style={{margin: 0}}>&copy; {new Date().getFullYear()} Restaurant Menu. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 