import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';

function MenuDetail() {
  const { id } = useParams();
  const [menu, setMenu] = useState(null);
  const [menuItems, setMenuItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMenuAndItems = async () => {
      try {
        const [menuResponse, itemsResponse] = await Promise.all([
          axios.get(`http://localhost:5000/api/menus/${id}`),
          axios.get(`http://localhost:5000/api/items/menu/${id}`)
        ]);
        setMenu(menuResponse.data);
        setMenuItems(itemsResponse.data);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch menu details');
        setLoading(false);
      }
    };

    fetchMenuAndItems();
  }, [id]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;
  if (!menu) return <div>Menu not found</div>;

  return (
    <div className="menu-detail">
      <h1>{menu.name}</h1>
      <p className="menu-description">{menu.description}</p>
      
      <div className="menu-actions">
        <Link to={`/menus/${id}/edit`} className="btn btn-primary">
          Edit Menu
        </Link>
        <Link to="/" className="btn btn-secondary">
          Back to Menus
        </Link>
      </div>

      <div className="menu-items">
        <h2>Menu Items</h2>
        <div className="items-grid">
          {menuItems.map((item) => (
            <div key={item.id} className="item-card">
              <h3>{item.name}</h3>
              <p>{item.description}</p>
              <p className="price">${item.price}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default MenuDetail; 