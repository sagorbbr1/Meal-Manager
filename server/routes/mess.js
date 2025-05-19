const express = require("express");
const router = express.Router();
const Mess = require("../models/Mess");
const verifyToken = require("../middlewares/authMiddleware");

router.post("/create", verifyToken, async (req, res) => {
  try {
    const { name, month, role } = req.body;

    if (!name || !month || !role) {
      return res.status(400).json({ error: "All fields are required" });
    }

    const mess = new Mess({
      name,
      month,
      role,
      createdBy: req.user.id, // user comes from verifyToken middleware
    });

    await mess.save();

    res.status(201).json({ message: "Mess created", mess });
  } catch (error) {
    console.error("Mess create error:", error);
    res.status(500).json({ error: "Something went wrong" });
  }
});

router.get("/mine", verifyToken, async (req, res) => {
  const mess = await Mess.findOne({ createdBy: req.user.id });
  res.json({ mess });
});

module.exports = router;
