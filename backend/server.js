// Load env var
if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

const express = require("express");
const app = express();
const port = process.env.PORT;
const cors = require("cors");

const mysqlDB = require("./config/connectToMySQL");

app.use(cors());

mysqlDB.connectToMySQL();

const sqlQuery = "SELECT * FROM products";
mysqlDB.connection.query(sqlQuery, (err, products) => {
  if (err) {
    console.log(err);
  } else {
    const rows = JSON.parse(JSON.stringify(products));
    console.log(rows);
  }
});

app.get("/", (req, res) => {
  res.send("Hello, World!");
});

app.get("/api", (req, res) => {
  res.json({ users: ["userOne", "userTwo", "userThree"] });
});

app.listen(port, () => {
  console.log(`Serveur Node.js écoutant sur le port ${port}`);
});
