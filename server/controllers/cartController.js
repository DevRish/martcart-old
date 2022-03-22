const chalk = require("chalk");
const { User } = require('./../models/UserModel');

module.exports.getCartData = (req,res) => {
    User.find({ username: req.body.currUser }).then((users) => {
        res.status(200).json({ cart: users[0].cart});
    }).catch(err => {
        res.status(404).json({ error: err });
        console.log(chalk.redBright(`[-] Error while getting cart data : ${err}`))
    })
}

module.exports.addToCart = (req,res) => {
    User.updateOne({ username: req.body.currUser }, { $push: { cart: req.body.prodid } })
    .then(() => {
        res.status(200).json({ message: `Item ${req.body.prodid} added to cart` })
        console.log(chalk.greenBright(`[+] Item added to cart`))
    })
    .catch(err => {
        res.status(404).json({ error: err })
        console.log(chalk.redBright(`[-] Error while adding item to cart : ${err}`))
    })
}

module.exports.removeFromCart = (req,res) => {
    // console.log(req.body.prodid)
    User.updateOne({ username: req.body.currUser }, { $pull: { cart: req.body.prodid } })
    .then(() => {
        res.status(200).json({ message: `Item ${req.body.prodid} removed from cart` })
        console.log(chalk.greenBright(`[+] Item removed from cart`))
    } )
    .catch(err => {
        res.status(404).json({ error: err })
        console.log(chalk.redBright(`[-] Error while removing item from cart : ${err}`))
    })
}