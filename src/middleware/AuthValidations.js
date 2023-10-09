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

const recoveryValidation = [
  body("email")
    .isEmail()
    .withMessage("A valid e-mail is required to recover an account."),
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

const editValidations = [
  body("name")
    .optional()
    .isString()
    .withMessage("Name must be a string!")
    .isLength({ min: 3, max: 30 })
    .withMessage(
      "Name must have more than 3 characters and less than 30 characters."
    ),
  body("email")
    .optional()
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
    .optional()
    .isStrongPassword()
    .withMessage(
      "Password must be strong with 1 special character, 1 number and 1 uppercase letter."
    ),
];

module.exports = {
  newUserValidations,
  editValidations,
  loginValidations,
  recoveryValidation,
};
