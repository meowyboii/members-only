const pool = require("./pool");

const Message = {
  add: async (title, message, userId) => {
    const { rows } = await pool.query(
      `INSERT INTO messages (title, message, user_id) VALUES ($1, $2, $3) RETURNING *`,
      [title, message, userId]
    );
    return rows[0];
  },
  getAll: async () => {
    const { rows } = await pool.query(
      `SELECT messages.id, messages.title, messages.message, users.first_name, users.last_name 
        FROM messages JOIN users ON messages.user_id = users.id;`
    );
    console.log(rows);
    return rows;
  },
};

module.exports = { Message };
