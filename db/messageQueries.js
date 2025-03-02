const pool = require("./pool");

const Message = {
  add: async (title, message) => {
    const { rows } = await pool.query(
      `INSERT INTO messages (title, message) VALUES ($1, $2) RETURNING *`,
      [title, message]
    );
    return rows[0];
  },
};

module.exports = { Message };
