const { Router } = require("express");
const authController = require("../controllers/authController");
const { registerValidation, loginValidation } = require("../security/validators");

const router = Router();

router.post("/register", registerValidation, authController.register);
router.post("/login", loginValidation, authController.login);

module.exports = router;
