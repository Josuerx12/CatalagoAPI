const User = require("../models/userModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { accountCreated, accountRecovery } = require("../utils/emailBody");
const transporter = require("../utils/emailTransporter");
const generator = require("generate-password");
const secret = process.env.SECRET;

class UserService {
  async recoveryUser(data) {
    const { email } = data;

    const user = await User.findOne({ email });

    if (!user) {
      throw new Error("User not exists.");
    }

    const newPass = generator.generate({
      length: 8,
      numbers: true,
      symbols: true,
    });

    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(newPass, salt);

    user.password = passwordHash;

    await user.save();

    transporter.sendMail({
      from: process.env.SMTP_USER,
      to: email,
      subject: "Catalogo API - Recuperacão de Conta",
      html: accountRecovery({ name: user.name, email, senha: newPass }),
    });
  }
  async createUser(data) {
    const { name, email, password } = data;
    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(password, salt);

    await User.create({ name, email, password: passwordHash });
    const user = await User.findOne({ email: email }).select("--password");

    const token = jwt.sign({ user }, secret, { expiresIn: "12h" });
    transporter.sendMail({
      from: process.env.SMTP_USER,
      to: email,
      subject: "Catalogo API Contas",
      html: accountCreated({ name, email, senha: password }),
    });
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
