const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

// 1. Import Routes
const authRoute = require("./routes/auth");
const orderRoute = require("./routes/order");

const app = express();

// 2. Middleware
app.use(cors());
app.use(express.json());

// 3. Use Routes
// Note: orderRoute handles BOTH /api/orders/mine and /api/orders/ (for admin)
app.use("/api/auth", authRoute);
app.use("/api/orders", orderRoute); 

// 4. Health Check
app.get("/", (req, res) => {
  res.send("Backend is running");
});

// 5. Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("✅ MongoDB Connected");

    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("❌ MongoDB connection failed:", err);
  });