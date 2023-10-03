const { Schema, Model } = require("mongoose");

const producSchema = new Schema({
  name: String,
  category: String,
  stock: { type: Number, default: null },
  unit: { type: String, enum: ["UN", "KG", "TON", "M"], default: "UN" },
  photos: { type: [{ photo: string }], default: null },
  value: Number,
  description: String,
});

const productModel = Model("Product", producSchema);

module.exports = productModel;
