const UserService = require("../services/userService");
const { updateAvatar } = require("../middleware/uploadAvatar");

class AuthController {
  constructor() {
    this.user = new UserService();
    this.newUser = this.newUser.bind(this);
    this.login = this.login.bind(this);
    this.recoveryAccount = this.recoveryAccount.bind(this);
    this.deleteUser = this.deleteUser.bind(this);
    this.editTheUser = this.editTheUser.bind(this);
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
  async recoveryAccount(req, res) {
    try {
      await this.user.recoveryUser(req.body);
      return res.status(200).json({
        payload: {
          status: "Success",
          message: "E-mail with the new password has been sent with success!",
        },
      });
    } catch (error) {
      console.log(error);
      return res.status(501).json({
        payload: {
          status: "Failed",
          error: error.message.includes("User not exists.")
            ? error.message
            : "Fail to recovery your account, try again latter.",
        },
      });
    }
  }
  async getUser(req, res) {
    try {
      const user = req.user;
      return res.status(200).json({
        payload: {
          status: "Success",
          message: "User getted with success.",
          user,
        },
      });
    } catch (error) {
      console.log(error);
      return res.status(501).json({
        payload: {
          status: "Failed",
          error: "Fail to get the refreshed user.",
        },
      });
    }
  }
  async editTheUser(req, res) {
    try {
      await this.user.editUser(req.user, req.body);
      return res.status(200).json({
        payload: {
          status: "Success",
          message: "User edited with success.",
        },
      });
    } catch (error) {
      console.log(error);
      return res.status(501).json({
        payload: {
          status: "Failed",
          error: error.message.includes("No data inserted.")
            ? error.message
            : "Fail to edit your account, try again latter.",
        },
      });
    }
  }
  async deleteUser(req, res) {
    const { id } = req.params;
    try {
      await this.user.deleteUser(req.user, id);
      return res.status(200).json({
        payload: {
          status: "Success",
          message: `User ${id} deleted with success.`,
        },
      });
    } catch (error) {
      console.log(error);
      return res.status(501).json({
        payload: {
          status: "Failed",
          error: error.message,
        },
      });
    }
  }
  async updateUserAvatar(req, res) {
    try {
      await updateAvatar(req.file, req.user);
      return res.status(200).json({
        payload: {
          status: "Success",
          message: "Photo uploaded with success.",
        },
      });
    } catch (error) {
      console.log(error);
      return res.status(501).json({
        payload: {
          status: "Failed",
          error: error.message,
        },
      });
    }
  }
}

module.exports = AuthController;
