const express = require("express");
const Test = require("../models/Test.js");
const TestAttempt = require("../models/TestAttempt");

const router = express.Router();

// ✅ Create multiple tests
router.post("/teacher/create-test", async (req, res) => {
  try {
    const testsData = req.body.tests;
    if (!Array.isArray(testsData) || testsData.length === 0) {
      return res.status(400).json({ error: "Invalid request, tests should be an array" });
    }

    const createdTests = await Test.insertMany(
      testsData.map(test => ({ ...test, published: false }))
    );

    res.status(201).json({
      message: `${createdTests.length} tests created successfully!`,
      testIds: createdTests.map(test => test._id),
    });
  } catch (error) {
    console.error("Error creating tests:", error);
    res.status(500).json({ error: error.message || "Internal Server Error" });
  }
});

// ✅ Publish a test
router.patch("/teacher/publish-test", async (req, res) => {
  try {
    const { testId } = req.body;
    if (!testId) {
      return res.status(400).json({ error: "Test ID is required" });
    }

    const updatedTest = await Test.findByIdAndUpdate(
      testId,
      { published: true },
      { new: true, runValidators: true }
    );

    if (!updatedTest) {
      return res.status(404).json({ error: "Test not found" });
    }

    res.json({ message: "Test published successfully!", updatedTest });
  } catch (error) {
    console.error("Error publishing test:", error);
    res.status(500).json({ error: error.message || "Error publishing test" });
  }
});

// ✅ Unpublish a test (Fixed)
router.patch("/teacher/unPublish-test", async (req, res) => {
  try {
    const { testId } = req.body;
    const updatedTest = await Test.findByIdAndUpdate(testId, { published: false }, { new: true });

    if (!updatedTest) return res.status(404).json({ error: "Test not found" });

    res.json({ message: "Test unpublished successfully!", updatedTest });
  } catch (error) {
    res.status(500).json({ error: "Error unpublishing test" });
  }
});


// ✅ Delete a test (using DELETE instead of POST)
router.delete("/teacher/delete-test", async (req, res) => {
  try {
    const { testId } = req.body;
    if (!testId) {
      return res.status(400).json({ error: "Test ID is required" });
    }

    const deletedTest = await Test.findByIdAndDelete(testId);
    if (!deletedTest) {
      return res.status(404).json({ error: "Test not found" });
    }

    res.json({ message: "Test deleted successfully!" });
  } catch (error) {
    console.error("Error deleting test:", error);
    res.status(500).json({ error: error.message || "Internal Server Error" });
  }
});

// ✅ Fetch all tests (for teacher)
router.get("/teacher/see-tests", async (req, res) => {
  try {
    const tests = await Test.find();
    res.json(tests);
  } catch (error) {
    console.error("Error fetching tests:", error);
    res.status(500).json({ error: error.message || "Failed to fetch tests." });
  }
});

// ✅ Fetch published tests (for students)
router.get("/student/see-published-tests", async (req, res) => {
  try {
    const publishedTests = await Test.find({ published: true });
    res.json(publishedTests);
  } catch (error) {
    console.error("Error fetching published tests:", error);
    res.status(500).json({ error: error.message || "Error fetching tests" });
  }
});

// ✅ Start a test attempt
router.post("/start-test", async (req, res) => {
  try {
    const { testId, studentId } = req.body;
    if (!testId || !studentId) {
      return res.status(400).json({ message: "Test ID and Student ID are required" });
    }

    // Check if the test exists
    const test = await Test.findById(testId);
    if (!test) return res.status(404).json({ message: "Test not found" });

    // Check if the student has already started the test
    const existingAttempt = await TestAttempt.findOne({ studentId, testId });
    if (existingAttempt) {
      return res.json({ message: "Test already started", attemptId: existingAttempt._id });
    }

    // Create new attempt
    const attempt = new TestAttempt({
      testId,
      studentId,
      status: "ongoing",
    });

    await attempt.save();
    res.json({ message: "Test started successfully", attemptId: attempt._id });
  } catch (error) {
    console.error("Error starting test:", error);
    res.status(500).json({ message: "Server error", error: error.message || error });
  }
});
router.get("/:testId", async (req, res) => {
  try {
    const test = await Test.findById(req.params.testId);

    if (!test) {
      return res.status(404).json({ error: "Test not found" });
    }

    res.json(test);
  } catch (error) {
    console.error("Server Error:", error);
    res.status(500).json({ error: "Server error" });
  }
});
router.post("/submit-test", async (req, res) => {
  try {
    const { attemptId } = req.body;
    if (!attemptId) {
      return res.status(400).json({ error: "Attempt ID is required" });
    }

    const attempt = await TestAttempt.findByIdAndUpdate(
      attemptId,
      { status: "done" }, // ✅ Mark test as done
      { new: true, runValidators: true }
    );

    if (!attempt) {
      return res.status(404).json({ error: "Test attempt not found" });
    }

    res.json({ message: "Test submitted successfully!", updatedAttempt: attempt });
  } catch (error) {
    console.error("Error submitting test:", error);
    res.status(500).json({ error: error.message || "Server error" });
  }
});

module.exports = router;
