const { Router } = require("express");
const { getUserData } = require("../controllers/userController");

const router = Router();

router.post('/getUser', getUserData )

module.exports.userRoutes = router;