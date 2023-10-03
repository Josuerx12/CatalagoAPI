const User = require("../models/userModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const secret = process.env.SECRET;
class UserService {
  async createUser(data) {
    const { name, email, password } = data;
    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(password, salt);

    await User.create({ name, email, password: passwordHash });
    const user = await User.findOne({ email: email }).select("--password");

    const token = jwt.sign({ user }, secret, { expiresIn: "12h" });
    console.log(token);
    return token;
  }
  async login(data) {
    const { email, password } = data;

    const user = await User.findOne({ email: email }).select("--password");

    const verifiedUser = await bcrypt.compare(password, user.password);

    if (!verifiedUser) {
      throw new Error("Invalid credentials.");
    }

    const token = jwt.sign({ user }, secret);

    return token;
  }
}

module.exports = UserService;
