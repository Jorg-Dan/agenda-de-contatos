const { body, validationResult } = require("express-validator");

// Middleware que verifica os erros de validação
const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};

// Validações de registro de usuário
const registerValidation = [
  body("name")
    .trim()
    .notEmpty()
    .withMessage("O nome é obrigatório.")
    .isLength({ min: 2, max: 255 })
    .withMessage("O nome deve ter entre 2 e 255 caracteres."),
  body("email")
    .trim()
    .notEmpty()
    .withMessage("O email é obrigatório.")
    .isEmail()
    .withMessage("Formato de email inválido.")
    .normalizeEmail(),
  body("password")
    .notEmpty()
    .withMessage("A senha é obrigatória.")
    .isLength({ min: 6 })
    .withMessage("A senha deve ter no mínimo 6 caracteres."),
  body("role")
    .optional()
    .isIn(["admin", "user"])
    .withMessage("Role deve ser 'admin' ou 'user'."),
  validate,
];

// Validações de login
const loginValidation = [
  body("email")
    .trim()
    .notEmpty()
    .withMessage("O email é obrigatório.")
    .isEmail()
    .withMessage("Formato de email inválido.")
    .normalizeEmail(),
  body("password")
    .notEmpty()
    .withMessage("A senha é obrigatória."),
  validate,
];

// Validações de contato
const contactValidation = [
  body("name")
    .trim()
    .notEmpty()
    .withMessage("O nome do contato é obrigatório.")
    .isLength({ min: 2, max: 255 })
    .withMessage("O nome deve ter entre 2 e 255 caracteres."),
  body("phone")
    .optional({ values: "falsy" })
    .trim()
    .matches(/^[\d\s()+-]+$/)
    .withMessage("Formato de telefone inválido."),
  body("email")
    .optional({ values: "falsy" })
    .trim()
    .isEmail()
    .withMessage("Formato de email inválido.")
    .normalizeEmail(),
  body("address")
    .optional({ values: "falsy" })
    .trim()
    .isLength({ max: 500 })
    .withMessage("O endereço deve ter no máximo 500 caracteres."),
  body("notes")
    .optional({ values: "falsy" })
    .trim()
    .isLength({ max: 1000 })
    .withMessage("As notas devem ter no máximo 1000 caracteres."),
  // Validação customizada: pelo menos phone ou email
  body().custom((value) => {
    if (!value.phone && !value.email) {
      throw new Error("O contato deve ter pelo menos um telefone ou email.");
    }
    return true;
  }),
  validate,
];

module.exports = {
  registerValidation,
  loginValidation,
  contactValidation,
};
