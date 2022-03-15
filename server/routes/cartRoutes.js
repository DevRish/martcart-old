const { Router } = require("express");
const { getCartData, addToCart, removeFromCart } = require("../controllers/cartController");

const router = Router();

router.post('/getCart', getCartData )
router.post('/addItem', addToCart )
router.post('/removeItem', removeFromCart )

module.exports.cartRoutes = router;