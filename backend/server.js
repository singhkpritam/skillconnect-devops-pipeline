const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

const connectDB = require("./db");
const skillRoutes = require("./routes/skillroutes");

dotenv.config();
connectDB();

const app = express();

app.use(cors());
app.use(express.json());

// routes mount
app.use("/api/skills", skillRoutes);

app.listen(5000, () => {
  console.log("Server running on port 5000");
});