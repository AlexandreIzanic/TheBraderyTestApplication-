const mysqlDB = require("../config/connectToMySQL");

const fetchProducts = async (req, res) => {
  try {
    const sqlQuery = "SELECT * FROM products";
    mysqlDB.connection.query(sqlQuery, (err, rows) => {
      if (err) {
        res.status(500).send("Erreur lors de la requête MySQL.");
      } else {
        res.json({ products: rows });
      }
    });
  } catch (error) {
    console.error("Error fetching prospects:", error);
    res.status(500).json({ error: "Error fetching prospects" });
  }
};

const fetchProductData = async (req, res) => {
  try {
    const productId = req.params.id;

    const sqlQuery = "SELECT * FROM products WHERE id = ?";
    mysqlDB.connection.query(sqlQuery, [productId], (err, rows) => {
      if (err) {
        res.status(500).send("Erreur lors de la requête MySQL.");
      } else {
        // Check if the product with the specified ID exists
        if (rows.length === 1) {
          res.json({ product: rows[0] });
        } else {
          res.status(404).json({ error: "Product not found" });
        }
      }
    });
  } catch (error) {
    console.error("Error fetching product:", error);
    res.status(500).json({ error: "Error fetching product" });
  }
};

module.exports = {
  fetchProducts,
  fetchProductData,
};
