const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    firstname: String,
    lastname: String,
    username: String,
    phone: String,
    email: String,
    password: String,
    cart: { type: Array },
    orders: { type: Array },
    joinDate: { type: Date, default: Date.now}
});

module.exports.User = mongoose.model('User', userSchema);