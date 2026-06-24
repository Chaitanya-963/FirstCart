const Razorpay = require("razorpay");
const crypto = require("crypto");
require("dotenv").config();

const createdOrder = async (req, res) => {
  try {
    const instance = new Razorpay({
      key_id: process.env.RAZORPAY_KEY_ID,
      key_secret: process.env.RAZORPAY_KEY_SECRET,
    });
    const options = {
      amount: Number(req.body.amount) * 100,
      currency: "INR",
      receipt: crypto.randomBytes(10).toString("hex"),
    };

    const order = await instance.orders.create(options);
    res.status(200).json(order);
  } catch (error) {
    console.error("Razorpay Order Creation Error:", error);
    res.status(500).json({
      message: "Server error creating Razorpay order",
    });
  }
};

const verifyPayment = async (req, res) => {
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } =
      req.body;

    const signBody = razorpay_order_id + "|" + razorpay_payment_id;
    const generated_signature = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
      .update(signBody.toString())
      .digest("hex");

    if (generated_signature === razorpay_signature) {
      return res.status(200).json({
        message: "Test Payment Verified Successfully!",
        status: "success",
        paymentId: razorpay_payment_id,
      });
    } else {
      return res
        .status(400)
        .json({ message: "Invalid Signature Mismatch", status: "error" });
    }
  } catch (error) {
    res.status(500).json({ message: "Verification system error" });
  }
};

module.exports = { createdOrder, verifyPayment };
