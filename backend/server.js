// Load env var
if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

const express = require("express");
const app = express();
const port = process.env.PORT;
const cors = require("cors");

const mysqlDB = require("./config/connectToMySQL");

const productRoutes = require("./routes/productsRoute");

app.use(cors());

mysqlDB.connectToMySQL();

app.use("/products", productRoutes);

app.get("/", (req, res) => {
  res.send("Hello, World!");
});

app.get("/api", (req, res) => {
  res.json({ users: ["userOne", "userTwo", "userThree"] });
});

app.listen(port, () => {
  console.log(`Serveur Node.js écoutant sur le port ${port}`);
});
