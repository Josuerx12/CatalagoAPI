const router = require("express").Router();
const {
  newUserValidations,
  loginValidations,
  recoveryValidation,
  editValidations,
} = require("../../middleware/AuthValidations");
const validation = require("../../middleware/Validations");
const AuthGuard = require("../../middleware/AuthGuard");
const AuthAdminGuard = require("../../middleware/AuthAdminGuard");
const AuthController = require("../../controllers/authController");
const { uploadAvatar } = require("../../middleware/uploadPhotos");

const auth = new AuthController();

router.post("/register", newUserValidations, validation, auth.newUser);
router.post("/login", loginValidations, validation, auth.login);
router.post("/recovery", recoveryValidation, validation, auth.recoveryAccount);
router.get("/user", AuthGuard, auth.getUser);
router.get("/users", AuthGuard, AuthAdminGuard, auth.getUsers);
router.patch(
  "/editUser",
  editValidations,
  validation,
  AuthGuard,
  uploadAvatar.single("user-avatar"),
  auth.editTheUser
);
router.delete("/user/:id", AuthGuard, AuthAdminGuard, auth.deleteUser);
router.post(
  "/user/new",
  newUserValidations,
  validation,
  AuthGuard,
  AuthAdminGuard,
  auth.adminCreateUser
);
router.patch(
  "/editUser/:id",
  editValidations,
  validation,
  AuthGuard,
  AuthAdminGuard,
  uploadAvatar.single("user-avatar"),
  auth.adminEditUser
);

module.exports = router;
