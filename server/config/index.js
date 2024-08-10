const dotenv = require("dotenv");
dotenv.config();

const config = {
  PORT: process.env.PORT,
  MONGODB_URI: process.env.MONGODB_URI,
  MONGODB_DB: process.env.MONGODB_DB,
  JWT_SECRET: process.env.JWT_SECRET,
  FRONTEND_DOMAIN: process.env.FRONTEND_DOMAIN,
  EMAIL: process.env.EMAIL,
  EMAIL_PASSWORD: process.env.EMAIL_PASSWORD,
  ADMIN_EMAIL: process.env.ADMIN_EMAIL,
  RAZORPAY_KEY_ID: process.env.RAZORPAY_KEY_ID,
  RAZORPAY_SECRET_KEY: process.env.RAZORPAY_SECRET_KEY,
  EMAIL_IN_MAIL: process.env.EMAIL_IN_MAIL,
  ADMIN_DOMAIL:process.env.ADMIN_DOMAIL,
};

module.exports = config;
