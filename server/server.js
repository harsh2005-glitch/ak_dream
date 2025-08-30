// /server/server.js (FINAL REBUILT VERSION)

require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const path = require('path'); // <-- ADD THIS IMPORT

// Connect Database
connectDB();

const app = express();

// Init Middleware
app.use(cors());
app.use(express.json());

// API Routes
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/users', require('./routes/userRoutes'));

// Simple Test Route
app.get('/api/test', (req, res) => res.send('API is Running...')); // Changed path to avoid conflicts


// --- Serve Frontend Static Files ---
const clientPath = path.resolve(__dirname, '../client/public');
app.use(express.static(clientPath));

// app.get('*', (req, res) => {
//     res.sendFile(path.resolve(clientPath, 'login.html'));
// });


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));