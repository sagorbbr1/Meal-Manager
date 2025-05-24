const express = require("express");
const router = express.Router();
const Cost = require("../models/Cost");
const Deposit = require("../models/Deposit");
const User = require("../models/User");
const verifyToken = require("../middlewares/authMiddleware");
const Mess = require("../models/Mess");

router.post("/create", verifyToken, async (req, res) => {
  const userId = req.user.id;
  const { name, month } = req.body;

  try {
    const mess = new Mess({
      name,
      month,
      createdBy: userId,
      members: [userId],
    });

    await mess.save();

    await User.findByIdAndUpdate(userId, { mess: mess._id });

    res.status(201).json({ message: "Mess created", mess });
  } catch (err) {
    console.error("Mess creation failed:", err);
    res.status(500).json({ message: "Something went wrong" });
  }
});

router.get("/mine", verifyToken, async (req, res) => {
  try {
    const mess = await Mess.findOne({ createdBy: req.user.id });

    if (!mess) return res.status(404).json({ msg: "Mess not found" });

    res.json({ mess, members: mess.members });
  } catch (err) {
    console.error("Mess fetch error:", err);
    res.status(500).json({ msg: "Server error" });
  }
});

router.get("/stats", verifyToken, async (req, res) => {
  try {
    const userId = req.user.id;

    const user = await User.findById(userId);
    const messId = user?.mess;

    if (!messId) {
      return res.status(400).json({ error: "Mess ID is required" });
    }

    const totalCostResult = await Cost.aggregate([
      { $match: { mess: messId } },
      { $group: { _id: null, total: { $sum: "$amount" } } },
    ]);
    const totalCost = totalCostResult[0]?.total || 0;

    const totalDepositResult = await Deposit.aggregate([
      { $match: { mess: messId } },
      { $group: { _id: null, total: { $sum: "$amount" } } },
    ]);
    const totalDeposit = totalDepositResult[0]?.total || 0;

    const users = await User.find({ mess: messId });
    const totalMeal = users.reduce(
      (acc, user) => acc + (user.mealStats?.totalMeal || 0),
      0
    );

    const mealRate = totalMeal > 0 ? totalCost / totalMeal : 0;

    const messBalance = totalDeposit - totalCost;

    res.json({
      totalCost,
      totalDeposit,
      totalMeal,
      messBalance,
      mealRate,
    });
  } catch (err) {
    console.error("Dashboard stats error:", err);
    res.status(500).json({ error: "Failed to load dashboard stats" });
  }
});

router.delete("/delete/:id", verifyToken, async (req, res) => {
  try {
    const messId = req.params.id;

    console.log("Deleting mess with ID:", messId);

    const user = await User.findById(req.user.id);
    if (!user || user.role !== "manager" || String(user.mess) !== messId) {
      return res
        .status(403)
        .json({ message: "Not authorized to delete this mess" });
    }

    await Mess.findByIdAndDelete(messId);

    await User.updateMany(
      { mess: messId },
      { $unset: { mess: "", mealStats: "" } }
    );

    res.json({ message: "Mess deleted successfully" });
  } catch (err) {
    console.error("Failed to delete mess:", err);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
