const mongoose = require("mongoose");
const messSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    month: { type: String, required: true },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Mess", messSchema);
