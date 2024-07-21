// models/Visitor.js
const mongoose = require('mongoose');

const visitorSchema = new mongoose.Schema({
  ip: { type: String, required: true },
  timestamp: { type: Date, default: Date.now },
  isNew: { type: Boolean, default: true },
});

const Visitor = mongoose.model('Visitor', visitorSchema);

module.exports = Visitor;
