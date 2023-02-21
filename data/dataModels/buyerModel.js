const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const buyerSchema = new Schema(
  {
    username: { type: String, required: true },
    password: { type: String, required: true },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    profilePicLink: { type: String, default: "" },
    email: { type: String, required: true },
    mobileNumber: { type: String, required: true },
    address: { type: String, required: true },
    gender: { type: String, required: true },
    birthDate: { type: Date, default: Date.now() },
    status: { type: String, required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("buyers", buyerSchema);
