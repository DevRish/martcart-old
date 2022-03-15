const bcrypt = require('bcryptjs');
const validator = require('validatorjs');
const chalk = require("chalk");
const { User } = require('./../models/UserModel');
const { userRules, userErrors } = require('./../validations/userValidation');

module.exports.signupController = async (req, res) => {
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
        res.status(200).json(savedUser);

    } catch (err) 
    {
        console.log(chalk.redBright("[-] Error occured in registration: \n" + err));
        res.status(400).json({ message: `Something went wrong. Please try again.` });
    }
}

module.exports.loginController = async (req, res) => {
    let user = req.body;
    try
    {
        // Check existing
        const existingUser = await User.findOne({username: user.username});
        if(!existingUser) return res.status(404).json({ message : "User doesn't exists" });

        // Decrypt and compare password
        const isMatching = await bcrypt.compare(user.password, existingUser.password);
        if(!isMatching) return res.status(404).json({ message : "Password not matching" });

        // Send back user's data on successful login
        console.log(chalk.greenBright(`[+] ${existingUser.username} logged in successfully`))
        res.status(200).json(existingUser);
    }
    catch(err)
    {
        console.log(chalk.redBright("[-] Error occured in login: \n" + err));
        res.status(400).json({ message: `Something went wrong. Please try again.` });
    }
}