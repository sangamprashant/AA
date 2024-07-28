const nodemailer = require("nodemailer");
const config = require("../config");

const transporter = nodemailer.createTransport({
  service: "GMAIL",
  auth: {
    user: config.EMAIL,
    pass: config.EMAIL_PASSWORD,
  },
});

const sendPaymentConfirmationEmail = async (paymentDetails) => {
  const socialLinks = [
    {
      href: "https://www.facebook.com/people/Theatoz-Classes/61560106029558/?mibextid=ZbWKwL",
      src: `${config.FRONTEND_DOMAIN}/social/facebook.png`,
      alt: "",
    },
    {
      href: "https://x.com/theatozclasses",
      src: `${config.FRONTEND_DOMAIN}/social/twitter.png`,
      alt: "",
    },
    {
      href: "https://www.linkedin.com/company/theatozclasses/",
      src: `${config.FRONTEND_DOMAIN}/social/linkedin.png`,
      alt: "",
    },
    {
      href: "https://www.instagram.com/theatozclasses",
      src: `${config.FRONTEND_DOMAIN}/social/instagram.png`,
      alt: "",
    },
    {
      href: "https://www.youtube.com/@theatozclasses",
      src: `${config.FRONTEND_DOMAIN}/social/youtube.png`,
      alt: "",
    },
  ];

  const socialLinksHtml = socialLinks
    .map(
      (link) => `
    <a href="${link.href}" target="_blank" style="margin: 0 10px; display: inline-block;">
      <img src="${link.src}" alt="${link.alt}" style="width: 24px; height: 24px;">
    </a>
  `
    )
    .join("");
  const mailOptions = {
    from: config.EMAIL,
    to: paymentDetails.email,
    subject: "Payment Confirmation",
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
                  <h1 style="color: #000000;">Payment Confirmation</h1>
                  <p>Dear ${paymentDetails.name},</p>
                  <p>Thank you for initiating your payment. We have received the following details:</p>
                  <div style="margin-top: 20px; padding: 15px; background-color: #f9f9f9; border: 1px solid #dddddd; border-radius: 5px;">
                      <h2 style="color: #000000;">Payment Details:</h2>
                      <p><b>Name:</b> ${paymentDetails.name}</p>
                      <p><b>Mobile Number:</b> ${paymentDetails.mobileNumber}</p>
                      <p><b>Email:</b> ${paymentDetails.email}</p>
                      <p><b>Purpose:</b> ${paymentDetails.purpose}</p>
                      <p><b>Amount:</b> ${paymentDetails.amount}</p>
                      <p><b>Class:</b> ${paymentDetails.selectClass}</p>
                      <p><b>Order Creation ID:</b> ${paymentDetails.orderCreationId}</p>
                      <p><b>Status:</b> ${paymentDetails.status}</p>
                  </div>
                  <p>Please complete the payment process to receive your receipt. This is not the receipt. The receipt will be sent once the payment is completed. If you do not receive the receipt after completing the payment, please contact us.</p>
                  <p>This is a system-generated message, please do not reply to this email.</p>
                  <p>Best regards,</p>
                  <p>The Support Team</p>
              </div>
              <div style="text-align: center; margin: 20px 0;">
                ${socialLinksHtml}
              </div>
              <div style="text-align: center; margin-top: 20px;">
                  <a href="mailto:${config.EMAIL_IN_MAIL}" style="color: #007BFF; text-decoration: none; margin: 0 10px;">Mail Us</a> |
                  <a href="${config.FRONTEND_DOMAIN}/contact-us" style="color: #007BFF; text-decoration: none; margin: 0 10px;">Contact Us</a>
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

module.exports = sendPaymentConfirmationEmail;
