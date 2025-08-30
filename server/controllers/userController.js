// /server/controllers/userController.js

const User = require('../models/User');

// @desc    Get user's own data for the dashboard
// @route   GET /api/users/me
// @access  Private (requires token)
exports.getMe = async (req, res) => {
    try {
        // req.user is attached by the authMiddleware
        // It already contains the logged-in user's data (without the password)
        const user = req.user;

        // For now, we just send the user's own profile data back.
        // We will add Total Business, Direct Team count etc. here later.
        res.json({
            associateId: user.associateId,
            associateName: user.associateName,
            mobile: user.mobile,
            address: user.address,
            currentLevel: user.commissionLevel,
            // ... add any other basic profile fields needed
        });
        
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};