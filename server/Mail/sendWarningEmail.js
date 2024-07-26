const nodemailer = require("nodemailer");
const config = require("../config");

const sendWarningEmail = async (email) => {
  const transporter = nodemailer.createTransport({
    service: "GMAIL",
    auth: {
      user: config.EMAIL,
      pass: config.EMAIL_PASSWORD,
    },
  });

  const mailOptions = {
    from: config.EMAIL,
    to: email,
    subject: "Warning: Too Many OTP Attempts",
    html: `
      <p>Dear User,</p>
      <p>We noticed multiple failed attempts to verify your OTP.</p>
      <p>Your account is temporarily locked due to too many failed attempts. Please try again after 1 hour.</p>
      <p>If you need further assistance, please contact support.</p>
      <p>Best regards,</p>
      <p>The Support Team</p>
    `,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error("Error sending warning email:", error);
    } else {
      console.log("Warning email sent:", info.response);
    }
  });
};

module.exports = sendWarningEmail;
