const mongoose = require("mongoose");

require('dotenv').config();


const mongodbURI = process.env.MONGO_URI;

const connectDB = async () => {
  try {
    await mongoose.connect(mongodbURI);
    console.log("Mongodb Connected");
  } catch (error) {
    console.log("Mongodb connection failed", error);
  }
};
module.exports = connectDB;
