const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const helmet = require("helmet");
const cors = require("cors");
const mongoSanitize = require("express-mongo-sanitize");
const rateLimit = require("express-rate-limit");
const cookieParser = require("cookie-parser");
const config = require("../server/config");

const app = express();

const corsOptions = {
  origin: config.ADMIN_DOMAIL,
  credentials: true,
  optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));
app.use(mongoSanitize());
app.use(express.json());
app.use(cookieParser());

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
});
app.use(limiter);

const PORT = 5000;
const MONGODB_URI = config.MONGODB_URI;

// Connect to MongoDB
mongoose.connect(MONGODB_URI, {
  dbName: config.MONGODB_DB,
});
mongoose.connection.on("connected", () => {
  console.log("Connected to MongoDB");
});
mongoose.connection.on("error", (err) => {
  console.error("MongoDB connection error:", err);
});

// routes
app.use("/api/v1/auth", require("../server/routers/admin/auth"));
app.use("/api/v1/admin", require("../server/routers/admin/admin"));

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
