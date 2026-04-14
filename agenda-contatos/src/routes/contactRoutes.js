const { Router } = require("express");
const contactController = require("../controllers/contactController");
const { authenticate } = require("../security/auth");
const { contactValidation } = require("../security/validators");

const router = Router();

// Todas as rotas de contatos exigem autenticação
router.use(authenticate);

router.get("/", contactController.index);
router.get("/:id", contactController.show);
router.post("/", contactValidation, contactController.store);
router.put("/:id", contactValidation, contactController.update);
router.delete("/:id", contactController.destroy);

module.exports = router;
