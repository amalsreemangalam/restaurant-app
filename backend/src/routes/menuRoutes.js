const express = require('express');
const router = express.Router();
const { 
  getAllMenus, 
  createMenu, 
  getMenuById,
  updateMenu,
  deleteMenu 
} = require('../controllers/menuController');

router.get('/', getAllMenus);
router.post('/', createMenu);
router.get('/:id', getMenuById);
router.put('/:id', updateMenu);
router.delete('/:id', deleteMenu);

module.exports = router; 