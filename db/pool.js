const { Pool } = require("pg");
require("dotenv").config();

const HOST = process.env.PGHOST;
const USER = process.env.PGUSER;
const DATABASE = process.env.PGDATABASE;
const PASSWORD = process.env.PGPASSWORD;
const DB_PORT = process.env.PGPORT;

module.exports = new Pool({
  host: HOST,
  user: USER,
  database: DATABASE,
  password: PASSWORD,
  port: DB_PORT,
});
