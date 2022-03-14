const chalk = require("chalk");
const { User } = require('./../models/UserModel');

module.exports.signinController = async (req, res) => {
    const newUser = new User({
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        username: req.body.username,
        phone: req.body.phone,
        email: req.body.email,
        password: req.body.password,
        cart: [],
        orders: [],
        joinDate: new Date()
    });
    User.find({ username: req.body.username }).then((users) => {
        if(users.length===0)
        {
            newUser.save().then(() => res.send('success')).catch(err => console.log(err));
        }
        else res.send('Username already exists. Please signin or choose different username.');
    }).catch(err => console.log(chalk.redBright(`[-] Error while signing up : ${err}`)));
}

module.exports.loginController = async (req, res) => {
    User.find({ username: req.body.username }).then((users) => {
        if(users.length===0) res.send('Account doesnot exist.');
        else
        {
            if(users[0].password === req.body.password) res.send('success');
            else res.send('Wrong Password');
        }
    }).catch(err => console.log(chalk.redBright(`[-] Error logging in : ${err}`)));
}