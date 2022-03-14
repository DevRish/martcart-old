const { Router } = require("express");
const { getCartData, addToCart, removeFromCart } = require("../controllers/cartController");

const router = Router();

router.post('/getcartdata', getCartData )
router.post('/addToCart', addToCart )
router.post('/removeFromCart', removeFromCart )

module.exports.cartRoutes = router;