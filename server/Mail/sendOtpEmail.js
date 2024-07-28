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
        <div style="text-align: center; margin: 20px 0;">
                ${socialLinksHtml}
              </div>
              <div style="text-align: center; margin-top: 20px;">
                  <a href="mailto:${config.EMAIL_IN_MAIL}" style="color: #007BFF; text-decoration: none; margin: 0 10px;">Mail Us</a> |
                  <a href="${config.FRONTEND_DOMAIN}/contact-us" style="color: #007BFF; text-decoration: none; margin: 0 10px;">Contact Us</a>
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
