const Menu = require('../models/Menu');

// Get all menus
const getAllMenus = async (req, res) => {
  try {
    console.log('Fetching all menus...');
    const menus = await Menu.find().populate('items');
    console.log('Found menus:', menus);
    res.json(menus);
  } catch (error) {
    console.error('Error in getAllMenus:', error);
    res.status(500).json({ error: error.message || 'Failed to fetch menus' });
  }
};

// Create a new menu
const createMenu = async (req, res) => {
  try {
    console.log('Received body:', req.body);

    // Validate required fields
    if (!req.body.name || !req.body.description || !req.body.category || req.body.price === undefined) {
      return res.status(400).json({
        error: 'Name, description, category, and price are required',
        received: req.body
      });
    }

    // Validate price is a valid number
    const price = Number(req.body.price);
    if (isNaN(price) || price < 0) {
      return res.status(400).json({
        error: 'Price must be a valid non-negative number',
        received: req.body
      });
    }

    // Create menu with validated data
    const menu = new Menu({
      name: req.body.name,
      description: req.body.description,
      category: req.body.category,
      price: price
    });
    console.log('Menu to be saved:', menu);

    const savedMenu = await menu.save();
    console.log('Saved menu:', savedMenu);

    res.status(201).json(savedMenu);
  } catch (error) {
    console.error('Error in createMenu:', error);
    if (error.code === 11000) {
      res.status(400).json({ error: 'A menu with this name already exists' });
    } else {
      res.status(400).json({ error: error.message || 'Failed to create menu' });
    }
  }
};

// Get menu by ID
const getMenuById = async (req, res) => {
  try {
    console.log('Fetching menu by ID:', req.params.id);
    const menu = await Menu.findById(req.params.id).populate('items');
    if (!menu) {
      console.log('Menu not found');
      return res.status(404).json({ error: 'Menu not found' });
    }
    console.log('Found menu:', menu);
    res.json(menu);
  } catch (error) {
    console.error('Error in getMenuById:', error);
    res.status(500).json({ error: error.message || 'Failed to fetch menu' });
  }
};

// Update menu
const updateMenu = async (req, res) => {
  try {
    console.log('Updating menu:', req.params.id);
    console.log('Update data:', req.body);
    
    const menu = await Menu.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    
    if (!menu) {
      console.log('Menu not found for update');
      return res.status(404).json({ error: 'Menu not found' });
    }
    
    console.log('Updated menu:', menu);
    res.json(menu);
  } catch (error) {
    console.error('Error in updateMenu:', error);
    if (error.code === 11000) {
      res.status(400).json({ error: 'A menu with this name already exists' });
    } else {
      res.status(400).json({ error: error.message || 'Failed to update menu' });
    }
  }
};

// Delete menu
const deleteMenu = async (req, res) => {
  try {
    console.log('Deleting menu:', req.params.id);
    const menu = await Menu.findByIdAndDelete(req.params.id);
    if (!menu) {
      console.log('Menu not found for deletion');
      return res.status(404).json({ error: 'Menu not found' });
    }
    console.log('Deleted menu:', menu);
    res.status(204).send();
  } catch (error) {
    console.error('Error in deleteMenu:', error);
    res.status(500).json({ error: error.message || 'Failed to delete menu' });
  }
};

module.exports = {
  getAllMenus,
  createMenu,
  getMenuById,
  updateMenu,
  deleteMenu
}; 