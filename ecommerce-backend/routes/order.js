const express = require("express");
const router = express.Router();
const Order = require("../models/Order");

// CRITICAL FIX: Destructure both functions from your middleware
const { verifyToken, verifyAdmin } = require("../middleware/auth");

/* ================= 1. USER ROUTES ================= */

// PLACE ORDER
router.post("/", verifyToken, async (req, res) => {
  try {
    const { items, total, shippingAddress } = req.body;

    if (!req.user || !req.user.email) {
      return res.status(401).json({ message: "Auth failed: No email in token" });
    }

    const newOrder = new Order({
      userEmail: req.user.email,
      items,
      total: Number(total), 
      shippingAddress,
    });

    const savedOrder = await newOrder.save();
    res.status(201).json(savedOrder);
  } catch (err) {
    console.error("❌ ORDER CRASH:", err.message);
    res.status(500).json({ message: "Order creation failed", error: err.message });
  }
});

// GET LOGGED-IN USER'S ORDERS
router.get("/mine", verifyToken, async (req, res) => {
  try {
    if (!req.user || !req.user.email) {
       return res.status(401).json({ message: "Token missing email" });
    }

    const orders = await Order.find({ userEmail: req.user.email }).sort({ createdAt: -1 });
    res.status(200).json(orders);
  } catch (err) {
    console.error("❌ FETCH ERROR:", err.message);
    res.status(500).json({ message: "Could not retrieve orders" });
  }
});

/* ================= 2. ADMIN ROUTES ================= */

// GET ALL ORDERS (Admin Only)
router.get("/", verifyAdmin, async (req, res) => {
  try {
    const orders = await Order.find().sort({ createdAt: -1 });
    res.status(200).json(orders);
  } catch (err) {
    res.status(500).json({ message: "Admin Fetch Failed", error: err.message });
  }
});

// UPDATE ORDER STATUS (Admin Only)
router.put("/:id/status", verifyAdmin, async (req, res) => {
  try {
    const updatedOrder = await Order.findByIdAndUpdate(
      req.params.id,
      { $set: { status: req.body.status } },
      { new: true }
    );
    res.status(200).json(updatedOrder);
  } catch (err) {
    res.status(500).json({ message: "Update Failed", error: err.message });
  }
});

// ALWAYS AT THE BOTTOM
module.exports = router;