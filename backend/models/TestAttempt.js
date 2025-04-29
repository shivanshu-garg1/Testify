const mongoose = require("mongoose");

const TestAttemptSchema = new mongoose.Schema({
  testId: { type: mongoose.Schema.Types.ObjectId, ref: "Test", required: true },
  studentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  }, // Change to ObjectId and reference User model
  startTime: { type: Date, default: Date.now },
  endTime: Date,
  status: { type: String, enum: ["ongoing", "completed"], default: "ongoing" },
  responses: [
    {
      questionId: { type: mongoose.Schema.Types.ObjectId, required: true },
      selectedAnswer: { type: String, required: true },
    },
  ],
  testStarted: { type: Boolean },
});

module.exports = mongoose.model("TestAttempt", TestAttemptSchema);
