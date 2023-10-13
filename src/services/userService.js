const User = require("../models/userModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { accountCreated, accountRecovery } = require("../utils/emailBody");
const transporter = require("../utils/emailTransporter");
const generator = require("generate-password");
const UserModel = require("../models/userModel");
const secret = process.env.SECRET;
const s3 = require("../utils/s3Auth");
const { DeleteObjectCommand } = require("@aws-sdk/client-s3");

class UserService {
  async createUser(data) {
    const { name, email, password } = data;
    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(password, salt);

    await User.create({ name, email, password: passwordHash });
    const user = await User.findOne({ email: email }).select("--password");

    const token = jwt.sign({ id: user._id }, secret, { expiresIn: "12h" });
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

    const user = await User.findOne({ email: email });

    const verifiedUser = await bcrypt.compare(password, user.password);

    if (!verifiedUser) {
      throw new Error("Invalid credentials.");
    }

    const token = jwt.sign(
      {
        id: user._id,
      },
      secret,
      { expiresIn: "12h" }
    );
    return token;
  }
  async recoveryUser(data) {
    const { email } = data;

    const user = await User.findOne({ email });

    if (!user) {
      throw new Error("User not exists.");
    }

    const newPass = generator.generate({
      length: 10,
      numbers: true,
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
  async editUser(user, data, photo) {
    const { email, password, name } = data;
    const userRefreshed = await User.findById(user._id);
    if (!data) {
      throw new Error("No data inserted.");
    }

    if (name) {
      userRefreshed.name = name;
    }

    if (email) {
      userRefreshed.email = email;
    }

    if (password) {
      const salt = await bcrypt.genSalt(10);
      const passwordHash = await bcrypt.hash(password, salt);
      userRefreshed.password = passwordHash;
    }

    if (photo) {
      const { key } = photo;

      if (userRefreshed.photo) {
        const deleteOptions = {
          Bucket: "userphotoscatalogo",
          Key: userRefreshed.photo,
        };

        const command = new DeleteObjectCommand(deleteOptions);
        await s3.send(command);
      }

      userRefreshed.photo = key;
    }

    await userRefreshed.save();
  }
  async deleteUser(user, id) {
    const userToDelete = await UserModel.findById(id);

    if (!userToDelete) throw new Error(`User ${id} not exists.`);

    await UserModel.findByIdAndDelete(id);
  }
}

module.exports = UserService;
