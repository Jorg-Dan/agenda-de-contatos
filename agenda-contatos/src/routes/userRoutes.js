const { Router } = require("express");
const userController = require("../controllers/userController");
const { authenticate, authorize } = require("../security/auth");

const router = Router();

router.use(authenticate);

router.get("/me", userController.profile);
router.get("/", authorize("admin"), userController.index);

module.exports = router;
