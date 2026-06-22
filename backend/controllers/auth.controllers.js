const User = require("../models/User.model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const sendEmail = require("../utils/sendEmail");

const getOtpTemplate = (name, otp) => {
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Verify Your Email</title>
      <style>
        body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #f4f4f7; color: #333333; margin: 0; padding: 0; }
        .email-container { max-width: 570px; margin: 0 auto; background-color: #ffffff; padding: 30px; border-radius: 8px; margin-top: 40px; border: 1px solid #e8e8e8; }
        .logo { font-size: 24px; font-weight: bold; color: #2563eb; text-align: center; margin-bottom: 25px; }
        .greeting { font-size: 18px; font-weight: 600; color: #1f2937; margin-bottom: 10px; }
        .text { font-size: 15px; line-height: 1.6; color: #4b5563; margin-bottom: 25px; }
        .otp-container { text-align: center; margin: 30px 0; background-color: #f0fdf4; border: 2px dashed #4ade80; padding: 15px; border-radius: 6px; }
        .otp-code { font-size: 32px; font-weight: bold; letter-spacing: 6px; color: #16a34a; }
        .expiry-text { font-size: 13px; color: #9ca3af; text-align: center; margin-top: 5px; }
        .footer { margin-top: 35px; text-align: center; font-size: 12px; color: #9ca3af; border-top: 1px solid #e5e7eb; padding-top: 20px; }
      </style>
    </head>
    <body>
      <div class="email-container">
        <div class="logo">FirstCart</div>
        <div class="greeting">Hello ${name},</div>
        <div class="text">
          Thank you for signing up with FirstCart! To complete your registration and secure your account, please verify your email address using the One-Time Password (OTP) below.
        </div>
        <div class="otp-container">
          <div class="otp-code">${otp}</div>
          <div class="expiry-text">This code is valid for 15 minutes.</div>
        </div>
        <div class="text">
          If you did not initiate this request, please ignore this email or contact our support team immediately.
        </div>
        <div class="footer">
          &copy; ${new Date().getFullYear()} FirstCart Inc. All rights reserved.<br>
          This is an automated operational email. Please do not reply directly.
        </div>
      </div>
    </body>
    </html>
  `;
};

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "1d",
  });
};

// Register a new user
const registerUser = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        message: "User already exists",
        status: "error",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const otp = Math.floor(100000 + Math.random() * 900000).toString(); // Generate a 6-digit OTP
    const otpExpires = new Date(Date.now() + 15 * 60 * 1000);

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      otp,
      otpExpires,
    });

    if (user) {
      const emailHtml = getOtpTemplate(name, otp);

      await sendEmail(
        email,
        "Welcome to FirstCart - Email Verification",
        emailHtml,
      );
      res.status(201).json({
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        token: generateToken(user._id),
      });
    } else {
      res.status(400).json({
        message: "Invalid user data",
        status: "error",
      });
    }
  } catch (error) {
    res.status(500).json({
      message: "Error registering user",
      status: "error",
    });
  }
};

// Login a user
const loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (user && (await bcrypt.compare(password, user.password))) {
      res.status(200).json({
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        token: generateToken(user._id),
      });
    } else {
      res.status(400).json({
        message: "Invalid email or password",
        status: "error",
      });
    }
  } catch (error) {
    res.status(500).json({
      message: "Error logging in user",
      status: "error",
    });
  }
};

// Get user details
const getUsers = async (req, res) => {
  try {
    const users = await User.find({}).select("-password");
    if (!users || users.length === 0) {
      return res.status(404).json({
        message: "Users not found",
        status: "error",
      });
    }
    res.status(200).json({
      message: "Users details fetched successfully",
      status: "success",
      data: users,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error fetching users details",
      status: "error",
    });
  }
};

module.exports = {
  registerUser,
  loginUser,
  getUsers,
};
