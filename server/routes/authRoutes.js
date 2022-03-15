const { Router } = require("express");
const { signupController, loginController } = require("../controllers/authController");

const router = Router();

router.post('/signup', signupController );
router.post('/login', loginController );

module.exports.authRoutes = router;