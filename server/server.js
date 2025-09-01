const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const path = require("path");

// ✅ Load environment variables FIRST
dotenv.config();

// ✅ Import DB connection AFTER dotenv.config()
const connectDB = require("./config/db");

// Import routes
const authRoutes = require("./routes/authRoutes");
const messRoutes = require("./routes/mess");
const userRoutes = require("./routes/users");
const depositRoutes = require("./routes/deposit");
const costRoutes = require("./routes/cost");

const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(
  cors({
    origin: "http://localhost:5173", // adjust for frontend URL
    credentials: true,
  })
);

app.use(bodyParser.json());
app.use(cookieParser());

// ✅ Connect to MongoDB
connectDB();

// Test route
app.get("/", (req, res) => {
  res.send("Meal App API running 🚀");
});

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/mess", messRoutes);
app.use("/api/users", userRoutes);
app.use("/api/deposit", depositRoutes);
app.use("/api/costs", costRoutes);

// Start server
app.listen(port, () => {
  console.log(`🔥 Server running on :${port}`);
});
