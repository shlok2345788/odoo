// server.js
require('dotenv').config({ path: './.env' });
const express = require('express');
const cors = require('cors');
const loginRoutes = require('./routes/login');
const signupRoutes = require('./routes/signup');
const connectDB = require('./config/db');

const app = express();

// Log environment variables for debugging
console.log('Environment variables:', {
  MONGO_URI: process.env.MONGO_URI,
  JWT_SECRET: process.env.JWT_SECRET,
  PORT: process.env.PORT,
});

// Enable CORS
app.use(cors({
  origin: 'http://localhost:5173',
  methods: ['GET', 'POST'],
  credentials: true,
}));
app.use(express.json());

// Connect to MongoDB
connectDB();

// Routes
app.use('/api/login', loginRoutes);
app.use('/api/signup', signupRoutes);

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));