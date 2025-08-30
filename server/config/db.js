// /server/config/db.js (For Local MongoDB)

const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        // This code reads the local URI from your .env file
        await mongoose.connect(process.env.MONGO_URI, {
            // These options are no longer strictly necessary for Mongoose v6+ but are good practice for compatibility
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        // Updated success message for clarity
        console.log('Local MongoDB Connected...');
    } catch (err) {
        console.error('Database connection error:', err.message);
        // Exit process with failure if we can't connect to the DB
        process.exit(1);
    }
};

module.exports = connectDB;