const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const chalk = require('chalk')
const { User } = require('./../models/UserModel');
const { bcrypt } = require('./../controllers/authController');
// const { loginController } = require('./../controllers/authController');

passport.use(new LocalStrategy( async (username, password, done) => {
    try
    {
        // Check existing
        const existingUser = await User.findOne({username: username});
        if(!existingUser) return done("User doesn't exists", false);

        // Decrypt and compare password
        const isMatching = await bcrypt.compare(password, existingUser.password);
        if(!isMatching) return done("Password not matching", false);

        // Send back user's data on successful login
        console.log(chalk.greenBright(`[+] ${existingUser.username} logged in successfully`));
        console.log('passport strategy');
        return done(null, existingUser);
    }
    catch(err)
    {
        console.log(chalk.redBright("[-] Error occured in login: \n" + err));
        return done("Something went wrong. Please try again.", false);
    }
} ));

passport.serializeUser((user, done) => {
    console.log("Serializing user : "+user+" with id : "+user.id);
    // id is not a problem
    done(null, user.id);
});

passport.deserializeUser((userId, done) => {
    // console.log("Deserializing user id : "+userId);
    User.findById(userId)
        .then((user) => {
            done(null, user);
        })
        .catch(err => done(err))
});