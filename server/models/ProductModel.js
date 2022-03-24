const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    prod_name: String,
    img_url: String,
    price: Number,
    discount_percent: Number,
    tags: [String]
})

module.exports.Product = mongoose.model('Product', productSchema);