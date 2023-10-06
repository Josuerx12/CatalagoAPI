const router = require("express").Router();
const {
  newUserValidations,
  loginValidations,
  recoveryValidation,
  editValidations,
} = require("../../middleware/AuthValidations");
const validation = require("../../middleware/Validations");
const AuthGuard = require("../../middleware/AuthGuard");
const AuthController = require("../../controllers/authController");

const auth = new AuthController();

router.post("/register", newUserValidations, validation, auth.newUser);
router.post("/login", loginValidations, validation, auth.login);
router.post("/recovery", recoveryValidation, validation, auth.recoveryAccount);
router.get("/user", AuthGuard, auth.getUser);
router.post(
  "/editUser",

  editValidations,
  validation,
  AuthGuard,
  auth.editTheUser
);

module.exports = router;
