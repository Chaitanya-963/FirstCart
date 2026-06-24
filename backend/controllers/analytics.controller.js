const Order = require("../models/Order.model");
const User = require("../models/User.model");
const Product = require("../models/Product.model");

const getAdminStats = async (req, res) => {
  try {
    const [totalUsers, totalOrders, totalProducts] = await Promise.all([
      User.countDocuments({ role: "user" }),
      Order.countDocuments({}),
      Product.countDocuments({}),
    ]);

    const revenueAggregation = await Order.aggregate([
      {
        $group: {
          _id: null,
          totalRevenue: { $sum: "$totalAmount" },
        },
      },
    ]);

    const totalRevenue = revenueAggregation.length > 0 ? revenueAggregation[0].totalRevenue : 0;

    res.status(200).json({
      totalUsers,
      totalProducts,
      totalOrders,
      totalRevenue, 
    });
  } catch (error) {
    console.error("Stats Error:", error);
    res.status(500).json({
      message: "Error fetching stats",
      error: error.message, 
    });
  }
};

module.exports = getAdminStats;
