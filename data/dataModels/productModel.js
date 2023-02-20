const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const productModel = new Schema(
  {
    name: { type: String, required: true },
    price: Schema.Types.Decimal128,
    discount: { type: Number, default: 0 },
    stock: { type: Number, required: true },
    category: { type: String, required: true },
    description: { type: String, default: `` },
  },
  { timestamps: true }
);

module.exports = mongoose.model("products", productModel);
