const router = require("express").Router();
const auth = require("./routes/auth");
const product = require("./routes/products");
const { upload } = require("../middleware/uploadAvatar");

router.get("/", (req, res) => {
  res.status(200).json({ message: "Bem vindo a API CatalogoAPI" });
});
router.use("/auth", auth);
router.use("/product", upload.array("teste"), product);
module.exports = router;
