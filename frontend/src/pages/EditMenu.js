import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

function EditMenu() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    description: ''
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMenu = async () => {
      try {
        const response = await axios.get('https://restaurant-app-8555.onrender.com/api/menus/' + id);
        setFormData({
          name: response.data.name,
          description: response.data.description
        });
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch menu');
        setLoading(false);
      }
    };

    fetchMenu();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put('https://restaurant-app-8555.onrender.com/api/menus/' + id, formData);
      navigate(`/menus/${id}`);
    } catch (err) {
      setError('Failed to update menu');
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="edit-menu">
      <h1>Edit Menu</h1>
      {error && <div className="error-message">{error}</div>}
      
      <form onSubmit={handleSubmit} className="menu-form">
        <div className="form-group">
          <label htmlFor="name">Menu Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="description">Description:</label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-actions">
          <button type="submit" className="btn btn-primary">
            Update Menu
          </button>
          <button
            type="button"
            className="btn btn-secondary"
            onClick={() => navigate(`/menus/${id}`)}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}

export default EditMenu; 