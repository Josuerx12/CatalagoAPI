const { validationResult } = require("express-validator");

const validation = (req, res, next) => {
  const error = validationResult(req);

  if (!error.isEmpty()) {
    return res.status(401).json({
      payload: {
        status: "Failed",
        message: "Validatations error.",
        errors: error.mapped(),
      },
    });
  }
  next();
};

module.exports = validation;
