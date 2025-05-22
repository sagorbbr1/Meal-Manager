const express = require("express");
const app = express();
const port = 5000;

const cors = require("cors");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const path = require("path");
const connectDB = require("./config/db");
const authRoutes = require("./routes/authRoutes");
const messRoutes = require("./routes/mess");
const userRoutes = require("./routes/users");
const depositRoutes = require("./routes/deposit");
const costRoutes = require("./routes/cost");

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.use(bodyParser.json());
app.use(cookieParser());

connectDB();

app.get("/", (req, res) => {
  res.send("Meal App API running");
});

app.use("/api/auth", authRoutes);
app.use("/api/mess", messRoutes);
app.use("/api/users", userRoutes);
app.use("/api/deposit", depositRoutes);
app.use("/api/costs", costRoutes);

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
