const User = require("../models/User");

class UserService {
  static async listAll() {
    return User.findAll();
  }

  static async getProfile(userId) {
    const user = await User.findById(userId);

    if (!user) {
      const error = new Error("Usuário não encontrado.");
      error.status = 404;
      throw error;
    }

    return user;
  }
}

module.exports = UserService;
