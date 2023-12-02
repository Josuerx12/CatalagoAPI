const router = require("express").Router();
const ProductController = require("../../controllers/productController");
const AuthGuard = require("../../middleware/AuthGuard");
const AuthAdminGuard = require("../../middleware/AuthAdminGuard");
const { uploadProductPics } = require("../../middleware/uploadPhotos");

const product = new ProductController();

router.get("/", product.getProducts);
router.get("/:id", product.getProduct);
router.post(
  "/new",
  AuthGuard,
  AuthAdminGuard,
  uploadProductPics.array("product-pics"),
  product.createProduct
);
router.patch(
  "/:id",
  AuthGuard,
  AuthAdminGuard,
  uploadProductPics.array("product-pics"),
  product.editProduct
);
router.delete(
  "/:productId/:photoId",
  AuthGuard,
  AuthAdminGuard,
  product.deleteProductPhoto
);
router.delete("/:id", AuthGuard, AuthAdminGuard, product.deleteProduct);
module.exports = router;
