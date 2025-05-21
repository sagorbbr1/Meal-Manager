const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    mess: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Mess",
    },
    role: {
      type: String,
      enum: ["manager", "member"],
      default: "member",
    },

    mealStats: {
      totalMeal: { type: Number, default: 0 },
      totalDeposit: { type: Number, default: 0 },
      mealCost: { type: Number, default: 0 },
      totalCost: { type: Number, default: 0 },
      balance: { type: Number, default: 0 },
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
