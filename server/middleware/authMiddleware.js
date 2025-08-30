// /server/middleware/authMiddleware.js

const jwt = require('jsonwebtoken');
const User = require('../models/User');

const protect = async (req, res, next) => {
    let token;

    // Check if the request has an Authorization header, and it starts with 'Bearer'
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
            // Get token from the header (e.g., "Bearer eyJhbGciOiJIUz...")
            token = req.headers.authorization.split(' ')[1];

            // Verify the token using our JWT_SECRET
            const decoded = jwt.verify(token, process.env.JWT_SECRET);

            // Find the user by the ID in the token's payload
            // '-password' means we exclude the password field from the returned user object
            req.user = await User.findById(decoded.user.id).select('-password');
            
            // Move on to the next function (the controller)
            next();

        } catch (error) {
            console.error(error);
            res.status(401).json({ message: 'Not authorized, token failed' });
        }
    }

    if (!token) {
        res.status(401).json({ message: 'Not authorized, no token' });
    }
};

module.exports = { protect };