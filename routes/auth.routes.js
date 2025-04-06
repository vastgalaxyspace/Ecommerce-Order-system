const express = require("express");
const router = express.Router();

const authcontroller = require("../controllers/auth.controllers");
const authMiddleware = require("../middleware/authMiddleware");

router.post("/register", authcontroller.register);
router.post("/login", authcontroller.login);
router.get("/profile", authMiddleware.verifyToken, authcontroller.getprofile);
router.post("/logout", authMiddleware.verifyToken, authcontroller.logout);

module.exports = router;
