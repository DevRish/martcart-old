const { Router } = require("express");
const { getUserData } = require("../controllers/userController");

const router = Router();

router.post('/getUserData', getUserData )

module.exports.userRoutes = router;