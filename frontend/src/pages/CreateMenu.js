import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const CreateMenu = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    category: '',
    price: ''
  });
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState([]);
  const [showNewCategoryInput, setShowNewCategoryInput] = useState(false);
  const [newCategory, setNewCategory] = useState('');

  useEffect(() => {
    // Fetch existing categories from backend
    const fetchCategories = async () => {
      try {
        const response = await axios.get('https://restaurant-app-8555.onrender.com/api/menus');
        const uniqueCategories = Array.from(new Set(response.data.map(menu => menu.category && menu.category.toLowerCase()).filter(Boolean)));
        setCategories(uniqueCategories);
      } catch (err) {
        // Ignore error, just don't show dropdown
      }
    };
    fetchCategories();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'price') {
      // Allow empty string or valid positive numbers
      if (value === '' || (!isNaN(value) && parseFloat(value) >= 0)) {
        setFormData(prev => ({
          ...prev,
          [name]: value
        }));
      }
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const handleCategoryChange = (e) => {
    const value = e.target.value;
    if (value === "__new__") {
      setShowNewCategoryInput(true);
      setFormData(prev => ({
        ...prev,
        category: ''
      }));
    } else {
      setShowNewCategoryInput(false);
      setFormData(prev => ({
        ...prev,
        category: value
      }));
    }
  };

  const handleNewCategoryChange = (e) => {
    const value = e.target.value;
    setNewCategory(value);
    setFormData(prev => ({
      ...prev,
      category: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      // Validate price
      if (!formData.price || isNaN(formData.price) || parseFloat(formData.price) < 0) {
        throw new Error('Please enter a valid price');
      }

      const menuData = {
        ...formData,
        price: parseFloat(formData.price)
      };

      const response = await axios.post('https://restaurant-app-8555.onrender.com/api/menus', menuData);
      navigate('/');
    } catch (err) {
      setError(err.response?.data?.error || err.message || 'Failed to create menu. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="responsive-form" style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: 'linear-gradient(120deg, #f8e8ee 0%, #e0f7fa 100%)',
      padding: '2rem 0',
    }}>
      <div style={{
        background: '#fff',
        borderRadius: '20px',
        boxShadow: '0 6px 32px rgba(0,0,0,0.10)',
        padding: '2.5rem 2rem',
        maxWidth: '420px',
        width: '100%',
        fontFamily: '"Quicksand", "Segoe UI", sans-serif',
      }}>
        <div style={{ marginBottom: '1.5rem', textAlign: 'center' }}>
          <h1 style={{
            fontSize: '2rem',
            fontWeight: 800,
            color: '#d72660',
            marginBottom: '0.3rem',
            letterSpacing: '1px',
          }}>Create New Menu</h1>
          <p style={{ color: '#7a7a7a', fontSize: '1rem' }}>Add a new menu item to your restaurant</p>
        </div>

        {error && (
          <div style={{
            background: '#ffe0ef',
            color: '#d72660',
            borderRadius: '8px',
            padding: '0.7rem 1rem',
            marginBottom: '1rem',
            fontWeight: 600,
            textAlign: 'center',
          }}>
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: '1.2rem' }}>
            <label htmlFor="name" style={{ fontWeight: 600, color: '#3b3b3b', display: 'block', marginBottom: 6 }}>Menu Name</label>
            <input
              type="text"
              id="name"
              name="name"
              style={{
                width: '100%',
                padding: '0.7rem',
                borderRadius: '8px',
                border: '1.5px solid #e0e0e0',
                fontSize: '1rem',
                outline: 'none',
                transition: 'border 0.2s',
                marginBottom: 0,
              }}
              value={formData.name}
              onChange={handleChange}
              required
              placeholder="Enter menu name"
            />
          </div>

          <div style={{ marginBottom: '1.2rem' }}>
            <label htmlFor="description" style={{ fontWeight: 600, color: '#3b3b3b', display: 'block', marginBottom: 6 }}>Description</label>
            <textarea
              id="description"
              name="description"
              style={{
                width: '100%',
                padding: '0.7rem',
                borderRadius: '8px',
                border: '1.5px solid #e0e0e0',
                fontSize: '1rem',
                outline: 'none',
                minHeight: '70px',
                resize: 'vertical',
                transition: 'border 0.2s',
              }}
              value={formData.description}
              onChange={handleChange}
              required
              placeholder="Enter menu description"
              rows="4"
            />
          </div>

          <div style={{ marginBottom: '1.2rem' }}>
            <label htmlFor="price" style={{ fontWeight: 600, color: '#3b3b3b', display: 'block', marginBottom: 6 }}>Price ($)</label>
            <input
              type="number"
              id="price"
              name="price"
              style={{
                width: '100%',
                padding: '0.7rem',
                borderRadius: '8px',
                border: '1.5px solid #e0e0e0',
                fontSize: '1rem',
                outline: 'none',
                marginBottom: 0,
                transition: 'border 0.2s',
              }}
              value={formData.price}
              onChange={handleChange}
              required
              min="0"
              step="0.01"
              placeholder="Enter price"
            />
          </div>

          <div style={{ marginBottom: '1.5rem' }}>
            <label htmlFor="category" style={{ fontWeight: 600, color: '#3b3b3b', display: 'block', marginBottom: 6 }}>Category</label>
            <select
              id="category"
              name="category"
              style={{
                width: '100%',
                padding: '0.7rem',
                borderRadius: '8px',
                border: '1.5px solid #e0e0e0',
                fontSize: '1rem',
                outline: 'none',
                marginBottom: showNewCategoryInput ? '0.5rem' : 0,
                transition: 'border 0.2s',
              }}
              value={showNewCategoryInput ? "__new__" : formData.category}
              onChange={handleCategoryChange}
              required
            >
              <option value="">Select a category</option>
              {categories.map((cat, idx) => (
                <option key={idx} value={cat}>{cat.charAt(0).toUpperCase() + cat.slice(1)}</option>
              ))}
              <option value="__new__">Add New Category</option>
            </select>
            {showNewCategoryInput && (
              <input
                type="text"
                id="new-category"
                style={{
                  width: '100%',
                  padding: '0.7rem',
                  borderRadius: '8px',
                  border: '1.5px solid #e0e0e0',
                  fontSize: '1rem',
                  outline: 'none',
                  marginTop: '0.5rem',
                  transition: 'border 0.2s',
                }}
                value={newCategory}
                onChange={handleNewCategoryChange}
                placeholder="Enter new category"
                required
              />
            )}
          </div>

          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', marginTop: '2rem' }}>
            <button
              type="submit"
              style={{
                background: 'linear-gradient(90deg, #d72660 0%, #3bb273 100%)',
                color: '#fff',
                fontWeight: 700,
                border: 'none',
                borderRadius: '8px',
                padding: '0.8rem 2.2rem',
                fontSize: '1.08rem',
                cursor: 'pointer',
                boxShadow: '0 2px 8px rgba(215,38,96,0.08)',
                transition: 'background 0.2s, transform 0.15s',
                outline: 'none',
                letterSpacing: '0.5px',
                opacity: loading ? 0.7 : 1,
              }}
              disabled={loading}
            >
              {loading ? 'Creating...' : 'Create Menu'}
            </button>
            <button
              type="button"
              onClick={() => navigate(-1)}
              style={{
                background: '#f8e8ee',
                color: '#d72660',
                fontWeight: 700,
                border: 'none',
                borderRadius: '8px',
                padding: '0.8rem 2.2rem',
                fontSize: '1.08rem',
                cursor: 'pointer',
                boxShadow: '0 2px 8px rgba(215,38,96,0.08)',
                transition: 'background 0.2s, transform 0.15s',
                outline: 'none',
                letterSpacing: '0.5px',
              }}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateMenu; 