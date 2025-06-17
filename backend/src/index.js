const express = require('express');
const cors = require('cors');
const connectDB = require('./config/database');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/menus', require('./routes/menuRoutes'));
app.use('/api/items', require('./routes/menuItemRoutes'));

// Error handling middleware
app.use((err, req, res, next) => {
  res.status(500).json({ message: 'Something went wrong!' });
});

// Start server
async function startServer() {
  try {
    // Test database connection
    await connectDB();
    app.listen(port);
  } catch (error) {
    process.exit(1);
  }
}

startServer(); 