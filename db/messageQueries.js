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
      `SELECT messages.id, messages.title, messages.message, 
      TO_CHAR(messages.created_at, 'DD/MM/YYYY') AS date_created, TO_CHAR(messages.created_at, 'HH:MI AM') AS time_created, 
      users.first_name, users.last_name 
      FROM messages JOIN users ON messages.user_id = users.id
      ORDER BY messages.created_at DESC;`
    );
    return rows;
  },
  delete: async (messageId) => {
    const { rows } = await pool.query(
      `DELETE FROM messages WHERE id = $1 RETURNING *`,
      [messageId]
    );
    return rows;
  },
};

module.exports = { Message };
