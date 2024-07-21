const crypto = require("crypto");
const Visitor = require("../Models/visitor");

const hashIp = (ip) => {
  return crypto.createHash("sha256").update(ip).digest("hex");
};

const trackVisitor = async (req, res, next) => {
  const ip = req.ip || req.connection.remoteAddress;
  const hashedIp = hashIp(ip);
  const today = new Date().setHours(0, 0, 0, 0);

  // Check if the visitor is new for today
  const existingVisitor = await Visitor.findOne({
    ip: hashedIp,
    timestamp: { $gte: today },
  });

  if (existingVisitor) {
    existingVisitor.isNewVisitor = false;
    await existingVisitor.save();
  } else {
    const newVisitor = new Visitor({ ip: hashedIp });
    await newVisitor.save();
  }

  next();
};

module.exports = trackVisitor;
