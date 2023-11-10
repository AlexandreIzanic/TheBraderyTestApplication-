const express = require("express");
const router = new express.Router();

const prospectsControllerMySQL = require("../controllers/productsController");

// MY SQL
router.get("/", prospectsControllerMySQL.fetchProducts);
router.get("/:id", prospectsControllerMySQL.fetchProductData);

module.exports = router;
