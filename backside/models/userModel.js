// userModel.js

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    hash_password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        required: true,
        enum: ['admin', 'user', 'manager']
    },
    branch: {
        type: String,
        required: true
    },
    creation_date: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('User', userSchema);
