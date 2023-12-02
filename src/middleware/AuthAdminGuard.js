function AuthAdminGuard(req, res, next) {
  const user = req.user;
  console.log(user);
  if (!user.admin) {
    return res.status(401).json("You are not allowed to access this route.");
  }
  next();
}
module.exports = AuthAdminGuard;
