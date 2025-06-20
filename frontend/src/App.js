import React, { useState, useEffect, useCallback } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import MenuList from './pages/MenuList';
import MenuDetail from './pages/MenuDetail';
import CreateMenu from './pages/CreateMenu';
import EditMenu from './pages/EditMenu';
import bgImage from './assets/images/aefd7aa0f81b6208cb3da0f5ecc0f0d109ca4bd0.jpg';
import patternImage from './assets/images/0571aff9d875fd6fec8f3801ba095cc39be0e4b1.png';
import axios from 'axios';
import './App.css';

function App() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 1024);
  const location = useLocation();
  const navigate = useNavigate();

  const fetchCategories = useCallback(async () => {
    try {
      setLoading(true);
      const response = await axios.get('https://restaurant-app-8555.onrender.com/api/menus');
      const uniqueCategories = Array.from(new Set(response.data.map(menu => menu.category && menu.category.toLowerCase()).filter(Boolean)));
      setCategories(uniqueCategories);
      
      // If we're on the home page and there's no category selected, select the first available category
      if (location.pathname === '/' && (!selectedCategory || !uniqueCategories.includes(selectedCategory))) {
        const defaultCategory = uniqueCategories[0];
        if (defaultCategory) {
          setSelectedCategory(defaultCategory);
          navigate(`/?category=${defaultCategory}`, { replace: true });
        }
      }
      
      setLoading(false);
    } catch (error) {
      console.error('Error fetching categories:', error);
      setLoading(false);
    }
  }, [location.pathname, navigate, selectedCategory]);

  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

  useEffect(() => {
    if (location.pathname === '/') {
      const urlParams = new URLSearchParams(location.search);
      const categoryFromUrl = urlParams.get('category');
      
      if (categoryFromUrl) {
        setSelectedCategory(categoryFromUrl.toLowerCase());
      } else if (categories.length > 0) {
        // If no category in URL but we have categories, use the first one
        const defaultCategory = categories[0];
        setSelectedCategory(defaultCategory);
        navigate(`/?category=${defaultCategory}`, { replace: true });
      }
    }
  }, [location.search, location.pathname, navigate, categories]);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 1024);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleCategoryClick = (category) => {
    setSelectedCategory(category); // Always set the category, don't toggle
    navigate(`/?category=${category}`);
  };

  const isCreateMenuPage = location.pathname === '/menus/create';
  const isHomePage = location.pathname === '/';

  return (
    <div className="App">
      <Navbar />
      {isHomePage && (
        <div>
          <div style={{ position: 'relative', width: '100%' }}>
            <div style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              minHeight: '400px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              zIndex: 2,
              pointerEvents: 'none',
            }}>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%' }}>
                <h1 style={{
                  color: '#fff',
                  fontFamily: 'Oswald, Arial, sans-serif',
                  fontWeight: 600,
                  fontSize: '75px',
                  lineHeight: '100%',
                  letterSpacing: '3%',
                  textTransform: 'uppercase',
                  textShadow: '0 4px 24px rgba(0,0,0,0.5)',
                  margin: 0,
                  textAlign: 'center',
                }}>
                  MENU
                </h1>
                <p style={{
                  color: '#fff',
                  fontFamily: '"Kelly Slab", cursive',
                  fontSize: '1.1rem',
                  margin: '1rem auto 0 auto',
                  textAlign: 'center',
                  textShadow: '0 2px 8px rgba(0,0,0,0.4)',
                  maxWidth: '900px',
                }}>
                  Please take a look at our menu featuring food, drinks, and brunch. If you'd like to place an order, use the "Order Online" button located below the menu.
                </p>
              </div>
            </div>
            <img src={bgImage} alt="background" width="100%" style={{ display: 'block', minHeight: '400px', objectFit: 'cover' }} />
            <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', background: 'rgba(0,0,0,0.65)' }}></div>
          </div>
          <div style={{ position: 'relative', width: '100%' }}>
            <img src={patternImage} alt="pattern" width="100%" style={{ height: '100px', objectFit: 'cover', display: 'block' }} />
            <div style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              zIndex: 2,
              padding: '0 1rem',
            }}>
              <div style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                width: '100%',
                maxWidth: '100%',
                margin: '0 auto',
                padding: '0.5rem 0',
                position: 'relative',
                zIndex: 3,
                overflow: 'hidden'
              }}>
                <div className="category-container" style={{
                  display: 'flex',
                  alignItems: 'center',
                  width: '100%',
                }}>
                {loading ? (
                  <div style={{ color: '#fff', fontSize: '1.2rem' }}>Loading categories...</div>
                ) : categories.length > 0 ? (
                  categories.map((category, index) => (
                    <div 
                      key={index} 
                      className={`category-box ${selectedCategory === category ? 'selected' : ''}`}
                      onClick={() => handleCategoryClick(category)}
                      style={{ 
                        cursor: 'pointer',
                        background: selectedCategory === category ? '#2196f3' : '#000000CC',
                        transition: 'all 0.3s ease',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: window.innerWidth <= 374 ? '11px' : (isMobile ? '13px' : '14px'),
                        fontWeight: 700,
                        boxSizing: 'border-box',
                      }}
                    >
                      <div style={{ 
                        textAlign: 'center',
                        padding: window.innerWidth <= 374 ? '0.15rem' : '0.25rem',
                        wordBreak: 'break-word',
                        maxWidth: '100%',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        whiteSpace: 'nowrap'
                      }}>{category.toUpperCase()}</div>
                    </div>
                  ))
                ) : (
                  <div style={{ color: '#fff', fontSize: '1.2rem' }}>No categories available</div>
                )}
                </div>
              </div>
            </div>
            <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', background: 'rgba(0,0,0,0.85)' }}></div>
          </div>
        </div>
      )}
      <div className={isCreateMenuPage ? 'create-menu-container' : ''}>
        <Routes>
          <Route path="/" element={<MenuList selectedCategory={selectedCategory} />} />
          <Route path="/menus/create" element={<CreateMenu onMenuCreated={fetchCategories} />} />
          <Route path="/menus/:id" element={<MenuDetail />} />
          <Route path="/menus/:id/edit" element={<EditMenu onMenuUpdated={fetchCategories} />} />
        </Routes>
      </div>
      <Footer />
    </div>
  );
}

// Wrapper component to handle routing
function AppWrapper() {
  return (
    <Router>
      <App />
    </Router>
  );
}

export default AppWrapper;
