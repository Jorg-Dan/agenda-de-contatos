const UserService = require("../services/userService");

const userController = {
  
  async index(req, res) {
    try {
      const users = await UserService.listAll();
      return res.json(users);
    } catch (err) {
      const status = err.status || 500;
      return res.status(status).json({ error: err.message || "Erro interno do servidor." });
    }
  },

  
  async profile(req, res) {
    try {
      const user = await UserService.getProfile(req.user.id);
      return res.json(user);
    } catch (err) {
      const status = err.status || 500;
      return res.status(status).json({ error: err.message || "Erro interno do servidor." });
    }
  },
};

module.exports = userController;
