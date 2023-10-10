const router = require("express").Router();
const ProductController = require("../../controllers/productController");
const AuthAdminGuard = require("../../middleware/AuthAdminGuard");

const product = new ProductController();

router.post("/new", AuthAdminGuard, product.createProduct);

module.exports = router;
