const { Router } = require("express");
const passport = require("passport");
const { CLIENT_URL } = require("../config/keys");
const { signupController, loginController, checkLogged, logoutController } = require("../controllers/authController");

const router = Router();

router.get('/checkLogged', checkLogged );
router.post('/login', loginController );
router.post('/logout', logoutController );
// router.post('/login', passport.authenticate('local', { successRedirect: `${CLIENT_URL}` }) );
router.post('/signup', signupController, loginController );

module.exports.authRoutes = router;