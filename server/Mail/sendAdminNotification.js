const nodemailer = require("nodemailer");
const config = require("../config");

const sendAdminNotificationEmail = async (type, details) => {
  const transporter = nodemailer.createTransport({
    service: "GMAIL",
    auth: {
      user: config.EMAIL,
      pass: config.EMAIL_PASSWORD,
    },
  });

  const mailOptions = {
    from: "your-email@example.com",
    to: config.ADMIN_EMAIL,
    subject: `New ${type} Form Submission Notification`,
    html: `
      <!DOCTYPE html>
      <html lang="en">
      <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
      </head>
      <body style="font-family: Arial, sans-serif; background-color: #f7f7f7; margin: 0; padding: 0;">
          <div style="margin: 0 auto; background-color: #ffffff; padding: 20px; border: 1px solid #dddddd; border-radius: 5px;">
              <div style="padding: 20px;">
                  <h1 style="color: #333333;">New ${type} Form Submission</h1>
                  <p>A new ${type} form submission has been received.</p>
                  <div style="margin-top: 20px; padding: 15px; background-color: #f9f9f9; border: 1px solid #dddddd; border-radius: 5px;">
                      <h2 style="color: #333333;">Details:</h2>
                      ${details}
                  </div>
                  <p>Please take appropriate action as soon as possible.</p>
                  <p>Best regards,</p>
                  <p>The A To Z Classes</p>
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
      console.error("Error sending email:", error);
    } else {
      console.log("Admin notification email sent:", info.response);
    }
  });
};

module.exports = sendAdminNotificationEmail;
