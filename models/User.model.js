const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    login: { type: String, required: true },
    password: { type: String, required: true },
    avatar: { type: String, required: true },
    phone: { type: Number, required: true }
});

module.exports = mongoose.model('User', UserSchema);