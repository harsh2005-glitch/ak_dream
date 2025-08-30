// /server/controllers/authController.js

const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// @desc    Register a new associate
// @route   POST /api/auth/register
// @access  Public
exports.registerUser = async (req, res) => {
    try {
        const {
            associateName, password, mobile, address, panNo, sponsorId
            // You can add optional fields here too like email, nomineeName etc.
        } = req.body;

            const missingFields = [];

if (!associateName) missingFields.push("Associate's Name");
if (!password) missingFields.push("Password");
if (!mobile) missingFields.push("Mobile No");
if (!address) missingFields.push("Address");
if (!panNo) missingFields.push("Pancard");
if (!sponsorId) missingFields.push("Sponsor ID");

// If the array has any items, it means fields are missing
if (missingFields.length > 0) {
    // Join the names of missing fields into a single string for a clear error message
    const errorMessage = `Please fill all required fields: ${missingFields.join(', ')}`;
    return res.status(400).json({ message: errorMessage });
}
        
        // --- Check if user already exists ---
        let userExists = await User.findOne({ mobile });
        if (userExists) {
            return res.status(400).json({ message: 'User with this mobile number already exists' });
        }

        // --- Check if the sponsor exists ---
        const sponsor = await User.findOne({ associateId: sponsorId });
        if (!sponsor) {
            return res.status(400).json({ message: 'Invalid Sponsor ID' });
        }

        // --- Hash the password ---
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // --- Generate a unique Associate ID ---
        // Simple logic for now: "AK" + timestamp
        const uniqueAssociateId = 'AK' + Date.now();

        // --- Create new user object ---
        const newUser = new User({
            ...req.body, // Include all other fields from the form like email, address, etc.
            password: hashedPassword,
            sponsor: sponsor._id, // Link to the sponsor's document ID in the database
            associateId: uniqueAssociateId
        });

        // --- Save the user to the database ---
        const savedUser = await newUser.save();

        // --- Create JWT (for automatic login after registration) ---
        const payload = {
            user: {
                id: savedUser.id
            }
        };

        jwt.sign(
            payload,
            process.env.JWT_SECRET, // We will add this to our .env file
            { expiresIn: '5h' },
            (err, token) => {
                if (err) throw err;
                res.status(201).json({ token });
            }
        );

    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};

// We will add the login controller here later...


exports.loginUser = async (req, res) => {
    try {
        const { associateId, password } = req.body;

        // --- Basic Validation ---
        if (!associateId || !password) {
            return res.status(400).json({ message: 'Please provide Associate ID and password' });
        }

        // --- Find user in database by their Associate ID ---
        const user = await User.findOne({ associateId });

        // --- If user doesn't exist, send error ---
        if (!user) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        // --- Compare the provided password with the hashed password in the database ---
        // bcrypt.compare is a special function that securely handles this check
        const isMatch = await bcrypt.compare(password, user.password);

        // --- If passwords do not match, send error ---
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        // --- If credentials are correct, create JWT ---
        const payload = {
            user: {
                id: user.id // The payload will contain the unique database _id of the user
            }
        };

        jwt.sign(
            payload,
            process.env.JWT_SECRET,
            { expiresIn: '5h' },
            (err, token) => {
                if (err) throw err;
                // --- Send the token back to the client ---
                res.json({ token });
            }
        );

    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};