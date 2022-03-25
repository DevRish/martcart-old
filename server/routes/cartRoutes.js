const { Router } = require("express");
const { getCartData, addToCart, removeFromCart, emptyCart } = require("../controllers/cartController");

const router = Router();

router.post('/getCart', getCartData )
router.post('/addItem', addToCart )
router.post('/removeItem', removeFromCart )
router.post('/emptyCart', emptyCart )

module.exports.cartRoutes = router;