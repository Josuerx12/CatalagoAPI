const router = require("express").Router();
const auth = require("./routes/auth");

router.get("/", (req, res) => {
  res.status(200).json({ message: "Bem vindo a API CatalogoAPI" });
});
router.use("/auth", auth);
module.exports = router;
