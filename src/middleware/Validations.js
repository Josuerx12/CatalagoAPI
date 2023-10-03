const { validationResult } = require("express-validator");

const validation = (req, res, next) => {
  const error = validationResult(req);

  if (!error.isEmpty()) {
    return res.status(401).json({
      payload: {
        status: "Failed",
        message: "Validatations error.",
        errors: error.array().map((err) => ({ [err.path]: err.msg })),
      },
    });
  }
  next();
};

module.exports = validation;
