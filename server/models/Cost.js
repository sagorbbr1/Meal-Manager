const mongoose = require("mongoose");

const costSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    date: { type: Date, required: true },
    amount: { type: Number, required: true },
    note: { type: String },
    mess: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Mess",
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Cost", costSchema);
