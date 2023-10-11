const router = require("express").Router();
const ProductController = require("../../controllers/productController");
const AuthAdminGuard = require("../../middleware/AuthAdminGuard");
const { uploadProductPics } = require("../../middleware/uploadPhotos");

const product = new ProductController();

router.get("/", product.getProducts);
router.get("/:id", product.getProduct);
router.post(
  "/new",
  AuthAdminGuard,
  uploadProductPics.array("product-pics"),
  product.createProduct
);
router.patch(
  "/:id/addPhoto",
  AuthAdminGuard,
  uploadProductPics.array("product-pics"),
  product.addPhotoToProduct
);
router.patch(
  "/:id",
  AuthAdminGuard,
  uploadProductPics.array("product-pics"),
  product.editProduct
);
router.delete(
  "/:productId/:photoId",
  AuthAdminGuard,
  product.deleteProductPhoto
);
router.delete("/:id", AuthAdminGuard, product.deleteProduct);
module.exports = router;
