const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    username: { type: String, required: true },
    password: { type: String, required: true },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    profilePicLink: { type: String },
    email: { type: String, required: true },
    cpNumber: { type: String, required: true },
    address: { type: String, required: true },
    gender: { type: String, required: true },
    birthDate: { type: Date, required: true },
    status: { type: String, required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("users", userSchema);
