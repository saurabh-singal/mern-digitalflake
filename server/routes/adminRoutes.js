const express = require("express");
const {
  registerAdmin,
  loginAdmin,
  forgotPassword,
  resetPassword,
} = require("../controllers/adminController");
const router = express.Router();

router.post("/register", registerAdmin);

router.post("/login", loginAdmin);
router.post("/forgot-password", forgotPassword);
router.get("/reset-password/:id/:token", resetPassword);

module.exports = router;
