const express = require("express");
const cors = require("cors");
const dotEnv = require("dotenv");

dotEnv.config();
const app = express();

app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const testRoutes = require("./routes/testRoutes");
app.use("/testingPage", testRoutes);

// set PORT to listen for requests
const PORT = process.env.PORT || ++process.env.PORT || 8081;
app.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`);
});

// set connection to MongoDB
const db = require("./data/database");
db.mongoose
  .connect(db.connectionString)
  .then(() => {
    console.log("Connected to MongoDB...");
  })
  .catch((err) => {
    console.log("Cannot connect to MongoDB...", err);
    process.exit();
  });
