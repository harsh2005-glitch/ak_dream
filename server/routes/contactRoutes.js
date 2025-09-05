// /server/routes/contactRoutes.js

const express = require('express');
const router = express.Router();
const { sendContactEmail } = require('../controllers/contactController');

// Defines the route: POST http://localhost:5000/api/contact
router.post('/', sendContactEmail);

module.exports = router;