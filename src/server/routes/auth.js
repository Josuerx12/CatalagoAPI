const router = require("express").Router();
const {
  newUserValidations,
  loginValidations,
  recoveryValidation,
} = require("../../middleware/AuthValidations");
const validation = require("../../middleware/Validations");
const AuthController = require("../../controllers/authController");

const auth = new AuthController();

router.post("/register", newUserValidations, validation, auth.newUser);
router.post("/login", loginValidations, validation, auth.login);
router.post("/recovery", recoveryValidation, validation, auth.recoveryAccount);

module.exports = router;
