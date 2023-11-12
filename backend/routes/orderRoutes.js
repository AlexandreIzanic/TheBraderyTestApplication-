const express = require("express");
const router = new express.Router();

const ordersControllerMySQL = require("../controllers/ordersController");

// MY SQL
router.get("/:email", ordersControllerMySQL.fetchOrderData);

module.exports = router;
