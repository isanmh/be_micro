const mysql = require("mysql");
require("dotenv").config();

const connection = mysql.createConnection({
    username: process.env.MYSQLUSER,
    password: process.env.MYSQLPASSWORD,
    database: process.env.MYSQLDATABASE,
    host: process.env.MYSQLHOST,
    port: process.env.MYSQLPORT,
});

// cek koneksi database
connection.connect((err) => {
  if (err) throw err;
  console.log("Database terkoneksi");
});

module.exports = connection;
