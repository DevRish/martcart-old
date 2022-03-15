const chalk = require("chalk");
const { User } = require('./../models/UserModel');

module.exports.getCartData = (req,res) => {
    User.find({ username: req.body.currUser }).then((users) => {
        res.send({ cart: users[0].cart});
    }).catch(err => console.log(chalk.redBright(`[-] Error while getting cart data : ${err}`)))
}

module.exports.addToCart = (req,res) => {
    User.updateOne({ username: req.body.currUser }, { $push: { cart: req.body.prodid } })
    .then(() => console.log(chalk.greenBright(`[+] Item added to cart`)) )
    .catch(err => console.log(chalk.redBright(`[-] Error while adding item to cart : ${err}`)))
}

module.exports.removeFromCart = (req,res) => {
    // console.log(req.body.prodid)
    User.updateOne({ username: req.body.currUser }, { $pull: { cart: req.body.prodid } })
    .then(() => console.log(chalk.greenBright(`[+] Item removed from cart`)) )
    .catch(err => console.log(chalk.redBright(`[-] Error while removing item from cart : ${err}`)))
}