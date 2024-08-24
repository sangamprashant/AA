process.env.TZ = 'Asia/Kolkata';
const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const helmet = require("helmet");
const cors = require("cors");
const mongoSanitize = require("express-mongo-sanitize");
const rateLimit = require("express-rate-limit");
const cookieParser = require("cookie-parser");
const authenticateToken = require("./server/middlewares/authMiddleware");
const trackVisitor = require("./server/middlewares/trackVisitor");
const config = require("./server/config");
const moment = require('moment-timezone');

const app = express();

app.set('trust proxy', 1);

const allowedOrigins = [config.FRONTEND_DOMAIN, config.ADMIN_DOMAIN];

const corsOptions = {
  origin: function (origin, callback) {
    // If no origin or if origin is allowed, then allow the request
    if (!origin || allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
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

const now = moment();
console.log('Current Timezone:', process.env.TZ);
console.log("Indian Time:", now.tz('Asia/Kolkata').format('YYYY-MM-DD HH:mm:ss'));

// routes
app.use(trackVisitor);
app.use("/api/v1/user", require("./server/Routers/public/user"));
app.use("/api/v1/booking", require("./server/Routers/public/booking"));
app.use("/api/v1/contact", require("./server/Routers/public/contact"));
app.use("/api/v1/payment", require("./server/Routers/public/paymet"));
app.use("/api/v1/study-materials", require("./server/Routers/public/studyMaterials"));
app.use("/api/v1/access-content", require("./server/Routers/public/access-data"));
// v2
app.use("/api/v2/auth", require("./server/Routers/admin/auth"));
app.use("/api/v2/admin", require("./server/Routers/admin/admin"));
app.use("/api/v2/employee", require("./server/Routers/admin/employee"));
app.use("/api/v2/manager", require("./server/Routers/admin/manager"));
app.use("/api/v2/payment", require("./server/Routers/admin/payment"));
app.use("/api/v2/study-materials", require("./server/Routers/admin/studyMaterials"));
app.use("/api/v2/attendance", require("./server/Routers/admin/attendance"));
app.use("/api/v2/leave", require("./server/Routers/admin/leave"));
app.use("/api/v2/notifications", require("./server/Routers/admin/notifications"));
app.use("/api/v2/calendar", require("./server/Routers/admin/calendar"));

app.get("/api/v1/protected", authenticateToken, (req, res) => {
  res.status(200).json({
    message: "You have access to this protected route.",
    user: req.user,
    success: true,
  });
});

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "./server.html"));
});

// app.use(express.static(path.join(__dirname, "frontend/dist")));
// app.get("*", (req, res) => {
//   res.sendFile(path.join(__dirname, "frontend/dist", "index.html"));
// });

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});


const user = {
  "_id": "66c0dadeb1472508e7cf2b00",
  "name": "emp 1",
  "email": "emp1@gmail.com",
  "role": "employee",
  "manager": "66c0daa6b1472508e7cf2af0",
  "createdAt": moment("2024-08-17T17:16:14.876Z").tz("Asia/Kolkata").format("YYYY-MM-DD HH:mm:ss"),
  "updatedAt": moment("2024-08-21T19:02:23.945Z").tz("Asia/Kolkata").format("YYYY-MM-DD HH:mm:ss"),
  "__v": 25,
  "attendanceRecords": [
    {
      "date": moment("2024-08-21T17:26:34.736Z").tz("Asia/Kolkata").format("YYYY-MM-DD HH:mm:ss"),
      "status": "late",
      "activeTime": {
        "minutes": 19,
        "loginTime": moment("2024-08-21T18:13:17.028Z").tz("Asia/Kolkata").format("YYYY-MM-DD HH:mm:ss")
      },
      "details": `Arrived at ${moment("2024-08-21T18:13:17.028Z").tz("Asia/Kolkata").format("hh:mm A")}`
    },
    {
      "date": moment("2024-08-20T12:23:47.786Z").tz("Asia/Kolkata").format("YYYY-MM-DD HH:mm:ss"),
      "status": "late",
      "details": `Arrived at ${moment("2024-08-20T12:23:47.786Z").tz("Asia/Kolkata").format("hh:mm A")}`
    },
    {
      "date": moment("2024-08-19T18:36:17.602Z").tz("Asia/Kolkata").format("YYYY-MM-DD HH:mm:ss"),
      "status": "early",
      "details": `Arrived at ${moment("2024-08-19T18:36:17.602Z").tz("Asia/Kolkata").format("hh:mm A")}`
    },
    {
      "date": moment("2024-08-21T18:30:00.000Z").tz("Asia/Kolkata").format("YYYY-MM-DD HH:mm:ss"),
      "status": "present",
      "activeTime": {
        "minutes": 3,
        "loginTime": moment("2024-08-21T19:02:23.939Z").tz("Asia/Kolkata").format("YYYY-MM-DD HH:mm:ss")
      },
      "details": "Continued session from previous day"
    }
  ],
  "leaveRequests": []
};


app.get("/debug",(req,res)=>{
  res.json(user)
})