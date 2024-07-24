const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const helmet = require("helmet");
const cors = require("cors");
const mongoSanitize = require("express-mongo-sanitize");
const rateLimit = require("express-rate-limit");
const cookieParser = require("cookie-parser");
const config = require("./server/config");
const authenticateToken = require("./server/middlewares/authMiddleware");
const trackVisitor = require("./server/middlewares/trackVisitor");

const app = express();

const corsOptions = {
  origin: config.FRONTEND_DOMAIN,
  credentials: true,
  optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));
app.use(mongoSanitize());
app.use(express.json());
app.use(cookieParser());

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
});
app.use(limiter);

const PORT = config.PORT || 5000;
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
app.use(trackVisitor);
app.use("/api/v1/user", require("./server/Routers/user"));
app.use("/api/v1/booking", require("./server/Routers/booking"));
app.use("/api/v1/contact", require("./server/Routers/contact"));
app.use("/api/v1/payment", require("./server/Routers/paymet"));
app.use("/api/v1/study-materials", require("./server/Routers/studyMaterials"));

app.get("/api/v1/protected", authenticateToken, (req, res) => {
  res.status(200).json({
    message: "You have access to this protected route.",
    user: req.user,
    success: true,
  });
});


app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "server.html"));
});

// app.use(express.static(path.join(__dirname, "frontend/dist")));
// app.get("*", (req, res) => {
//   res.sendFile(path.join(__dirname, "frontend/dist", "index.html"));
// });

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
