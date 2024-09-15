const bcrypt = require("bcrypt");
const sendOtpEmail = require("../../Mail/sendOtpEmail");
const AccessData = require("../../Models/access-data");
const sendWarningEmail = require("../../Mail/sendWarningEmail");
const sendVerificationSuccessEmail = require("../../Mail/sendVerificationSuccessEmail");

const generateOTP = () =>
  Math.floor(100000 + Math.random() * 900000).toString();
const MAX_ATTEMPTS = 5;
const LOCK_TIME = 60 * 60 * 1000;

const sendOtp = async (req, res) => {
  const { email, phone, Class } = req.body;

  try {
    const existingUser = await AccessData.findOne({ email, phone });

    if (existingUser) {
      if (!existingUser.Class.includes(Class)) {
        existingUser.Class.push(Class);
        await existingUser.save();
      }

      if (existingUser.verified) {
        return res.status(200).json({
          message: "User is already verified",
          verified: true,
          success: true,
          classes: existingUser.Class, // Send classes in response
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
          classes: existingUser.Class, // Send classes in response
        });
      }
    } else {
      const otp = generateOTP();
      const hashedOTP = await bcrypt.hash(otp, 10);
      const newUser = new AccessData({
        email,
        phone,
        otp: hashedOTP,
        Class: [Class], // Initialize class array
      });
      await newUser.save();
      await sendOtpEmail(email, otp);
      return res.status(201).json({
        message: "User created and OTP sent successfully",
        success: true,
        verified: false,
        classes: newUser.Class, // Send classes in response
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
  const { email, phone, otp, Class } = req.body;
  try {
    const user = await AccessData.findOne({ email, phone });
    if (!user) {
      return res.status(404).json({
        message: "User not found",
        success: false,
      });
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
      user.attempts.count = 0;
      user.attempts.time = Date.now();

      // Add class if it's not already in the user's Class array
      if (!user.Class.includes(Class)) {
        user.Class.push(Class);
      }

      await user.save();

      // Send success email
      await sendVerificationSuccessEmail(email);

      return res.status(200).json({
        message: "OTP verified successfully",
        success: true,
        classes: user.Class, // Send classes in response
      });
    } else {
      // OTP is incorrect
      user.attempts.count += 1;
      user.attempts.time = Date.now();
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
};
