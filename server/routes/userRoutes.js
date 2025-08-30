// /server/routes/userRoutes.js

const express = require('express');
const router = express.Router();
const { getMe } = require('../controllers/userController');
const { protect } = require('../middleware/authMiddleware'); // Import the middleware

// Defines a GET route at /api/users/me
// When a request hits this URL, it first goes through the 'protect' middleware.
// If the token is valid, it then proceeds to the 'getMe' controller.
router.get('/me', protect, getMe);

module.exports = router;