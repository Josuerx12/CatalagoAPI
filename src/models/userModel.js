const { Schema, model } = require("mongoose");
const userSchema = new Schema({
  name: String,
  email: String,
  password: { type: String },
  photo: { type: String, default: null },
  admin: { type: Boolean, default: false },
});

const UserModel = model("User", userSchema);

module.exports = UserModel;
