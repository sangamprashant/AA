const nodemailer = require("nodemailer");
const config = require("../config");

const sendOtpEmail = async (email, otp) => {
  const transporter = nodemailer.createTransport({
    service: "Gmail",
    auth: {
      user: config.EMAIL,
      pass: config.EMAIL_PASSWORD,
    },
  });

  const mailOptions = {
    from: config.EMAIL,
    to: email,
    subject: "Your OTP Code",
    html: `
      <!DOCTYPE html>
      <html lang="en">
      <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
      </head>
      <body style="font-family: Arial, sans-serif; background-color: #f4f4f4; margin: 0; padding: 0;">
          <div style="max-width: 600px; margin: 20px auto; background: #ffffff; padding: 20px; border: 1px solid #dddddd; border-radius: 5px;">
              <h1 style="color: #333333;">Your OTP Code</h1>
              <p>Dear User,</p>
              <p>We received a request to verify your email address. Please use the following OTP code to complete the verification process:</p>
              <div style="margin-top: 20px; padding: 15px; background-color: #f9f9f9; border: 1px solid #dddddd; border-radius: 5px;">
                  <h2 style="color: #333333;">OTP Code:</h2>
                  <p style="font-size: 24px; font-weight: bold; color: #333333;">${otp}</p>
              </div>
              <p>If you did not request this code, please ignore this email.</p>
              <p>This is a system-generated message, please do not reply to this email.</p>
              <p>Best regards,</p>
              <p>The A To Z Classes Team</p>
          </div>
      </body>
      </html>
    `,
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log("OTP email sent:", info.response);
  } catch (error) {
    console.error("Error sending OTP email:", error);
  }
};

module.exports = sendOtpEmail;
