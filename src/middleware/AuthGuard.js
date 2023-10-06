const jwt = require("jsonwebtoken");
const secret = process.env.SECRET;

function AuthGuard(req, res, next) {
  const header = req.headers["authorization"]; // Usar colchetes, não parênteses
  if (!header) {
    return res.status(401).json({
      payload: {
        status: "Failed",
        message: "Authorization header missing.",
      },
    });
  }

  const token = header.split(" ")[1];
  if (!token) {
    return res.status(401).json({
      payload: {
        status: "Failed",
        message: "Token not provided in Authorization header.",
      },
    });
  }

  try {
    const verifiedToken = jwt.verify(token, secret);
    if (!verifiedToken) {
      return res.status(401).json({
        payload: {
          status: "Failed",
          message: "Invalid token, try to renew your session.",
        },
      });
    }
    req.user = verifiedToken;
    next();
  } catch (error) {
    return res.status(401).json({
      payload: {
        status: "Failed",
        message: "Invalid token, try to renew your session.",
      },
    });
  }
}

module.exports = AuthGuard;
