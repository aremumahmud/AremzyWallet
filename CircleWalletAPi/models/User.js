const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    googleId: { type: String, required: true },
    displayName: { type: String, required: true },
    email: { type: String, required: true },
    wallet_set_name: { type: String, required: true },
    wallet_set_id: { type: String, required: true },
    wallets: []
});

module.exports = mongoose.model('User', userSchema);