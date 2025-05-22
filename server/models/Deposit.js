const mongoose = require("mongoose");

const depositSchema = new mongoose.Schema(
  {
    member: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    date: {
      type: Date,
      required: true,
    },
    amount: {
      type: Number,
      required: true,
    },
    note: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Deposit", depositSchema);
