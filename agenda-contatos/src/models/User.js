const { pool } = require("../config/database");
const bcrypt = require("bcryptjs");

class User {
  static async findByEmail(email) {
    const [rows] = await pool.query("SELECT * FROM users WHERE email = ?", [email]);
    return rows[0] || null;
  }

  static async findById(id) {
    const [rows] = await pool.query(
      "SELECT id, name, email, role, created_at, updated_at FROM users WHERE id = ?",
      [id]
    );
    return rows[0] || null;
  }

  static async findAll() {
    const [rows] = await pool.query(
      "SELECT id, name, email, role, created_at, updated_at FROM users"
    );
    return rows;
  }

  static async create({ name, email, password, role = "user" }) {
    const hashedPassword = await bcrypt.hash(password, 10);
    const [result] = await pool.query(
      "INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, ?)",
      [name, email, hashedPassword, role]
    );
    return { id: result.insertId, name, email, role };
  }

  static async comparePassword(plainPassword, hashedPassword) {
    return bcrypt.compare(plainPassword, hashedPassword);
  }
}

module.exports = User;
