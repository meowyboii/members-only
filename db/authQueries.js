const pool = require("./pool");

const User = {
  createUser: async (
    firstName,
    lastName,
    username,
    hashedPassword,
    isAdmin
  ) => {
    const { rows } = await pool.query(
      `INSERT INTO users (first_name, last_name, username, password, admin) VALUES ($1, $2, $3, $4, $5) RETURNING *`,
      [firstName, lastName, username, hashedPassword, isAdmin]
    );
    return rows[0];
  },
  createMember: async (userId) => {
    const { rows } = await pool.query(
      `UPDATE users SET member = TRUE WHERE id = $1 RETURNING *`,
      [userId]
    );
    return rows[0];
  },
  findById: async (userId) => {
    const { rows } = await pool.query(`SELECT * FROM users WHERE id = $1`, [
      userId,
    ]);
    return rows[0];
  },
};

module.exports = { User };
