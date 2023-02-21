const express = require("express");
const cors = require("cors");
const dotEnv = require("dotenv");

dotEnv.config();
const app = express();

app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//#region Routes

const testRoutes = require("./routes/testRoutes");
app.use("/testingPage", testRoutes);

const adminRoutes = require("./routes/adminRoutes");
app.use("/admin", adminRoutes);

const buyerRoutes = require("./routes/buyerRoutes");
app.use("/buyer", buyerRoutes);

const productRoutes = require("./routes/productRoutes");
app.use("/product", productRoutes);

const couponRoutes = require("./routes/couponRoutes");
app.use("/coupon", couponRoutes);

//#endregion

// set connection to MongoDB
const db = require("./data/database");
db.mongoose
  .connect(db.connectionString)
  .then(() => {
    console.log("Connected to MongoDB...");

    // set PORT to listen for requests
    const PORT = process.env.PORT || ++process.env.PORT || 8081;
    // The app will only start listening to request when the connection
    // to MongoDB is established
    app.listen(PORT, () => {
      console.log(`Server is running on port: ${PORT}`);
    });
  })
  .catch((err) => {
    console.log("Cannot connect to MongoDB...", err);
    process.exit();
  });
