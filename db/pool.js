const { Pool } = require("pg");
require("dotenv").config();

const HOST = process.env.HOST;
const USER = process.env.USER;
const DATABASE = process.env.DATABASE;
const PASSWORD = process.env.PASSWORD;
const DB_PORT = process.env.DB_PORT;

module.exports = new Pool({
  host: HOST,
  user: USER,
  database: DATABASE,
  password: PASSWORD,
  port: DB_PORT,
});
