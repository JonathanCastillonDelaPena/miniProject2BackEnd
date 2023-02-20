const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const testSchema = new Schema(
  {
    name: String,
    number: Number,
    isValid: Boolean,
  },
  { timestamps: true }
);

module.exports = mongoose.model("sample", testSchema);
