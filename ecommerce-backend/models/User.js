const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: { 
      type: String, 
      default: "" // Provides an empty string if no name is provided
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    isAdmin: {
      type: Boolean,
      default: false, 
    },
  },
  { timestamps: true } // Automatically creates 'createdAt' and 'updatedAt'
);

module.exports = mongoose.model("User", userSchema);