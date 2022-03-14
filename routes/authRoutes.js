const { Router } = require("express");
const { signinController, loginController } = require("../controllers/authController");

const router = Router();

router.post('/adduser', signinController );
router.post('/validate', loginController );

module.exports.authRoutes = router;