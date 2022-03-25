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
    User.find({ username: req.body.currUser }).then((users) => {
        let user = users[0];
        const checkIncludes = user.cart.find((item) => (item.prodid === req.body.prodid));
        if(checkIncludes) // Item present in cart already. Quantity needs to be modified
        {
            user.cart = user.cart.map((item) => {
                let q = item.quantity;
                if(item.prodid === req.body.prodid) return { ...item, quantity: (q+1) }
                else return item;
            })
            User.updateOne({ username: req.body.currUser }, user)
            .then(() => {
                res.status(200).json({ message: `Item ${req.body.prodid} added to cart` })
                console.log(chalk.greenBright(`[+] Item added to cart`))
            })
            .catch(err => {
                res.status(404).json({ error: err })
                console.log(chalk.redBright(`[-] Error while adding item to cart : ${err}`))
            })
        }
        else // Item doesn't exist in cart. Needs to be pushed
        {
            User.updateOne({ username: req.body.currUser }, { $push: { cart: { prodid: req.body.prodid, quantity: 1 } } })
            .then(() => {
                res.status(200).json({ message: `Item ${req.body.prodid} added to cart` })
                console.log(chalk.greenBright(`[+] Item added to cart`))
            })
            .catch(err => {
                res.status(404).json({ error: err })
                console.log(chalk.redBright(`[-] Error while adding item to cart : ${err}`))
            })
        }
    })
}

module.exports.removeFromCart = (req,res) => {
    // console.log(req.body.prodid)
    User.find({ username: req.body.currUser }).then((users) => {
        let user = users[0];
        const checkIncludes = user.cart.find((item) => (item.prodid === req.body.prodid));
        if(checkIncludes)
        {
            user.cart = user.cart.map((item) => {
                let q = item.quantity;
                if(item.prodid === req.body.prodid) return { ...item, quantity: (q-1) };
                else return item;
            })
            user.cart = user.cart.filter((item) => (item.quantity > 0))
            User.updateOne({ username: req.body.currUser }, user)
            .then(() => {
                res.status(200).json({ message: `Item ${req.body.prodid} removed from cart` })
                console.log(chalk.greenBright(`[+] Item removed from cart`))
            } )
            .catch(err => {
                res.status(404).json({ error: err })
                console.log(chalk.redBright(`[-] Error while removing item from cart : ${err}`))
            })
        }
        else
        {
            res.status(200).json({ message: `Item was not present in cart` })
            console.log(chalk.greenBright(`[+] Item was not present in cart`))
        }
    })
}