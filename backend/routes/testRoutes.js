const express = require("express");
const Test = require("../models/Test.js");

const router = express.Router();

// Create test
// Create multiple tests
router.post("/teacher/create-test", async (req, res) => {
  try {
    const testsData = req.body.tests; // Expecting an array of test objects

    if (!Array.isArray(testsData) || testsData.length === 0) {
      return res.status(400).json({ error: "Invalid request, tests should be an array" });
    }

    const createdTests = await Test.insertMany(testsData.map(test => ({ ...test, published: false })));

    res.status(201).json({
      message: `${createdTests.length} tests created successfully!`,
      testIds: createdTests.map(test => test._id),
    });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});


// Publish test
// Publish test
router.post("/teacher/publish-test", async (req, res) => {
  try {
    const { testId } = req.body; // Extract testId from request body

    if (!testId) {
      return res.status(400).json({ error: "Test ID is required" });
    }

    const updatedTest = await Test.findByIdAndUpdate(testId, { published: true }, { new: true });

    if (!updatedTest) {
      return res.status(404).json({ error: "Test not found" });
    }

    res.json({ message: "Test published successfully!", updatedTest });
  } catch (error) {
    console.error("Error publishing test:", error);
    res.status(500).json({ error: "Error publishing test" });
  }
});


router.get("/teacher/see-test", async (req, res) => {
  try {
    const tests = await Test.find(); // Fetch all tests from MongoDB
    res.json(tests);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch tests." });
  }
});


module.exports = router;
