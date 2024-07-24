const nodemailer = require("nodemailer");
const config = require("../config");

const transporter = nodemailer.createTransport({
  service: "GMAIL",
  auth: {
    user: config.EMAIL,
    pass: config.EMAIL_PASSWORD,
  },
});

const sendPaymentCompletionEmail = async (paymentDetails) => {
  const invoiceUrl = `${config.FRONTEND_DOMAIN}/payment?payment_id=${paymentDetails.razorpayPaymentId}`;

  const userMailOptions = {
    from: config.EMAIL,
    to: paymentDetails.email,
    subject: "Payment Completed - Invoice Available",
    html: `
      <!DOCTYPE html>
      <html lang="en">
      <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
      </head>
      <body style="font-family: Arial, sans-serif; background-color: #ffffff !important; margin: 0; padding: 0; background-image: url('${config.FRONTEND_DOMAIN}/email.png'); background-repeat: no-repeat; background-size: cover; background-position: center;">
          <div style="max-width: 650px; margin: 0 auto; background: #ffffff; padding: 20px; border: 1px solid #dddddd; border-radius: 5px;">
              <div style="padding: 20px;">
                  <h1 style="color: #000000;">Payment Completed</h1>
                  <p>Dear ${paymentDetails.name},</p>
                  <p>Thank you for completing your payment. We have received the following details:</p>
                  <div style="margin-top: 20px; padding: 15px; background-color: #f9f9f9; border: 1px solid #dddddd; border-radius: 5px;">
                      <h2 style="color: #000000;">Payment Details:</h2>
                      <p><b>Name:</b> ${paymentDetails.name}</p>
                      <p><b>Mobile Number:</b> ${paymentDetails.mobileNumber}</p>
                      <p><b>Email:</b> ${paymentDetails.email}</p>
                      <p><b>Purpose:</b> ${paymentDetails.purpose}</p>
                      <p><b>Amount:</b> ${paymentDetails.amount}</p>
                      <p><b>Class:</b> ${paymentDetails.selectClass}</p>
                      <p><b>Order Creation ID:</b> ${paymentDetails.orderCreationId}</p>
                      <p><b>Razorpay Payment ID:</b> ${paymentDetails.razorpayPaymentId}</p>
                      <p><b>Status:</b> ${paymentDetails.status}</p>
                  </div>
                  <p>Please click the button below to view and download your invoice:</p>
                  <p style="text-align: center;">
                    <a href="${invoiceUrl}" style="background-color: #4CAF50; color: white; padding: 10px 20px; text-align: center; text-decoration: none; display: inline-block; border-radius: 5px;">View Invoice</a>
                  </p>
                  <p>If you do not receive the receipt after completing the payment, please contact us.</p>
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

  const adminMailOptions = {
    from: config.EMAIL,
    to: config.ADMIN_EMAIL,
    subject: "New Payment Received",
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
                  <h1 style="color: #000000;">New Payment Received</h1>
                  <p>The following payment has been received:</p>
                  <div style="margin-top: 20px; padding: 15px; background-color: #f9f9f9; border: 1px solid #dddddd; border-radius: 5px;">
                      <h2 style="color: #000000;">Payment Details:</h2>
                      <p><b>Name:</b> ${paymentDetails.name}</p>
                      <p><b>Mobile Number:</b> ${paymentDetails.mobileNumber}</p>
                      <p><b>Email:</b> ${paymentDetails.email}</p>
                      <p><b>Purpose:</b> ${paymentDetails.purpose}</p>
                      <p><b>Amount:</b> ${paymentDetails.amount}</p>
                      <p><b>Class:</b> ${paymentDetails.selectClass}</p>
                      <p><b>Order Creation ID:</b> ${paymentDetails.orderCreationId}</p>
                      <p><b>Razorpay Payment ID:</b> ${paymentDetails.razorpayPaymentId}</p>
                      <p><b>Status:</b> ${paymentDetails.status}</p>
                  </div>
              </div>
              <div style="text-align: center; padding: 10px 0; border-top: 1px solid #dddddd; font-size: 12px; color: #999999;">
                  &copy; 2024 The A To Z Classes. All rights reserved.
              </div>
          </div>
      </body>
      </html>
    `,
  };

  // Send email to user
  transporter.sendMail(userMailOptions, (error, info) => {
    if (error) {
      return console.error("Error sending email to user:", error);
    }
    console.log("User email sent:", info.response);
  });

  // Send email to admin
  transporter.sendMail(adminMailOptions, (error, info) => {
    if (error) {
      return console.error("Error sending email to admin:", error);
    }
    console.log("Admin email sent:", info.response);
  });
};

module.exports = sendPaymentCompletionEmail;
