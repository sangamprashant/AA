const nodemailer = require("nodemailer");
const config = require("../config");

const sendBookingUpdateEmail = async (bookingDetails) => {
  const transporter = nodemailer.createTransport({
    service: "GMAIL",
    auth: {
      user: config.EMAIL,
      pass: config.EMAIL_PASSWORD,
    },
  });

  const mailOptions = {
    from: "your-email@example.com",
    to: bookingDetails.email,
    subject: "Booking Update: Confirmation",
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
                  <h1 style="color: #000000;">Booking Confirmed</h1>
                  <p>Dear ${bookingDetails.firstName} ${bookingDetails.lastName},</p>
                  <p>Your booking has been confirmed by The A to Z Classes! We are excited to have you join our session.</p>
                  <div style="margin-top: 20px; padding: 15px; background-color: #f9f9f9; border: 1px solid #dddddd; border-radius: 5px;">
                      <h2 style="color: #000000;">Booking Details:</h2>
                      <p><b>Email:</b> ${bookingDetails.email}</p>
                      <p><b>Country:</b> ${bookingDetails.country}</p>
                      <p><b>Phone Number:</b> ${bookingDetails.phoneNumber}</p>
                      <p><b>Selected Class:</b> ${bookingDetails.selectedClass}</p>
                      <p><b>Date of Class:</b> ${new Date(bookingDetails.doc).toDateString()}</p>
                  </div>
                  <p>If you have any questions or need to make changes to your booking, please feel free to contact us.</p>
                  <p>This is a system-generated message, please do not reply to this email.</p>
                  <p>Best regards,</p>
                  <p>The A to Z Classes Team</p>
              </div>
              <div style="text-align: center; padding: 10px 0; border-top: 1px solid #dddddd; font-size: 12px; color: #999999;">
                  &copy; 2024 The A to Z Classes. All rights reserved.
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

module.exports = sendBookingUpdateEmail;
