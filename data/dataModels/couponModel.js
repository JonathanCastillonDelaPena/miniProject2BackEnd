const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const couponModel = new Schema(
  {
    title: { type: String, required: true },
    discount: { type: Number, default: 0 },
    category: { type: String, required: true },
    expiration: { type: Date, default: Date.now() },
  },
  { timestamps: true }
);

module.exports = mongoose.model("coupons", couponModel);
