const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const verifyToken = require("../middlewares/authMiddleware");

const Cost = require("../models/Cost");
const User = require("../models/User");

router.post("/add-cost", verifyToken, async (req, res) => {
  const { title, date, amount, note } = req.body;

  if (!title || !date || !amount) {
    return res
      .status(400)
      .json({ message: "Title, date, and amount are required." });
  }

  try {
    const user = await User.findById(req.user.id).populate("mess");
    if (!user || !user.mess)
      return res.status(404).json({ message: "Mess not found for user" });

    const cost = new Cost({
      title,
      date,
      amount,
      note,
      mess: user.mess._id,
    });

    await cost.save();

    res.status(201).json({ message: "Cost added successfully", cost });
  } catch (err) {
    console.error("Error adding cost:", err);
    res.status(500).json({ message: "Server error" });
  }
});

router.get("/all-costs", verifyToken, async (req, res) => {
  try {
    const { mess, month, year } = req.query;

    if (!mess) {
      return res.status(400).json({ message: "Mess ID is required" });
    }

    let filter = { mess };

    if (month && year) {
      const start = new Date(year, month - 1, 1);
      const end = new Date(year, month, 0, 23, 59, 59, 999);
      filter.date = { $gte: start, $lte: end };
    }

    const costs = await Cost.find(filter).sort({ date: -1 });

    const total = costs.reduce((acc, item) => acc + item.amount, 0);

    res.json({ costs, total });
  } catch (err) {
    console.error("Error fetching costs:", err);
    res.status(500).json({ message: "Internal server error" });
  }
});

module.exports = router;
