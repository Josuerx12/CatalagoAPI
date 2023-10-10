const jwt = require("jsonwebtoken");
const secret = process.env.SECRET;
const UserModel = require("../models/userModel");

function AuthGuard(req, res, next) {
  const header = req.headers["authorization"]; // Usar colchetes, não parênteses
  const token = header.split(" ")[1];

  if (token) {
    jwt.verify(token, secret, async (err, decodedToken) => {
      if (err) {
        console.log(err);
        return res.status(401).json({ message: "Invalid Token" });
      } else {
        const user = await UserModel.findById(decodedToken.id).select(
          "-password"
        );
        req.user = user; // Adicione o usuário à solicitação
        next(); // Continue com a solicitação
      }
    });
  } else {
    res.status(401).json({
      message: "Você precisa estar autenticado para acessar esta rota",
    });
  }
}
module.exports = AuthGuard;
