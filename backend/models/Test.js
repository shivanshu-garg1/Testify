const mongoose = require("mongoose");

const testSchema = new mongoose.Schema({
  testTitle: { type: String, required: true },
  subject: { type: String, required: true },
  date: { type: String, required: true },
  duration: { type: String, required: true },
  questions: [
    {
      question: { type: String, required: true },
      options: { type: [String], required: true },
      correctAnswer: { type: String, required: true },
    },
  ],
  published: { type: Boolean, default: false }, // New field for publishing
});

const Test = mongoose.model("Test", testSchema);
module.exports = Test;
