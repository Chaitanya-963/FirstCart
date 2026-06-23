const Order = require("../models/Order.model.js");
const sendEmail = require("../utils/sendEmail.js");
const {
  getOrderTemplate,
  getStatusUpdateTemplate,
} = require("../constants/templates.js");

// Create Order Controller
const createOrder = async (req, res) => {
  try {
    const { items, totalAmount, address, paymentId } = req.body;

    if (!items || items.length === 0 || !totalAmount || !address) {
      return res.status(400).json({
        message: "Invalid order data.",
        status: "error",
      });
    }

    const order = new Order({
      user: req.user._id,
      items,
      totalAmount,
      address,
      paymentId,
    });

    await order.save();

    // Generate responsive HTML layout receipt configuration
    const emailHtml = getOrderTemplate(
      req.user.name,
      order._id,
      totalAmount,
      address,
    );

    // Dispatches invoice safely via Mailtrap utility pipeline integration
    await sendEmail(
      req.user.email,
      `FirstCart - Order Confirmation #${order._id}`,
      emailHtml,
    );

    res.status(201).json({
      message: "Order created successfully",
      status: "success",
      order,
    });
  } catch (error) {
    console.error("Order Creation Error:", error);
    res.status(500).json({
      message: "Error in creating order",
      status: "error",
      error: error.message,
    });
  }
};

const getOrdersById = async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user._id })
      .populate("items.productId", "name price")
      .sort({ createdAt: -1 });

    res.status(200).json({
      message: "User orders fetched successfully",
      status: "success",
      count: orders.length,
      orders,
    });
  } catch (error) {
    console.error("Fetch User Orders Error:", error);
    res.status(500).json({
      message: "Error fetching orders",
      status: "error",
      error: error.message,
    });
  }
};

const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find({})
      .populate("user", "name email")
      .populate("items.productId", "name price")
      .sort({ createdAt: -1 });

    res.status(200).json({
      message: "All orders fetched successfully",
      status: "success",
      count: orders.length,
      orders,
    });
  } catch (error) {
    console.error("Fetch All Orders Error:", error);
    res.status(500).json({
      message: "Error fetching all system orders",
      status: "error",
      error: error.message,
    });
  }
};

const updateOrderStatus = async (req, res) => {
  try {
    const { status } = req.body;

    if (!status) {
      return res
        .status(400)
        .json({ message: "Status field is required", status: "error" });
    }

    const allowedStatuses = ["pending", "shipped", "delivered", "cancelled"];
    if (!allowedStatuses.includes(status.toLowerCase())) {
      return res.status(400).json({
        message: `Invalid status values. Must choose from: ${allowedStatuses.join(", ")}`,
        status: "error",
      });
    }

    const order = await Order.findById(req.params.orderId).populate(
      "user",
      "name email",
    );
    if (!order) {
      return res
        .status(404)
        .json({ message: "Order not found", status: "error" });
    }

    order.status = status.toLowerCase();
    await order.save();

    if (order.user && order.user.email && order.status !== "pending") {
      const emailHtml = getStatusUpdateTemplate(
        order.user.name,
        order._id,
        order.status,
      );

      await sendEmail(
        order.user.email,
        `FirstCart - Order Notification #${order._id}`,
        emailHtml,
      ).catch((err) => console.error("Notification trigger failure:", err)); // Keep api running if email fails
    }

    res.status(200).json({
      message: `Order status updated to ${status} successfully`,
      status: "success",
      order,
    });
  } catch (error) {
    console.error("Update Order Status Error:", error);
    res.status(500).json({
      message: "Error updating order status",
      status: "error",
      error: error.message,
    });
  }
};

module.exports = {
  createOrder,
  getOrdersById,
  getAllOrders,
  updateOrderStatus,
};
