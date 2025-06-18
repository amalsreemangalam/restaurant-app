import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import bgImage from '../assets/images/person-serving-cup-coffee.jpg';

const MenuList = () => {
  const [menus, setMenus] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [menuItems, setMenuItems] = useState({});
  const [retryCount, setRetryCount] = useState(0);

  useEffect(() => {
    const fetchMenus = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const response = await axios.get('https://restaurant-app-8555.onrender.com/api/menus');
        if (!response.data) {
          throw new Error('No data received from server');
        }
        
        setMenus(response.data);
        
      
        const itemsPromises = response.data.map(menu => 
          axios.get('https://restaurant-app-8555.onrender.com/api/items/menu/' + menu._id)
        );
        
        const itemsResponses = await Promise.all(itemsPromises);
        
      
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

    fetchMenus();
  }, [retryCount]); 

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <div className="loading-text">Loading categories...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="error-container">
        <div className="error-message">{error}</div>
        <button 
          className="retry-button"
          onClick={() => setRetryCount(prev => prev + 1)}
        >
          Retry
        </button>
      </div>
    );
  }

  
  const categories = Array.from(new Set(menus.map(menu => menu.category && menu.category.toLowerCase()).filter(Boolean)));

  if (categories.length === 0 && !loading && !error) {
    return (
      <div className="container">
        <div className="alert">
          No categories found. Create your first menu to get started!
        </div>
      </div>
    );
  }


  const getCategoryIcon = (category) => {
    switch (category.toLowerCase()) {
      case 'food':
        return <i className="fas fa-utensils"></i>; // fork & knife
      case 'drinks':
      case 'drink':
        return <span role="img" aria-label="Drink" style={{fontSize: '2.5rem'}}>🥤</span>; // cup with straw emoji
      case 'softdrinks':
      case 'softdrink':
        return <span role="img" aria-label="Softdrink" style={{fontSize: '2.5rem'}}>🧃</span>; // juice box emoji
      case 'brunch':
        return <span role="img" aria-label="Brunch" style={{fontSize: '2.5rem'}}>🍳</span>; // fried egg emoji
      default:
        return <i className="fas fa-utensils"></i>; // fallback to utensils
    }
  };


  const filteredMenus = selectedCategory
    ? menus.filter(menu => menu.category && menu.category.toLowerCase() === selectedCategory)
    : [];

  return (
    <div
      className="home-bg-image"
      style={{
        backgroundImage: `url(${bgImage})`,
        minHeight: '100vh',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        position: 'relative',
      }}
    >
      <div className="container" style={{ position: 'relative', zIndex: 2, marginTop: '1.5rem' }}>
        <div className="main-heading-section" style={{ marginTop: 0 }}>
          <h1 className="main-heading">Menu</h1>
          <p className="main-subheading">Please take a look at our menu featuring food, drinks, and brunch. If you'd like to place an order, use the "Create New Menu" button below.</p>
        </div>
        <div className="card-header" style={{ marginTop: '1.2rem' }}>
          <Link to="/menus/create" className="btn btn-primary">
            <i className="fas fa-plus"></i> Create New Menu
          </Link>
        </div>

        {categories.length === 0 ? (
          <div className="alert">
            No categories found. Create your first menu to get started!
          </div>
        ) : (
          <>
            <div className="grid">
              {categories.map((category, idx) => (
                <div key={idx} className="card-container">
                  <div
                    className={`brown-category-card${selectedCategory === category ? ' selected' : ''}`}
                    onClick={() => setSelectedCategory(selectedCategory === category ? null : category)}
                    onMouseOver={e => e.currentTarget.style.transform = 'translateY(-6px) scale(1.04)'}
                    onMouseOut={e => e.currentTarget.style.transform = 'none'}
                  >
                    <div className="card-content category-card-content" style={{ color: '#b2dfdb', fontSize: '2.5rem', marginBottom: '1rem' }}>
                      <div className="category-icon">
                        {getCategoryIcon(category)}
                      </div>
                      <h2 className="category-title" style={{ color: '#fff', fontWeight: 700, fontSize: '1.3rem', marginTop: '0.7rem', letterSpacing: '1px' }}>
                        {category.charAt(0).toUpperCase() + category.slice(1)}
                      </h2>
                    </div>
                  </div>
                  {selectedCategory === category && (
                    <div className="category-menus-section">
                      <h3 className="category-menus-heading">
                        {selectedCategory.charAt(0).toUpperCase() + selectedCategory.slice(1)} Menu
                      </h3>
                      <div className="responsive-menu-card">
                        <div className="menu-card-scroll-area max-h-72 overflow-y-auto overflow-x-hidden w-full">
                          {filteredMenus.length === 0 ? (
                            <div className="alert">No menus found for this category.</div>
                          ) : (
                            filteredMenus.map(menu => (
                              <div key={menu._id} className="menu-item w-full">
                                <div className="menu-item-name break-words">{menu.name}</div>
                                <div className="menu-item-description break-words">{menu.description}</div>
                                <div className="menu-item-price">${typeof menu.price === 'number' ? menu.price.toFixed(2) : '0.00'}</div>
                                {menuItems[menu._id] && menuItems[menu._id].length > 0 && (
                                  <ul style={{
                                    padding: 0,
                                    margin: '0.5rem 0 0 0',
                                    listStyle: 'none',
                                    color: 'rgba(255, 255, 255, 0.7)',
                                  }}>
                                    {menuItems[menu._id].map(item => (
                                      <li key={item._id} style={{ marginBottom: '0.5rem' }}>
                                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                                          <span className="break-words" style={{ fontWeight: 500 }}>{item.name}</span>
                                          {item.price && (
                                            <span style={{ color: '#4ecdc4', marginLeft: '1rem' }}>${item.price.toFixed(2)}</span>
                                          )}
                                        </div>
                                        {item.description && (
                                          <div className="break-words" style={{ fontSize: '0.9em', color: 'rgba(255, 255, 255, 0.5)', marginTop: '0.2rem' }}>
                                            {item.description}
                                          </div>
                                        )}
                                      </li>
                                    ))}
                                  </ul>
                                )}
                              </div>
                            ))
                          )}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </>
        )}
      </div>
      <div className="bg-overlay"></div>
    </div>
  );
};

export default MenuList; 