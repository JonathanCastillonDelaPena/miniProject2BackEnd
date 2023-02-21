const mongoose = require("mongoose");
mongoose.Promise = global.Promise;

const db = {};
db.mongoose = mongoose;
db.connectionString = process.env.DB_CONNECTION_STRING;
db.admins = require("./dataModels/adminModel");
db.buyers = require("./dataModels/buyerModel");
db.products = require("./dataModels/productModel");
db.coupons = require("./dataModels/couponModel");

// schema for testing
db.tests = require("./dataModels/testModel");

module.exports = db;
