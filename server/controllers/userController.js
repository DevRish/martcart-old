const chalk = require("chalk");
const { User } = require('./../models/UserModel');

module.exports.getUserData = (req,res) => {
    User.find({ username: req.body.currUser }).then((users) => {
        res.status(200).json({ 
            firstname: users[0].firstname,
            lastname: users[0].lastname,
            phone: users[0].phone,
            email: users[0].email,
            joinDate: users[0].joinDate
        });
    }).catch(err => {
        res.status(404).json({ error: err })
        console.log(chalk.redBright(`[-] Error while getting users: ${err}`))
    })
}