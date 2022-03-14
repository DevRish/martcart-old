const { Router } = require("express");
const { getOrderData, addOrder } = require("../controllers/orderController");

const router = Router();

router.post('/getorderdata', getOrderData )
router.post('/addOrder', addOrder )

module.exports.orderRoutes = router;