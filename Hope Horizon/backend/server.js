const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');

// Route imports
const authRoutes = require('./routes/auth');
const studentRoutes = require('./routes/student');
const headmasterRoutes = require('./routes/headmaster');
const facultyRoutes = require('./routes/faculty');
const parentRoutes = require('./routes/parent');

// Load environment variables from .env
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000; // Default to 5000 if PORT isn't set

// Middleware
app.use(cors()); // Enable Cross-Origin Resource Sharing
app.use(express.json()); // Parse incoming JSON data

// Basic Welcome Route
app.get('/', (req, res) => {
    res.send('Welcome to the Hope Horizon backend!');
});

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/students', studentRoutes);
app.use('/api/headmaster', headmasterRoutes);
app.use('/api/faculty', facultyRoutes);
app.use('/api/parent', parentRoutes);

// Database Connection
mongoose.connect(process.env.MONGO_URI) // Ensure MONGO_URI is set in the .env file
  .then(() => {
    console.log('MongoDB Connected');
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch(err => console.error(err));
