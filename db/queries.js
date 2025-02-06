const pool = require("./pool");

async function getMessages() {
  const { rows } = await pool.query("SELECT * FROM messages");
  return rows;
}

async function createMessage(user, text, added) {
  await pool.query(
    `INSERT INTO messages ("user", text, added) VALUES ($1, $2, $3)`,
    [user, text, added]
  );
}

async function messageDetails(id) {
  const { rows } = await pool.query("SELECT * FROM messages WHERE id = ($1)", [
    id,
  ]);
  return rows;
}

module.exports = { getMessages, createMessage, messageDetails };
