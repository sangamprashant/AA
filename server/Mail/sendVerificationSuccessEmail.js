const nodemailer = require("nodemailer");
const config = require("../config");

const sendVerificationSuccessEmail = async (email) => {
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
    subject: "Verification Successful",
    html: `
      <p>Dear User,</p>
      <p>Your OTP verification was successful. You now have access to the protected content.</p>
      <p>If you did not request this, please contact our support team immediately.</p>
      <p>Thank you for using our service!</p>
      <p>Best regards,</p>
      <p>The Support Team</p>
    `,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error("Error sending verification success email:", error);
    } else {
      console.log("Verification success email sent:", info.response);
    }
  });
};

module.exports = sendVerificationSuccessEmail;
