const bcrypt = require("bcrypt");
const sendOtpEmail = require("../Mail/sendOtpEmail");
const AccessData = require("../Models/access-data");
const sendWarningEmail = require("../Mail/sendWarningEmail");
const sendVerificationSuccessEmail = require("../Mail/sendVerificationSuccessEmail");

const generateOTP = () =>
  Math.floor(100000 + Math.random() * 900000).toString();
const MAX_ATTEMPTS = 5;
const LOCK_TIME = 60 * 60 * 1000;

const sendOtp = async (req, res) => {
  const { email, phone } = req.body;

  try {
    const existingUser = await AccessData.findOne({ email, phone });

    if (existingUser) {
      if (existingUser.verified) {
        return res.status(200).json({
          message: "User is already verified",
          verified: true,
          success: true,
        });
      } else {
        const otp = generateOTP();
        const hashedOTP = await bcrypt.hash(otp, 10);
        existingUser.otp = hashedOTP;
        await existingUser.save();
        await sendOtpEmail(email, otp);
        return res.status(200).json({
          message: "New OTP sent successfully",
          success: true,
          verified: false,
        });
      }
    } else {
      const otp = generateOTP();
      const hashedOTP = await bcrypt.hash(otp, 10);
      const newUser = new AccessData({ email, phone, otp: hashedOTP });
      await newUser.save();
      await sendOtpEmail(email, otp);
      return res.status(201).json({
        message: "User created and OTP sent successfully",
        success: true,
        verified: false,
      });
    }
  } catch (error) {
    console.error("Error in sending OTP:", error);
    return res.status(500).json({
      message: "Server error",
      success: false,
      verified: false,
      error,
    });
  }
};

const verifyOtp = async (req, res) => {
  const { email, phone, otp } = req.body;
  try {
    const user = await AccessData.findOne({ email, phone });
    if (!user) {
      return res
        .status(404)
        .json({ message: "User not found", success: false });
    }
    const now = Date.now();
    // Check if the user is locked
    if (
      user.attempts.count >= MAX_ATTEMPTS &&
      now - user.attempts.time < LOCK_TIME
    ) {
      return res.status(403).json({
        message: `Too many attempts. Try again after ${Math.ceil(
          (LOCK_TIME - (now - user.attempts.time)) / (60 * 1000)
        )} minutes.`,
        success: false,
      });
    }

    // Verify OTP
    const isMatch = await bcrypt.compare(otp, user.otp);

    if (isMatch) {
      // OTP is correct
      user.verified = true;
      user.attempts.count = 0; // Reset attempt count on successful verification
      user.attempts.time = Date.now(); // Update last attempt time
      await user.save();
      // Send success email
      await sendVerificationSuccessEmail(email);
      return res
        .status(200)
        .json({ message: "OTP verified successfully", success: true });
    } else {
      // OTP is incorrect
      user.attempts.count += 1;
      user.attempts.time = Date.now(); // Update last attempt time
      await user.save();

      if (user.attempts.count >= MAX_ATTEMPTS) {
        // Send warning email if attempts exceed the maximum
        await sendWarningEmail(email);
        return res.status(403).json({
          message: `Incorrect OTP. You have exceeded the maximum number of attempts. Try again after ${Math.ceil(
            LOCK_TIME / (60 * 1000)
          )} minutes.`,
          success: false,
        });
      }

      return res.status(400).json({
        message: `Incorrect OTP. You have ${
          MAX_ATTEMPTS - user.attempts.count
        } attempts left.`,
        success: false,
      });
    }
  } catch (error) {
    console.error("Error verifying OTP:", error);
    return res
      .status(500)
      .json({ message: "Server error", success: false, error });
  }
};

const viewAccessByCategory = async (req, res) => {
  try {
    const category = req.body.category;
    const query = {};

    switch (category) {
      case "v":
        query.verified = true;
        break;
      case "r":
        query.reached = true;
        break;
      case "v-r":
        query.verified = true;
        query.reached = true;
        break;
      case "v-nr":
        query.verified = true;
        query.reached = false;
        break;
      case "nv-r":
        query.verified = false;
        query.reached = true;
        break;
      case "nv-nr":
        query.verified = false;
        query.reached = false;
        break;
      default:
        return res
          .status(400)
          .json({ message: "Invalid category", success: false });
    }
    const users = await AccessData.find(query);
    return res.status(200).json({ users, success: true });
  } catch (error) {
    console.error("Error viewing access by category:", error);
    return res
      .status(500)
      .json({ message: "Server error", success: false, error });
  }
};

const updateReachedStatus = async (req, res) => {
  const { email, phone } = req.body;

  try {
    const user = await AccessData.findOneAndUpdate(
      { email, phone },
      { reached: true },
      { new: true }
    );

    if (!user) {
      return res
        .status(404)
        .json({ message: "User not found", success: false });
    }

    return res.status(200).json({
      message: "User reached status updated successfully",
      success: true,
      user,
    });
  } catch (error) {
    console.error("Error updating reached status:", error);
    return res.status(500).json({
      message: "Server error",
      success: false,
      error,
    });
  }
};

module.exports = {
  sendOtp,
  verifyOtp,
  viewAccessByCategory,
  updateReachedStatus,
};
