const express = require("express");
const verifyToken = require("../middlewares/authMiddleware");
const User = require("../models/User");
const router = express.Router();

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
      return res.status(403).json({ message: "No mess found for this user" });
    }

    const members = await User.find({ mess: currentUser.mess }).select(
      "name email createdAt"
    );

    const formattedMembers = members.map((member) => ({
      id: member._id,
      name: member.name,
      email: member.email,
      joined: member.createdAt,
      avatar: `https://i.pravatar.cc/150?u=${member._id}`,
    }));

    res.json({ members: formattedMembers });
  } catch (err) {
    console.error("Error fetching members:", err);
    res.status(500).json({ message: "Server error" });
  }
});
module.exports = router;
