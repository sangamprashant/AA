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
    subject: "Verification Successful",
    html: `
      <p>Dear User,</p>
      <p>Your OTP verification was successful. You now have access to the protected content.</p>
      <p>If you did not request this, please contact our support team immediately.</p>
      <p>Thank you for using our service!</p>
      <p>Best regards,</p>
      <p>The Support Team</p>
       <div style="text-align: center; margin: 20px 0;">
                ${socialLinksHtml}
              </div>
              <div style="text-align: center; margin-top: 20px;">
                  <a href="mailto:${config.EMAIL_IN_MAIL}" style="color: #007BFF; text-decoration: none; margin: 0 10px;">Mail Us</a> |
                  <a href="${config.FRONTEND_DOMAIN}/contact-us" style="color: #007BFF; text-decoration: none; margin: 0 10px;">Contact Us</a>
              </div>
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
