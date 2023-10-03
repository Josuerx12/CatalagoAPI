const { body } = require("express-validator");
const User = require("../models/userModel");

const newUserValidations = [
  body("name")
    .isString()
    .withMessage("Name must be a string!")
    .isLength({ min: 3, max: 30 }),
  body("email")
    .isEmail()
    .withMessage("E-mail invalid!")
    .custom(async (value) => {
      const user = await User.findOne({ email: value });
      if (user) {
        throw new Error("E-mail already in use!");
      }
      return true;
    }),
  body("password")
    .isStrongPassword()
    .withMessage(
      "Password must be strong with 1 special character, 1 number and 1 uppercase letter."
    ),
  body("confirmPassword").custom((value, { req }) => {
    if (value !== req.body.password) {
      throw new Error("Password must be equals.");
    }
    return true;
  }),
];

const loginValidations = [
  body("email")
    .isEmail()
    .withMessage("Invalid e-mail address.")
    .custom(async (value) => {
      const user = await User.findOne({ email: value });
      if (!user) {
        throw new Error(
          "E-mail not exists, create a new account and try again."
        );
      }
      return true;
    }),
  body("password").isString().withMessage("Password was required."),
];

module.exports = { newUserValidations, loginValidations };
