const express = require("express");
const router = express.Router();
const {
  registerUser,
  loginUser,
  getUsers,
  // logoutUser,
} = require("../controllers/auth.controllers");
const { protect } = require("../middleware/auth.middleware");
const { admin } = require("../middleware/admin.middleware");

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/users", protect, admin, getUsers);
// router.post("/logout", logoutUser);

module.exports = router;
