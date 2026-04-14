const jwt = require("jsonwebtoken");
const User = require("../models/User");

class AuthService {
  static async register({ name, email, password, role }) {
    const existingUser = await User.findByEmail(email);
    if (existingUser) {
      const error = new Error("Email já cadastrado.");
      error.status = 409;
      throw error;
    }

    const user = await User.create({ name, email, password, role });

    const token = this.generateToken(user);

    return { user, token };
  }

  static async login({ email, password }) {
    const user = await User.findByEmail(email);
    if (!user) {
      const error = new Error("Credenciais inválidas.");
      error.status = 401;
      throw error;
    }

    const isValid = await User.comparePassword(password, user.password);
    if (!isValid) {
      const error = new Error("Credenciais inválidas.");
      error.status = 401;
      throw error;
    }

    const token = this.generateToken(user);

    const { password: _, ...userWithoutPassword } = user;

    return { user: userWithoutPassword, token };
  }

  static generateToken(user) {
    return jwt.sign(
      { id: user.id, email: user.email, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES_IN }
    );
  }
}

module.exports = AuthService;
