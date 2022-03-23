const bcrypt = require('bcryptjs');
const validator = require('validatorjs');
const passport = require('passport');
const chalk = require("chalk");
const { User } = require('./../models/UserModel');
const { CLIENT_URL } = require('./../config/keys');
const { userRules, userErrors } = require('./../validations/userValidation');

module.exports.signupController = async (req, res, next) => {
    let newUser = req.body;
    try 
    {
        // Validate data
        const validation = new validator(newUser, userRules, userErrors);
        if(validation.fails()) return res.status(400).json({ message: 'Invalid data passed', errors: validation.errors });

        // Check existing
        const existingUser = await User.findOne({username: newUser.username});
        if(existingUser) return res.status(404).json({ message : 'User already exists' });

        // Encrypt password
        const salt = await bcrypt.genSalt(10);
        const encryptedPassword = await bcrypt.hash(newUser.password, salt);
        newUser = {...newUser, password: encryptedPassword}

        // Save user
        const savedUser = await User.create(newUser); // savedUser is just newUser with an extra _id attribute, given by the database
        console.log(chalk.greenBright(`[+] Account of ${savedUser.username} was created`));
        // res.status(200).json({ username: savedUser.username }); // Don't do this, as login will be called next, and we want to 
        // send response from there, not here. Sending from here will give "Cannot set headers after they are sent to client" error
        // res.redirect('/login');
        next();

    } catch (err) 
    {
        console.log(chalk.redBright("[-] Error occured in registration: \n" + err));
        res.status(400).json({ message: `Something went wrong. Please try again.` });
    }
}

module.exports.loginController = async (req, res, next) => {
    // let user = req.body;
    // try
    // {
    //     // Check existing
    //     const existingUser = await User.findOne({username: user.username});
    //     if(!existingUser) return res.status(404).json({ message : "User doesn't exists" });

    //     // Decrypt and compare password
    //     const isMatching = await bcrypt.compare(user.password, existingUser.password);
    //     if(!isMatching) return res.status(404).json({ message : "Password not matching" });

    //     // Send back user's data on successful login
    //     console.log(chalk.greenBright(`[+] ${existingUser.username} logged in successfully`))
    //     res.status(200).json(existingUser);
    // }
    // catch(err)
    // {
    //     console.log(chalk.redBright("[-] Error occured in login: \n" + err));
    //     res.status(400).json({ message: `Something went wrong. Please try again.` });
    // }
    passport.authenticate('local', (err, user, info) => {
        if(err) res.status(404).json({ message: err })
        else 
        {
            console.log('In controller, no errors, user is : '+user);
            // res.status(200).json(user); // won't work, we need to send cookies in response, here we end response without that
            req.logIn(user, (err) => {
                console.log('callback after logging in')
                if(err) 
                {
                    console.log('Error in logIn : '+err)
                    return next(err);
                }
                res.status(200).redirect(CLIENT_URL+'/');
                return next();
            })
        }
    })(req, res, next)
}

module.exports.checkLogged = (req,res) => {
    // console.log("req.user is " + req.user);
    if(req.user) return res.status(200).json({ user: req.user });
    else return res.status(404).json({ user: null });
}

module.exports.logoutController = (req,res) => {
    req.logout(); // passport logout

    // destroy session cookie
    req.session.destroy((err) => {
        if (!err) {
            res.status(200).clearCookie('connect.sid').redirect(CLIENT_URL+'/');
            console.log('Successfully logged out');
        } else {
            res.status(404).json({ error: err })
            console.log(err);
        }
    });
}

module.exports.bcrypt = bcrypt; // I am still not sure if salt will be retained if I create new instance, so using this instance itself