const { pool } = require("../config/database");

class Contact {
  static async findAllByUser(userId) {
    const [rows] = await pool.query(
      "SELECT * FROM contacts WHERE user_id = ? ORDER BY name",
      [userId]
    );
    return rows;
  }

  static async findById(id) {
    const [rows] = await pool.query("SELECT * FROM contacts WHERE id = ?", [id]);
    return rows[0] || null;
  }

  static async create({ user_id, name, phone, email, address, notes }) {
    const [result] = await pool.query(
      `INSERT INTO contacts (user_id, name, phone, email, address, notes) 
       VALUES (?, ?, ?, ?, ?, ?)`,
      [user_id, name, phone || null, email || null, address || null, notes || null]
    );
    return this.findById(result.insertId);
  }

  static async update(id, { name, phone, email, address, notes }) {
    await pool.query(
      `UPDATE contacts SET name = ?, phone = ?, email = ?, address = ?, notes = ?
       WHERE id = ?`,
      [name, phone || null, email || null, address || null, notes || null, id]
    );
    return this.findById(id);
  }

  static async delete(id) {
    await pool.query("DELETE FROM contacts WHERE id = ?", [id]);
  }
}

module.exports = Contact;
