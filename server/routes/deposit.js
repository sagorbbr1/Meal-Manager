const mongoose = require("mongoose");
const express = require("express");
const Deposit = require("../models/Deposit");
const User = require("../models/User");
const verifyToken = require("../middlewares/authMiddleware");
const router = express.Router();

router.post("/add-deposit", verifyToken, async (req, res) => {
  const { member, date, amount, note } = req.body;

  if (!mongoose.Types.ObjectId.isValid(member)) {
    return res.status(400).json({ message: "Invalid member ID" });
  }

  if (!date || amount == null) {
    return res.status(400).json({ message: "Date and amount are required" });
  }

  const parsedAmount = parseFloat(amount);
  if (isNaN(parsedAmount) || parsedAmount < 0) {
    return res.status(400).json({ message: "Amount must be a valid number" });
  }

  try {
    const user = await User.findById(member);
    if (!user) return res.status(404).json({ message: "Member not found" });

    const deposit = new Deposit({
      member,
      date,
      amount: parsedAmount,
      note,
    });

    await deposit.save();

    if (!user.mealStats) {
      user.mealStats = {};
    }

    user.mealStats.totalDeposit =
      (user.mealStats.totalDeposit || 0) + parsedAmount;
    await user.save();

    res.status(201).json({ message: "Deposit added", deposit });
  } catch (err) {
    console.error("Error adding deposit:", err);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
