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

mongoose.connect(process.env.MONGO_URI);

app.get("/", (req, res) => {
  res.send("Meal App API running");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
