// /server/models/User.js

const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    // Personal Details from Registration Form
    associateName: { type: String, required: true },
    password: { type: String, required: true },
    mobile: { type: String, required: true, unique: true },
    email: { type: String, unique: true },
    gender: { type: String },
    nomineeName: { type: String },
    relation: { type: String },
    address: { type: String },
    state: { type: String },
    district: { type: String },
    pincode: { type: String },

    // Bank & ID Details
    bankName: { type: String },
    branch: { type: String },
    accountNo: { type: String },
    ifscCode: { type: String },
    aadharNo: { type: String },
    panNo: { type: String },

    // Core Business & Network Details
    associateId: { type: String, required: true, unique: true },
    sponsor: { // The link to the sponsor (another user)
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User' 
    },
    commissionLevel: { type: Number, default: 0 }, // The user's percentage level (e.g., 7, 10, 13)
    status: { type: String, default: 'Active' },
    
    // Auto-generated timestamp
    dateOfJoining: { type: Date, default: Date.now }
});


// We will add password hashing here later using bcryptjs

module.exports = mongoose.model('User', UserSchema);