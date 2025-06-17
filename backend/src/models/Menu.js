const mongoose = require('mongoose');

const menuSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Menu name is required'],
    unique: true,
    trim: true
  },
  description: {
    type: String,
    required: [true, 'Menu description is required'],
    trim: true
  },
  category: {
    type: String,
    required: [true, 'Menu category is required'],
    trim: true
  },
  price: {
    type: Number,
    required: [true, 'Price is required'],
    min: [0, 'Price cannot be negative']
  }
}, {
  timestamps: true
});

// Add virtual for menu items
menuSchema.virtual('items', {
  ref: 'MenuItem',
  localField: '_id',
  foreignField: 'menuId'
});

// Ensure virtuals are included when converting to JSON
menuSchema.set('toJSON', { virtuals: true });
menuSchema.set('toObject', { virtuals: true });

const Menu = mongoose.model('Menu', menuSchema);

module.exports = Menu; 