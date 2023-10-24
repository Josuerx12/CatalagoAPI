const { Schema, model } = require("mongoose");

const producSchema = new Schema({
  name: String,
  category: String,
  stock: { type: Number, default: null },
  unit: { type: String, enum: ["UN", "KG", "TON", "M"], default: "UN" },
  photos: { type: [{ photo: { type: String } }], default: null },
  value: Number,
  description: String,
}, {timestamps: true});

const productModel = model("Product", producSchema);

module.exports = productModel;
