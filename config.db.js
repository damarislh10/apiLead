const dotenv = require("dotenv");
dotenv.config();
let connection;

try {
  connection = {
    host: process.env.DBHOST,
    port: process.env.DBPORT,
    user: process.env.DBUSER,
    password: process.env.DBPASS,
    database: process.env.DBNAME,
  };
} catch (error) {
  console.log("Error al conectar con las base de datos");
}

module.exports = { connection };
