const mongoose = require("mongoose");

const TestAttemptSchema = new mongoose.Schema({
  testId: { type: mongoose.Schema.Types.ObjectId, ref: "Test" },
  studentId: { type: String, required: true },
  startTime: { type: Date, default: Date.now },
  endTime: Date,
  status: { type: String, enum: ["ongoing", "completed"], default: "ongoing" },
  responses: [
    {
      questionId: mongoose.Schema.Types.ObjectId,
      selectedAnswer: String,
    },
  ],
});

module.exports = mongoose.model("TestAttempt", TestAttemptSchema);
