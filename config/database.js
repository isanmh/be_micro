require("dotenv").config();
module.exports = {
  development: {
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
    dialect: process.env.DB_DIALECT,
    // untuk postgresql
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000,
    },
  },
  test: {
    username: "root",
    password: null,
    database: "database_test",
    host: "127.0.0.1",
    dialect: "mysql",
  },
  production: {
    username: "root",
    password: null,
    database: "database_production",
    host: "127.0.0.1",
    dialect: "mysql",
  },
};

// postgresql
// module.exports = {
//   HOST: "localhost" || process.env.DB_HOST,
//   USER: "postgres" || process.env.DB_USERNAME,
//   PASSWORD: process.env.DB_PASSWORD,
//   DB: process.env.DB_NAME,
//   dialect: "postgres" || process.env.DB_DIALECT,
//   pool: {
//     max: 5,
//     min: 0,
//     acquire: 30000,
//     idle: 10000,
//   },
// };
