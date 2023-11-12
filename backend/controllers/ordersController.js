const mysqlDB = require("../config/connectToMySQL");

const fetchOrderData = async (req, res) => {
  try {
    // Assuming you pass the product ID in the request parameters
    const email = req.params.email;

    const sqlQuery = "SELECT * FROM orders WHERE email = ?";
    mysqlDB.connection.query(sqlQuery, [email], (err, rows) => {
      if (err) {
        res.status(500).send("Erreur lors de la requête MySQL.");
      } else {
        // Check if the product with the specified ID exists
        if (rows) {
          res.json({ orders: rows }); // Send the product data in response
        } else {
          res.status(404).json({ error: "Product not found" });
        }
      }
    });
  } catch (error) {
    console.error("Error fetching orders:", error);
    res.status(500).json({ error: "Error fetching order" });
  }
};

module.exports = {
  fetchOrderData,
};
