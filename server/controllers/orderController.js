const chalk = require("chalk");
const { User } = require('./../models/UserModel');

module.exports.getOrderData = (req,res) => {
    User.find({ username: req.body.currUser }).then((users) => {
        res.status(200).json({ orders: users[0].orders});
    }).catch(err => {
        res.status(404).json({ error: err });
        console.log(chalk.redBright(`[-] Error while getting orders : ${err}`))
    })
}

module.exports.addOrder = (req,res) => {

    const newOrder = {
        prodid: req.body.prodid,
        date: req.body.date,
        time: req.body.time,
        quantity: req.body.quantity,
        totalPrice: req.body.totalPrice, 
        address: req.body.address
    }

    User.updateOne({ username: req.body.currUser }, { $push: { orders: newOrder } })
    .then(() => {
        res.status(200).json({ message: 'Order added successfully' })
        console.log(chalk.greenBright(`[+] Order added`))
    })
    .catch(err => {
        res.status(404).json({ error: err })
        console.log(chalk.redBright(`[-] Error while adding order : ${err}`))
    })
}