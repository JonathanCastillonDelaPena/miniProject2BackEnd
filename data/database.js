const mongoose = require("mongoose");
mongoose.Promise = global.Promise;

const db = {};
db.mongoose = mongoose;
db.connectionString = process.env.DB_CONNECTION_STRING;
db.users = require("./dataModels/UserModel");
db.products = require("./dataModels/productModel");

// schema for testing
db.tests = require("./dataModels/testModel");

module.exports = db;
