const pool = require("./pool");

const User = {
  createUser: async (firstName, lastName, username, hashedPassword) => {
    const { rows } = await pool.query(
      `INSERT INTO users (first_name, last_name, username, password) VALUES ($1, $2, $3, $4)`,
      [firstName, lastName, username, hashedPassword]
    );
    return rows[0];
  },
};

module.exports = { User };
