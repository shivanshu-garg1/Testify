const mongoose = require("mongoose");

const mongodbURI = "mongodb://localhost:27017/User";

const connectDB = async () => {
  try {
    await mongoose.connect(mongodbURI);
    console.log("Mongodb Connected");
  } catch (error) {
    console.log("Mongodb connection failed", error);
  }
};
module.exports = connectDB;
