const { Router } = require("express");
const { getProductData } = require('./../controllers/productController');

const router = Router();

router.get('/', getProductData )

module.exports.productRoutes = router;