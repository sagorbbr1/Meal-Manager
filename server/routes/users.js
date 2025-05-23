const express = require("express");
const verifyToken = require("../middlewares/authMiddleware");
const User = require("../models/User");
const Cost = require("../models/Cost");
const router = express.Router();
const mongoose = require("mongoose");

router.post("/add-member", verifyToken, async (req, res) => {
  const managerId = req.user.id;
  const { name, email } = req.body;

  const manager = await User.findById(managerId);
  if (!manager.mess) {
    return res.status(400).json({ message: "Manager has no mess" });
  }

  const existingUser = await User.findOne({ email });

  if (existingUser) {
    return res
      .status(400)
      .json({ message: "User with this email already exists" });
  }

  const newUser = new User({
    name,
    email,
    password: "default123",
    mess: manager.mess,
    role: "member",
  });

  await newUser.save();

  res.status(201).json({ message: "Member added", user: newUser });
});
router.get("/my-members", verifyToken, async (req, res) => {
  try {
    const currentUser = await User.findById(req.user.id);
    if (!currentUser || !currentUser.mess) {
      return res
        .status(403)
        .json({ message: "User does not belong to any mess" });
    }

    const members = await User.find({ mess: currentUser.mess });

    let totalCost = 0;
    let totalMeals = 0;

    members.forEach((member) => {
      totalCost += Number(member.mealStats?.totalDeposit || 0);
      totalMeals += Number(member.mealStats?.totalMeal || 0);
    });

    const mealRate = totalMeals > 0 ? totalCost / totalMeals : 0;

    const formattedMembers = members.map((member) => {
      const stats = member.mealStats || {};
      const totalMeal = Number(stats.totalMeal || 0);
      const totalDeposit = Number(stats.totalDeposit || 0);
      const mealCost = Number((mealRate * totalMeal).toFixed(2));
      const balance = Number((totalDeposit - mealCost).toFixed(2));

      return {
        id: member._id,
        name: member.name,
        email: member.email,
        joined: member.createdAt,
        avatar: `https://i.pravatar.cc/150?u=${member._id}`,
        mealStats: {
          totalMeal,
          totalDeposit,
          mealCost,
          balance,
        },
      };
    });

    res.json({ members: formattedMembers, mealRate: mealRate.toFixed(2) });
  } catch (err) {
    console.error("Error fetching members:", err);
    res.status(500).json({ message: "Server error" });
  }
});

router.patch("/:userId/meal", verifyToken, async (req, res) => {
  const { userId } = req.params;
  const { delta } = req.body;

  if (!mongoose.Types.ObjectId.isValid(userId)) {
    return res.status(400).json({ message: "Invalid userId format" });
  }

  if (typeof delta !== "number") {
    return res.status(400).json({ message: "Invalid delta value" });
  }

  try {
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    user.mealStats.totalMeal = Math.max(
      0,
      (user.mealStats.totalMeal || 0) + delta
    );

    await user.save();

    res.json({ mealStats: user.mealStats });
  } catch (err) {
    console.error("Error updating meal count:", err);
    res.status(500).json({ message: "Server error" });
  }
});

router.get("/my-stats", verifyToken, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).populate("mess");
    if (!user) return res.status(404).json({ message: "User not found" });

    const messId = user.mess?._id;
    if (!messId)
      return res.status(400).json({ message: "User has no mess assigned" });

    const totalCostResult = await Cost.aggregate([
      { $match: { mess: new mongoose.Types.ObjectId(messId) } },
      { $group: { _id: null, total: { $sum: "$amount" } } },
    ]);

    const totalMessCost = totalCostResult[0]?.total || 0;

    const allUsers = await User.find({ mess: messId });
    const totalMealCount = allUsers.reduce(
      (acc, u) => acc + (u.mealStats?.totalMeal || 0),
      0
    );

    const mealRate = totalMealCount > 0 ? totalMessCost / totalMealCount : 0;

    const userMealCount = user.mealStats?.totalMeal || 0;
    const userCost = userMealCount * mealRate;

    const userDeposit = user.mealStats?.totalDeposit || 0;
    const userBalance = userDeposit - userCost;

    res.json({
      totalMeal: userMealCount,
      totalDeposit: userDeposit,
      totalCost: userCost,
      balance: userBalance,
      mealRate,
    });
  } catch (err) {
    console.error("Error fetching user stats:", err);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
