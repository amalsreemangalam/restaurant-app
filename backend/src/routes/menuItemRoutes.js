const express = require('express');
const router = express.Router();
const { 
  createMenuItem, 
  getMenuItemsByMenuId, 
  getMenuItemById,
  updateMenuItem,
  deleteMenuItem 
} = require('../controllers/menuItemController');

router.post('/', createMenuItem);
router.get('/menu/:menuId', getMenuItemsByMenuId);
router.get('/:id', getMenuItemById);
router.put('/:id', updateMenuItem);
router.delete('/:id', deleteMenuItem);

module.exports = router; 