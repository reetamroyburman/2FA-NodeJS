const router = require("express").Router();
const authController = require("../controllers/authController.js");

router.post("/register", authController.twoFactorAuth);
router.post("/verify",authController.verifySecret)

module.exports = router;