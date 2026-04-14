const ContactService = require("../services/contactService");

const contactController = {
  
  async index(req, res) {
    try {
      const contacts = await ContactService.listByUser(req.user.id);
      return res.json(contacts);
    } catch (err) {
      const status = err.status || 500;
      return res.status(status).json({ error: err.message || "Erro interno do servidor." });
    }
  },

  
  async show(req, res) {
    try {
      const contact = await ContactService.getById(req.params.id, req.user);
      return res.json(contact);
    } catch (err) {
      const status = err.status || 500;
      return res.status(status).json({ error: err.message || "Erro interno do servidor." });
    }
  },

  
  async store(req, res) {
    try {
      const { name, phone, email, address, notes } = req.body;
      const contact = await ContactService.create(req.user.id, {
        name,
        phone,
        email,
        address,
        notes,
      });

      return res.status(201).json({
        message: "Contato criado com sucesso.",
        contact,
      });
    } catch (err) {
      const status = err.status || 500;
      return res.status(status).json({ error: err.message || "Erro interno do servidor." });
    }
  },

  
  async update(req, res) {
    try {
      const { name, phone, email, address, notes } = req.body;
      const contact = await ContactService.update(req.params.id, req.user, {
        name,
        phone,
        email,
        address,
        notes,
      });

      return res.json({
        message: "Contato atualizado com sucesso.",
        contact,
      });
    } catch (err) {
      const status = err.status || 500;
      return res.status(status).json({ error: err.message || "Erro interno do servidor." });
    }
  },

  
  async destroy(req, res) {
    try {
      await ContactService.delete(req.params.id, req.user);
      return res.json({ message: "Contato excluído com sucesso." });
    } catch (err) {
      const status = err.status || 500;
      return res.status(status).json({ error: err.message || "Erro interno do servidor." });
    }
  },
};

module.exports = contactController;
