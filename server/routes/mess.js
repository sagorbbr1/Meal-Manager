const express = require("express");
const router = express.Router();
const Mess = require("../models/Mess");
const verifyToken = require("../middlewares/authMiddleware");

router.post("/create", verifyToken, async (req, res) => {
  try {
    const { name, month } = req.body;

    const newMess = new Mess({
      name,
      month,
      createdBy: req.user.id,
    });

    await newMess.save();
    res.status(201).json({ message: "Mess created", mess: newMess });
  } catch (err) {
    console.error("Mess create error:", err);
    res.status(500).json({ message: "Server error" });
  }
});
router.get("/mine", verifyToken, async (req, res) => {
  const mess = await Mess.findOne({ createdBy: req.user.id });
  res.json({ mess });
});

module.exports = router;
