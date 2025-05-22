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

module.exports = router;
