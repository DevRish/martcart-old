const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    firstname: String,
    lastname: String,
    username: String,
    phone: String,
    email: String,
    password: String,
    cart: Array,
    orders: Array,
    joinDate: String
});

module.exports.User = mongoose.model('User', userSchema);