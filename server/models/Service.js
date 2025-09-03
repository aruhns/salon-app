const mongoose = require("mongoose");

const serviceSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: String,
  duration: Number, // minutes
  price: Number
}, { timestamps: true });

module.exports = mongoose.model("Service", serviceSchema);
