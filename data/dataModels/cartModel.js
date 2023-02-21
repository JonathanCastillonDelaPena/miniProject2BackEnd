const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const cartModel = new Schema(
  {
    buyer: Schema.Types.Mixed,
    appliedCoupon: Schema.Types.Mixed,
    products: [Schema.Types.Mixed],
    rawTotal: Schema.Types.Decimal128,
    finalTotal: Schema.Types.Decimal128,
    status: { type: String, default: "Pending" },
  },
  { timestamps: true }
);

module.exports = mongoose.model("carts", cartModel);
