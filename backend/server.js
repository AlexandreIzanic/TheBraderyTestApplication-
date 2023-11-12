// Load env var
if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}
const express = require("express");
const cors = require("cors");

const mysqlDB = require("./config/connectToMySQL");
const bodyParser = require("body-parser");

const productRoutes = require("./routes/productsRoute");
const stripeRoute = require("./routes/stripeRoute");
const stripeWebhookRoute = require("./routes/stripeWebhookRoute");

const app = express();

app.use(
  cors({
    origin: ["http://localhost:3001", "https://checkout.stripe.com"],
    credentials: true,
  })
);
app.use(express.static("public"));

app.use("/stripe", stripeWebhookRoute);
app.use(express.json());
app.use("/stripe", stripeRoute);
app.use(bodyParser.json());

// Connect To DB
mysqlDB.connectToMySQL();

app.use("/products", productRoutes);

const port = process.env.PORT;
app.listen(port, () => {
  console.log(`Serveur Node.js écoutant sur le port ${port}`);
});
