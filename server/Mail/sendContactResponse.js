const nodemailer = require("nodemailer");
const config = require("../config");

const sendContactResponse = async (contactDetails) => {
  const transporter = nodemailer.createTransport({
    service: "GMAIL",
    auth: {
      user: config.EMAIL,
      pass: config.EMAIL_PASSWORD,
    },
  });

  const mailOptions = {
    from: "your-email@example.com",
    to: contactDetails.email,
    subject: "Response to Your Contact Form Submission",
    html: `
      <!DOCTYPE html>
      <html lang="en">
      <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
      </head>
      <body style="font-family: Arial, sans-serif; background-color: #ffffff !important; margin: 0; padding: 0;">
          <div style="max-width: 650px; margin: 0 auto; background: #ffffff; padding: 20px; border: 1px solid #dddddd; border-radius: 5px;">
              <div style="padding: 20px;">
                  <h1 style="color: #000000;">Response to Your Contact Form Submission</h1>
                  <p>Dear ${contactDetails.firstName} ${contactDetails.lastName},</p>
                  <p>Thank you for reaching out to us. We have reviewed your message and here is our response:</p>
                  <div style="margin-top: 20px; padding: 15px; background-color: #f9f9f9; border: 1px solid #dddddd; border-radius: 5px;">
                      <p><b>Your Message:</b> ${contactDetails.message}</p>
                      <p><b>Our Response:</b> ${contactDetails.responseMessage}</p>
                  </div>
                  <p>If you have any further questions, please feel free to contact us again.</p>
                  <p>This is a system-generated message, please do not reply to this email.</p>
                  <p>Best regards,</p>
                  <p>The Support Team</p>
              </div>
              <div style="text-align: center; padding: 10px 0; border-top: 1px solid #dddddd; font-size: 12px; color: #999999;">
                  &copy; 2024 The A To Z Classes. All rights reserved.
              </div>
          </div>
      </body>
      </html>
    `,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return console.error("Error sending email:", error);
    }
    console.log("Email sent:", info.response);
  });
};

module.exports = sendContactResponse;
