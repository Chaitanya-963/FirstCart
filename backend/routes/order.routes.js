const express = require("express");
const {
  createOrder,
  getOrdersById,
  getAllOrders,
  updateOrderStatus,
} = require("../controllers/order.controller.js");
const { protect } = require("../middleware/auth.middleware.js");
const { admin } = require("../middleware/admin.middleware.js");

const router = express.Router();

router.route("/").post(protect, createOrder).get(protect, admin, getAllOrders);
router.route("/myorders").get(protect, getOrdersById);
router.route("/:orderId/status").put(protect, admin, updateOrderStatus);

module.exports = router;
