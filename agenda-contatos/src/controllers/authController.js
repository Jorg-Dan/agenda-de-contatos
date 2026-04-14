const AuthService = require("../services/authService");

const authController = {
  
  async register(req, res) {
    try {
      const { name, email, password, role } = req.body;
      const result = await AuthService.register({ name, email, password, role });

      return res.status(201).json({
        message: "Usuário criado com sucesso.",
        user: result.user,
        token: result.token,
      });
    } catch (err) {
      const status = err.status || 500;
      return res.status(status).json({ error: err.message || "Erro interno do servidor." });
    }
  },

  
  async login(req, res) {
    try {
      const { email, password } = req.body;
      const result = await AuthService.login({ email, password });

      return res.json({
        message: "Login realizado com sucesso.",
        user: result.user,
        token: result.token,
      });
    } catch (err) {
      const status = err.status || 500;
      return res.status(status).json({ error: err.message || "Erro interno do servidor." });
    }
  },
};

module.exports = authController;
