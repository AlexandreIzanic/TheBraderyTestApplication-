const mysqlDB = require("../config/connectToMySQL");

const fetchProducts = async (req, res) => {
  try {
    const sqlQuery = "SELECT * FROM products";
    mysqlDB.connection.query(sqlQuery, (err, rows) => {
      if (err) {
        res.status(500).send("Erreur lors de la requête MySQL.");
      } else {
        res.json({ products: rows }); // Envoyer les données en réponse
      }
    });
  } catch (error) {
    console.error("Error fetching prospects:", error);
    res.status(500).json({ error: "Error fetching prospects" });
  }
};
module.exports = {
  fetchProducts,
};

/* const sqlQuery = "SELECT * FROM products";
mysqlDB.connection.query(sqlQuery, (err, products) => {
  if (err) {
    console.log(err);
  } else {
    const rows = JSON.parse(JSON.stringify(products));
    console.log(rows);
  }
});
 */
