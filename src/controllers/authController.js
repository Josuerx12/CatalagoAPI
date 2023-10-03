const UserService = require("../services/userService");

class AuthController {
  constructor() {
    this.user = new UserService();
    this.newUser = this.newUser.bind(this);
    this.login = this.login.bind(this);
  }
  async newUser(req, res) {
    try {
      const token = await this.user.createUser(req.body);
      return res.status(201).json({
        payload: {
          status: "Success",
          message: "User created with success!",
          token,
        },
      });
    } catch (error) {
      console.log(error);
      return res.status(401).json({
        payload: { status: "Failed", error: "Failed to create a new user." },
      });
    }
  }
  async login(req, res) {
    try {
      const token = await this.user.login(req.body);
      return res.status(200).json({
        payload: {
          status: "Sucess",
          message: "User logged with success",
          token,
        },
      });
    } catch (error) {
      console.log(error);
      return res.status(401).json({
        payload: {
          status: "Failed",
          error: error.message,
        },
      });
    }
  }
}

module.exports = AuthController;
