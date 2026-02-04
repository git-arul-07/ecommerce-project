const mongoose = require("mongoose");

const OrderSchema = new mongoose.Schema({
  // userEmail must NOT be unique: true
  userEmail: { type: String, required: true }, 
  items: { type: Array, required: true },
  total: { type: Number, required: true },
  shippingAddress: { type: String, required: true },
  status: { type: String, default: "Pending" }
}, { timestamps: true });

module.exports = mongoose.model("Order", OrderSchema);