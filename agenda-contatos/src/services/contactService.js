const Contact = require("../models/Contact");

class ContactService {
  static async listByUser(userId) {
    return Contact.findAllByUser(userId);
  }

  static async getById(id, requestingUser) {
    const contact = await Contact.findById(id);

    if (!contact) {
      const error = new Error("Contato não encontrado.");
      error.status = 404;
      throw error;
    }

    if (contact.user_id !== requestingUser.id && requestingUser.role !== "admin") {
      const error = new Error("Acesso negado.");
      error.status = 403;
      throw error;
    }

    return contact;
  }

  static async create(userId, data) {
    return Contact.create({ user_id: userId, ...data });
  }

  static async update(id, requestingUser, data) {
    // Verifica existência e permissão
    await this.getById(id, requestingUser);

    return Contact.update(id, data);
  }

  static async delete(id, requestingUser) {
    // Verifica existência e permissão
    await this.getById(id, requestingUser);

    return Contact.delete(id);
  }
}

module.exports = ContactService;
