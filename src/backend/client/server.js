// backend/server.js
const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const cookieParser = require('cookie-parser');
const errorHandler = require('./middleware/errorMiddleware');
const cors = require('cors');

// Import routes
const cartRoutes = require('./routes/cartRoutes');
const addressRoutes = require('./routes/addressRoutes');
const orderRoutes = require('./routes/orderRoutes');
const authRoutes = require('./routes/authRoutes');

// Load environment variables
dotenv.config();

// Connect to MongoDB
connectDB();

const app = express();

// Middleware
app.use(express.json()); // Parse JSON bodies
app.use(cookieParser()); // To parse cookies

// CORS Configuration
const allowedOrigins = ['http://localhost:3000', 'https://your-deployed-frontend.com']; // Add more origins as needed

app.use(cors({
  origin: function (origin, callback) {
    if (!origin) return callback(null, true);
    if (allowedOrigins.indexOf(origin) === -1) {
      const msg = 'The CORS policy for this site does not allow access from the specified Origin.';
      return callback(new Error(msg), false);
    }
    return callback(null, true);
  },
  credentials: true // Allow cookies to be sent
}));

// Use the routes
app.use('/api/cart', cartRoutes); // Use cart routes under '/api/cart'
app.use('/api/address', addressRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/auth', authRoutes); // Authentication routes

// Error handling middleware
app.use(errorHandler); // Custom error handling middleware

// Server listening on a port
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
