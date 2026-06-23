const express = require("express");
const router = express.Router();
const {
  registerUser,
  loginUser,
  getUsers,
  verifyOtp,
  resendOtp,
  // logoutUser,
} = require("../controllers/auth.controllers");
const { protect } = require("../middleware/auth.middleware");
const { admin } = require("../middleware/admin.middleware");

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/users", protect, admin, getUsers);
router.post("/verify-otp", verifyOtp);
router.post("/resend-otp", resendOtp);

// router.post("/logout", logoutUser);

module.exports = router;
