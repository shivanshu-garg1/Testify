const mongoose = require("mongoose");

const mongodbURI = "mongodb+srv://User:R16DNJyCLUmTNkk3@cluster0.5hooluh.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

const connectDB = async () => {
  try {
    await mongoose.connect(mongodbURI);
    console.log("Mongodb Connected");
  } catch (error) {
    console.log("Mongodb connection failed", error);
  }
};
module.exports = connectDB;
