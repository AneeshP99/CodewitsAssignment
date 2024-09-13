const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const routes = require('./routes'); // Importing all routes from the routes' index.js
const errorHandler = require('./middleware/errorHandler'); // Custom error handler middleware if required

// Load environment variables
dotenv.config();

const app = express();

// Middleware
app.use(express.json()); // To handle JSON request bodies
app.use(cors()); // Enable CORS for cross-origin requests

// Database connection
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('MongoDB connected'))
.catch((err) => console.error('MongoDB connection error:', err));

// Routes
app.use('/api', routes); // This will automatically include auth, employee, and leave routes from routes/index.js

// Error handling middleware
app.use(errorHandler);

// Port setup
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

module.exports = app; // Export the app for testing purposes
