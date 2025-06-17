const MenuItem = require('../models/MenuItem');
const Menu = require('../models/Menu');

// Get all menu items
const getAllMenuItems = async (req, res) => {
  try {
    const menuItems = await MenuItem.find();
    res.json(menuItems);
  } catch (error) {
    console.error('Error in getAllMenuItems:', error);
    res.status(500).json({ error: error.message || 'Failed to fetch menu items' });
  }
};

// Create a new menu item
const createMenuItem = async (req, res) => {
  try {
    // Check if menu exists
    const menu = await Menu.findById(req.body.menuId);
    if (!menu) {
      return res.status(404).json({ error: 'Menu not found' });
    }

    const menuItem = new MenuItem(req.body);
    await menuItem.save();
    
    res.status(201).json(menuItem);
  } catch (error) {
    console.error('Error in createMenuItem:', error);
    res.status(400).json({ error: error.message || 'Failed to create menu item' });
  }
};

// Get menu item by ID
const getMenuItemById = async (req, res) => {
  try {
    const menuItem = await MenuItem.findById(req.params.id);
    if (!menuItem) {
      return res.status(404).json({ error: 'Menu item not found' });
    }
    res.json(menuItem);
  } catch (error) {
    console.error('Error in getMenuItemById:', error);
    res.status(500).json({ error: error.message || 'Failed to fetch menu item' });
  }
};

// Update menu item
const updateMenuItem = async (req, res) => {
  try {
    const menuItem = await MenuItem.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    
    if (!menuItem) {
      return res.status(404).json({ error: 'Menu item not found' });
    }
    
    res.json(menuItem);
  } catch (error) {
    console.error('Error in updateMenuItem:', error);
    res.status(400).json({ error: error.message || 'Failed to update menu item' });
  }
};

// Delete menu item
const deleteMenuItem = async (req, res) => {
  try {
    const menuItem = await MenuItem.findByIdAndDelete(req.params.id);
    if (!menuItem) {
      return res.status(404).json({ error: 'Menu item not found' });
    }
    res.status(204).send();
  } catch (error) {
    console.error('Error in deleteMenuItem:', error);
    res.status(500).json({ error: error.message || 'Failed to delete menu item' });
  }
};

// Get menu items by menu ID
const getMenuItemsByMenuId = async (req, res) => {
  try {
    const menuItems = await MenuItem.find({ menuId: req.params.menuId });
    res.json(menuItems);
  } catch (error) {
    console.error('Error in getMenuItemsByMenuId:', error);
    res.status(500).json({ error: error.message || 'Failed to fetch menu items' });
  }
};

module.exports = {
  getAllMenuItems,
  createMenuItem,
  getMenuItemById,
  updateMenuItem,
  deleteMenuItem,
  getMenuItemsByMenuId
}; 