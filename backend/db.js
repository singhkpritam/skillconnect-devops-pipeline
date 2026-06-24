
const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Database connected");
  } catch (error) {
    console.log("DB connection failed");
    // console.log(error);IMPORTANT
  }
};

module.exports = connectDB;