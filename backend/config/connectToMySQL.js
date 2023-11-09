const mysql = require("mysql");

const connection = mysql.createConnection({
  host: process.env.MYSQL_HOST,
  port: process.env.MYSQL_PORT,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE,
});

async function connectToMySQL() {
  try {
    await connection.connect();
    console.log("Connexion à MySQL réussie.");
  } catch (error) {
    console.error("Erreur de connexion à MySQL : " + error.message);
  }
}

module.exports = {
  connectToMySQL,
  connection, // Exportez également la connexion MySQL pour l'utiliser ailleurs
};
