const express = require("express");
const Test = require("../models/Test.js");

const router = express.Router();

// Route to create a new test
router.post("/teacher/create-test", async (req, res) => {
  try {
    const { testTitle, subject, date, duration, questions } = req.body;

    if (!testTitle || !subject || !date || !duration || !Array.isArray(questions) || questions.length === 0) {
      return res.status(400).json({ error: "All fields, including at least one question, are required" });
    }

    const newTest = new Test({ testTitle, subject, date, duration, questions });
    await newTest.save();

    res.status(201).json({ message: "Test created successfully!", testId: newTest._id });
  } catch (error) {
    console.error("Error creating test:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;
