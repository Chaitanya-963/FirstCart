const express = require("express");
const { protect } = require("../middleware/auth.middleware");
const { admin } = require("../middleware/admin.middleware");
const getAdminStats = require("../controllers/analytics.controller.js");

const router = express.Router();

router.get("/", protect, admin, getAdminStats);

module.exports = router;
