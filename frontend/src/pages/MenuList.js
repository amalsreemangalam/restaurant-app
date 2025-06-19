import React, { useState, useEffect } from 'react';
import axios from 'axios';
import bgImage from '../assets/images/53f3e533f37f4a258b3eea846bf145fb95b71dfd.png';
import drinkImage from '../assets/images/08f1ba9209e436820849a421ec0b1fe5126bf9b5.png';
import cocktailImage from '../assets/images/6b91b238f07a69022d4c64e313237eadaceb997f (1).png';

const MenuList = ({ selectedCategory }) => {
  const [menus, setMenus] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [menuItems, setMenuItems] = useState({});
  const [retryCount, setRetryCount] = useState(0);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 1024);
  const [defaultCategory, setDefaultCategory] = useState('');

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 1024);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

    const fetchMenus = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const response = await axios.get('https://restaurant-app-8555.onrender.com/api/menus');
        if (!response.data) {
          throw new Error('No data received from server');
        }
        
        setMenus(response.data);
        
      // Set default category if we have menus and no category is selected
      if (!selectedCategory && response.data.length > 0) {
        const categories = response.data.map(menu => menu.category?.toLowerCase().trim()).filter(Boolean);
        const uniqueCategories = [...new Set(categories)];
        if (uniqueCategories.length > 0) {
          setDefaultCategory(uniqueCategories[0]);
        }
      }
      
      // Fetch menu items for each menu
        const itemsPromises = response.data.map(menu => 
          axios.get('https://restaurant-app-8555.onrender.com/api/items/menu/' + menu._id)
        );
        
        const itemsResponses = await Promise.all(itemsPromises);
        
      // Create a map of menu items by menu ID
        const menuItemsMap = {};
        response.data.forEach((menu, index) => {
          menuItemsMap[menu._id] = itemsResponses[index].data;
        });
        
        setMenuItems(menuItemsMap);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching data:', err);
        setError('Failed to fetch menus. Please try again.');
        setLoading(false);
       
        if (retryCount < 3) {
          setTimeout(() => {
            setRetryCount(prev => prev + 1);
          }, 2000); 
        }
      }
    };

  // Fetch menus whenever component mounts or retryCount changes
  useEffect(() => {
    fetchMenus();
  }, [retryCount]); 

  // Re-fetch when selectedCategory changes
  useEffect(() => {
    if (selectedCategory) {
      setDefaultCategory(''); // Clear default category when user selects one
      fetchMenus();
    }
  }, [selectedCategory]);

  // Filter menus based on selected category
  const filteredMenus = selectedCategory
    ? menus.filter(menu => {
        const menuCategory = menu.category ? menu.category.toLowerCase().trim() : '';
        const selectedCat = selectedCategory.toLowerCase().trim();
        return menuCategory === selectedCat;
      })
    : menus;

  if (loading) {
    return (
      <div className="loading-container" style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '50vh',
        color: '#fff'
      }}>
        <div className="loading-spinner" style={{
          border: '4px solid rgba(255, 255, 255, 0.1)',
          borderRadius: '50%',
          borderTop: '4px solid #fff',
          width: '40px',
          height: '40px',
          animation: 'spin 1s linear infinite',
          marginBottom: '1rem'
        }}></div>
        <div className="loading-text" style={{
          fontSize: '1.2rem',
          fontWeight: '500'
        }}>Loading menus...</div>
        <style>{`
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}</style>
      </div>
    );
  }

  if (error) {
    return (
      <div className="error-container" style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '50vh',
        padding: '2rem'
      }}>
        <div className="error-message" style={{
          color: '#fff',
          fontSize: '1.2rem',
          marginBottom: '1rem',
          textAlign: 'center',
          background: 'rgba(0,0,0,0.7)',
          padding: '1rem 2rem',
          borderRadius: '8px'
        }}>{error}</div>
        <button 
          className="retry-button"
          onClick={fetchMenus}
          style={{
            background: '#2196f3',
            color: '#fff',
            border: 'none',
            padding: '0.8rem 2rem',
            borderRadius: '8px',
            fontSize: '1rem',
            cursor: 'pointer',
            transition: 'background 0.2s',
          }}
        >
          Retry
        </button>
      </div>
    );
  }

  if (!selectedCategory && menus.length > 0) {
    return (
      <div className="loading-container" style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '50vh',
        color: '#fff'
      }}>
        <div className="loading-text" style={{
          fontSize: '1.2rem',
          fontWeight: '500'
        }}>Loading category...</div>
      </div>
    );
  }

  return (
    <div
      className="home-bg-image"
      style={{
        backgroundImage: `url(${bgImage})`,
        minHeight: '95vh',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      {/* Overlay */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        background: '#000000CC',
        zIndex: 1,
        pointerEvents: 'none',
      }} />
      <div className="container" style={{ 
        position: 'relative', 
        zIndex: 2, 
        marginTop: '1.5rem',
        flex: '1 0 auto',
        display: 'flex',
        flexDirection: 'column',
        minHeight: 0,
      }}>
        <div style={{ 
          maxWidth: '1100px', 
          margin: '2rem auto', 
          position: 'relative',
          border: '2px solid #fff',
          borderRadius: '18px',
          padding: '2.5rem 2rem',
          background: 'transparent',
          paddingTop: '5.5rem',
          flex: '1 0 auto',
          display: 'flex',
          flexDirection: 'column',
          marginBottom: '2rem',
        }}>
          {/* Drink image at top left */}
          <img 
            src={drinkImage} 
            alt="Drink" 
            style={{
              position: 'absolute',
              top: '-40px',
              left: '-20px',
              width: '130px',
              height: 'auto',
              zIndex: 10,
              background: 'transparent',
              borderRadius: '0 0 18px 0',
              boxShadow: '0 4px 24px rgba(0,0,0,0.15)',
            }}
          />
          {/* Cocktail image at bottom right */}
          <img
            src={cocktailImage}
            alt="Cocktail"
            style={{
              position: 'absolute',
              right: '-20px',
              bottom: '-20px',
              width: '160px',
              height: 'auto',
              zIndex: 10,
              background: 'transparent',
              borderRadius: '18px 0 0 0',
              boxShadow: '0 4px 24px rgba(0,0,0,0.15)',
            }}
          />
          <h1 style={{
            textAlign: 'center',
            fontSize: isMobile ? '1.8rem' : '2.5rem',
            fontWeight: 900,
            letterSpacing: '2px',
            color: '#fff',
            textShadow: '0 2px 8px #000',
            textTransform: 'uppercase',
            margin: 0,
            marginBottom: '2.5rem',
            paddingTop: '1rem',
            paddingLeft: '2rem',
          }}>
            {selectedCategory ? `${selectedCategory} Menu`.toUpperCase() : 'Menu'}
          </h1>
          
          {filteredMenus.length === 0 ? (
            <div className="alert" style={{ 
              gridColumn: '1/-1', 
              textAlign: 'center', 
              color: '#fff',
              background: 'rgba(0,0,0,0.7)',
              padding: '2rem',
              borderRadius: '12px',
              margin: '2rem auto',
              maxWidth: '500px',
              width: '100%'
            }}>
              {selectedCategory ? `No menus found for ${selectedCategory} category.` : 'No menus available.'}
              <div style={{ marginTop: '1rem' }}>
                <button 
                  onClick={fetchMenus} 
                  style={{
                    background: '#2196f3',
                    color: '#fff',
                    border: 'none',
                    padding: '0.8rem 2rem',
                    borderRadius: '8px',
                    fontSize: '1rem',
                    cursor: 'pointer',
                    transition: 'background 0.2s',
                  }}
                >
                  Refresh Menus
                </button>
              </div>
                    </div>
          ) : (
            <div className="menu-items-list" style={{
              display: 'grid',
              gridTemplateColumns: isMobile ? '1fr' : 
                window.innerWidth >= 3840 ? 'repeat(3, 1fr)' :
                window.innerWidth >= 1024 ? '1fr 1fr' : '1fr',
              gap: isMobile ? '0.75rem' : 
                window.innerWidth >= 3840 ? '2.5rem 3rem' : '1.5rem 2rem',
              width: '100%',
              margin: '0 auto',
              padding: 0,
              maxWidth: isMobile ? '500px' : 
                window.innerWidth >= 3840 ? '2800px' :
                window.innerWidth >= 1024 ? '1000px' : '500px',
              paddingRight: isMobile ? '0.5rem' : 
                window.innerWidth >= 3840 ? '4rem' : '3rem',
              paddingLeft: isMobile ? '0.5rem' : 
                window.innerWidth >= 3840 ? '1rem' : '0',
              paddingBottom: window.innerWidth >= 3840 ? '3rem' : '2rem',
              flex: '1 0 auto',
            }}>
              {filteredMenus.map((menu, idx) => (
                <div key={menu._id || idx} style={{ 
                  width: '100%',
                  marginBottom: isMobile ? '0.5rem' : 
                    window.innerWidth >= 3840 ? '1.5rem' : '0.75rem',
                  background: 'rgba(0, 0, 0, 0.3)',
                  borderRadius: window.innerWidth >= 3840 ? '24px' : '16px',
                  padding: window.innerWidth >= 3840 ? '2rem' : '1.5rem',
                  backdropFilter: 'blur(10px)',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                }}>
                  <div style={{ 
                    display: 'flex', 
                    justifyContent: 'space-between', 
                    alignItems: 'center', 
                    fontWeight: 700, 
                    fontSize: isMobile ? '1.1rem' : 
                      window.innerWidth >= 3840 ? '1.8rem' : '1.25rem', 
                    color: '#fff', 
                    letterSpacing: '1px', 
                    marginBottom: window.innerWidth >= 3840 ? '0.5rem' : '0.15rem', 
                    fontFamily: 'Oswald, Arial, sans-serif',
                    flexWrap: isMobile ? 'wrap' : 'nowrap',
                    gap: isMobile ? '0.3rem' : '0',
                  }}>
                    <span style={{ 
                      textTransform: 'uppercase', 
                      fontSize: isMobile ? '1rem' : 
                        window.innerWidth >= 3840 ? '1.8rem' : '1.25rem' 
                    }}>{menu.name}</span>
                    <span style={{ 
                      fontWeight: 700, 
                      fontSize: isMobile ? '1rem' : 
                        window.innerWidth >= 3840 ? '1.6rem' : '1.2rem', 
                      color: '#fff', 
                      marginLeft: isMobile ? '0' : '1rem', 
                      whiteSpace: 'nowrap' 
                    }}>${typeof menu.price === 'number' ? menu.price.toFixed(2) : '0.00'}</span>
                  </div>
                  <div style={{ 
                    color: '#bdbdbd', 
                    fontSize: isMobile ? '0.9rem' : 
                      window.innerWidth >= 3840 ? '1.4rem' : '1.05rem', 
                    fontFamily: '"Kelly Slab", cursive', 
                    marginBottom: window.innerWidth >= 3840 ? '1rem' : '0.3rem', 
                    marginLeft: '0.1rem',
                    lineHeight: isMobile ? '1.3' : 
                      window.innerWidth >= 3840 ? '1.6' : '1.2',
                  }}>{menu.description}</div>
                              {menuItems[menu._id] && menuItems[menu._id].length > 0 && (
                                <ul style={{
                                  padding: 0,
                      margin: window.innerWidth >= 3840 ? '1rem 0 0 0' : '0.5rem 0 0 0',
                                  listStyle: 'none',
                                  color: 'rgba(255, 255, 255, 0.7)',
                      fontSize: isMobile ? '0.85rem' : 
                        window.innerWidth >= 3840 ? '1.3rem' : '1rem',
                                }}>
                                  {menuItems[menu._id].map(item => (
                        <li key={item._id} style={{ 
                          marginBottom: isMobile ? '0.3rem' : 
                            window.innerWidth >= 3840 ? '0.8rem' : '0.5rem',
                          padding: window.innerWidth >= 3840 ? '0.5rem 0' : '0',
                        }}>
                                      • {item.name} - ${typeof item.price === 'number' ? item.price.toFixed(2) : '0.00'}
                                    </li>
                                  ))}
                                </ul>
                )}
              </div>
            ))}
          </div>
        )}
        </div>
      </div>
    </div>
  );
};

export default MenuList; 