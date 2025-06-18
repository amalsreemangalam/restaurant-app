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

  useEffect(() => {
    const fetchMenus = async () => {
      try {
        const response = await axios.get('https://restaurant-app-8555.onrender.com/api/menus');
        setMenus(response.data);
        
        // Fetch menu items for each menu
        const itemsPromises = response.data.map(menu => 
          axios.get('https://restaurant-app-8555.onrender.com/api/items/menu/' + menu._id)
        );
        const itemsResponses = await Promise.all(itemsPromises);
        
        // Create a map of menuId to its items
        const menuItemsMap = {};
        response.data.forEach((menu, index) => {
          menuItemsMap[menu._id] = itemsResponses[index].data;
        });
        
        setMenuItems(menuItemsMap);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch menus. Please try again later.');
        setLoading(false);
      }
    };

    fetchMenus();
  }, []);

  if (loading) {
    return (
      <div className="container">
        <div className="alert">Loading categories...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container">
        <div className="alert alert-error">{error}</div>
      </div>
    );
  }

  // Extract unique categories
  const categories = Array.from(new Set(menus.map(menu => menu.category && menu.category.toLowerCase()).filter(Boolean)));

  // Helper to get icon for category
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

  // Filter menus for the selected category
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
          <div className="grid">
            {categories.map((category, idx) => (
              <div
                key={idx}
                className={`brown-category-card category-card${selectedCategory === category ? ' selected' : ''}`}
                onClick={() => setSelectedCategory(selectedCategory === category ? null : category)}
                onMouseOver={e => e.currentTarget.style.transform = 'translateY(-6px) scale(1.04)'}
                onMouseOut={e => e.currentTarget.style.transform = 'none'}
              >
                <div className="card-content category-card-content" style={{ color: '#b2dfdb', fontSize: '2.5rem', marginBottom: '1rem' }}>
                  <div className="category-icon">
                    {getCategoryIcon(category)}
                  </div>
                  <h2 className="category-title" style={{ color: '#fff', fontWeight: 700, fontSize: '1.3rem', marginTop: '0.7rem', letterSpacing: '1px' }}>{category.charAt(0).toUpperCase() + category.slice(1)}</h2>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Show menu items for selected category */}
        {selectedCategory && (
          <div className="category-menus-section">
            <h3 className="category-menus-heading">
              {selectedCategory.charAt(0).toUpperCase() + selectedCategory.slice(1)} Menus
            </h3>
            {filteredMenus.length === 0 ? (
              <div className="alert">No menus found for this category.</div>
            ) : (
              <div className="responsive-menu-card" style={{
                background: '#fff6fa',
                borderRadius: '18px',
                boxShadow: '0 4px 16px rgba(0,0,0,0.08)',
                padding: '2rem 1.5rem',
                maxWidth: '500px',
                margin: '2rem auto',
                border: '1.5px solid #ffe0ef',
                fontFamily: '"Quicksand", "Segoe UI", sans-serif',
              }}>
                <ul style={{
                  listStyle: 'none',
                  padding: 0,
                  margin: 0,
                }}>
                  {filteredMenus.map(menu => (
                    <li key={menu._id} style={{
                      marginBottom: '1.5rem',
                      paddingBottom: '1.2rem',
                      borderBottom: '1px solid #f3d6e3',
                    }}>
                      <div style={{ fontWeight: 700, fontSize: '1.1rem', color: '#d72660', marginBottom: '0.2rem' }}>{menu.name}</div>
                      <div style={{ color: '#7a7a7a', fontSize: '0.98rem', marginBottom: '0.3rem' }}>{menu.description}</div>
                      <div style={{ fontWeight: 600, color: '#3bb273', fontSize: '1.05rem' }}>
                        ${typeof menu.price === 'number' ? menu.price.toFixed(2) : '0.00'}
                      </div>
                      {menuItems[menu._id] && menuItems[menu._id].length > 0 && (
                        <ul style={{
                          padding: 0,
                          margin: '0.5rem 0 0 0',
                          listStyle: 'disc inside',
                          color: '#5a5a5a',
                          fontSize: '0.97rem',
                        }}>
                          {menuItems[menu._id].map(item => (
                            <li key={item._id} style={{ marginBottom: '0.2rem' }}>
                              <span style={{ fontWeight: 500 }}>{item.name}</span>
                              {item.description && (
                                <span style={{ color: '#b48a78', marginLeft: 6, fontSize: '0.92em' }}> - {item.description}</span>
                              )}
                            </li>
                          ))}
                        </ul>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )}
      </div>
      <div className="bg-overlay"></div>
    </div>
  );
};

export default MenuList; 