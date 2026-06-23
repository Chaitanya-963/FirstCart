const User = require("../models/User.model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const sendEmail = require("../utils/sendEmail");
const getOtpTemplate = require("../constants/getOtpTemplate");
const getResendOtpTemplate = require("../constants/getResendOtpTemplate");

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
      if (!user.isVerified) {
        return res.status(400).json({
          message:
            "Email not verified. Please verify your email before logging in.",
          status: "error",
        });
      }

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

const verifyOtp = async (req, res) => {
  const { email, otp } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({
        message: "User not found",
        status: "error",
      });
    }

    if (user.isVerified) {
      return res.status(400).json({
        message: "User already verified. Please login.",
        status: "error",
      });
    }

    if (user.otp !== otp) {
      return res.status(400).json({
        message: "Invalid OTP. Please check your email and try again.",
        status: "error",
      });
    }
    if (new Date() > user.otpExpires) {
      return res.status(400).json({
        message: "OTP has expired. Please request a new one.",
        status: "error",
      });
    }

    user.isVerified = true;
    user.otp = undefined;
    user.otpExpires = undefined;
    await user.save();

    res.status(200).json({
      message: "Email verified successfully. You can now log in.",
      status: "success",
    });
  } catch (error) {
    res.status(500).json({
      message: "Error verifying OTP",
      status: "error",
    });
  }
};

const resendOtp = async (req, res) => {
  const { email } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({
        message: "User not found",
        status: "error",
      });
    }
    if (user.isVerified) {
      return res.status(400).json({
        message: "User already verified. Please login.",
        status: "error",
      });
    }

    const newOtp = Math.floor(100000 + Math.random() * 900000).toString();
    user.otp = newOtp;
    user.otpExpires = new Date(Date.now() + 15 * 60 * 1000);
    await user.save();

    const emailHtml = getResendOtpTemplate(user.name, newOtp);

    await sendEmail(
      email,
      "FirstCart - Your New OTP for Email Verification",
      emailHtml,
    );
    res.status(200).json({
      message: "New OTP sent to your email. Please check your inbox.",
      status: "success",
    });
  } catch (error) {
    res.status(500).json({
      message: "Error resending OTP",
      status: "error",
    });
  }
};

module.exports = {
  registerUser,
  loginUser,
  getUsers,
  verifyOtp,
  resendOtp,
};
