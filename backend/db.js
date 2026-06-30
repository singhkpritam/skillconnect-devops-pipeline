
const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Database connect ho gya hai");
  } catch (error) {
    console.log("DB connection failed ho rha hai");
    console.log(error);
  }
};

module.exports = connectDB;
