const jwt = require("jsonwebtoken");
const config = require("../config");

const requireManager = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    return res
      .status(401)
      .json({ message: "Access denied. No token provided.", success: false });
  }

  try {
    const decoded = jwt.verify(token, config.JWT_SECRET);
    req.user = decoded;

    if (req.user.role !== "manager") {
      return res
        .status(403)
        .json({ message: "Access denied. managers only.", success: false });
    }

    next();
  } catch (error) {
    res.status(400).json({ message: "Invalid token.", success: false });
  }
};

module.exports = requireManager;