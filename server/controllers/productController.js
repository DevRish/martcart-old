const chalk = require('chalk');
const { Product } = require('./../models/ProductModel');

module.exports.getProductData = (req,res) => {
    Product.find().then((products) => {
        res.status(200).json({ products: products });
    }).catch(err => {
        res.status(404).json({ error: err });
        console.log(chalk.redBright(`[-] Error while getting products : ${err}`))
    })
}