const express = require("express");
const Test = require("../models/Test.js");
const TestAttempt = require("../models/TestAttempt");
const authenticateToken = require("../middlewares/authMiddleware");

const router = express.Router();

router.post("/teacher/create-test", authenticateToken, async (req, res) => {
  try {
    const testsData = req.body.tests;
    const teacherId = req.user.id;
    if (!Array.isArray(testsData) || testsData.length === 0) {
      return res
        .status(400)
        .json({ error: "Invalid request, tests should be an array" });
    }

    const createdTests = await Test.insertMany(
      testsData.map((test) => ({
        ...test,
        published: false,
        createdBy: teacherId,
      }))
    );

    res.status(201).json({
      message: `${createdTests.length} tests created successfully!`,
      testIds: createdTests.map((test) => test._id),
    });
  } catch (error) {
    console.error("Error creating tests:", error);
    res.status(500).json({ error: error.message || "Internal Server Error" });
  }
});

router.patch("/teacher/publish-test", authenticateToken, async (req, res) => {
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

router.patch("/teacher/unPublish-test", authenticateToken, async (req, res) => {
  try {
    const { testId } = req.body;
    const updatedTest = await Test.findByIdAndUpdate(
      testId,
      { published: false },
      { new: true }
    );

    if (!updatedTest) return res.status(404).json({ error: "Test not found" });

    res.json({ message: "Test unpublished successfully!", updatedTest });
  } catch (error) {
    res.status(500).json({ error: "Error unpublishing test" });
  }
});

router.delete("/teacher/delete-test", authenticateToken, async (req, res) => {
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

router.get("/teacher/see-tests", authenticateToken, async (req, res) => {
  try {
    if (req.user.role !== "teacher") {
      return res
        .status(403)
        .json({ message: "Access denied. Only teachers can view this." });
    }

    const teacherId = req.user.id;
    const tests = await Test.find({ createdBy: teacherId });

    res.json({ tests });
  } catch (error) {
    console.error("Error fetching tests:", error);
    res.status(500).json({ message: "Server error" });
  }
});

router.get(
  "/student/see-published-tests",
  authenticateToken,
  async (req, res) => {
    try {
      const { role, batch } = req.user;

      if (role !== "student") {
        return res
          .status(403)
          .json({ message: "Only students can access this route" });
      }

      const publishedTests = await Test.find({ published: true, batch: batch });

      res.json(publishedTests);
    } catch (error) {
      console.error("Error fetching published tests:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  }
);

router.post("/start-test", authenticateToken, async (req, res) => {
  try {
    const { testId, studentId } = req.body;
    if (!testId || !studentId) {
      return res
        .status(400)
        .json({ message: "Test ID and Student ID are required" });
    }

    const test = await Test.findById(testId);
    if (!test) return res.status(404).json({ message: "Test not found" });

    const existingAttempt = await TestAttempt.findOne({ studentId, testId });
    if (existingAttempt) {
      return res.json({
        message: "Test already started",
        attemptId: existingAttempt._id,
      });
    }

    const attempt = new TestAttempt({
      testId,
      studentId,
      status: "ongoing",
    });

    await attempt.save();
    res.json({ message: "Test started successfully", attemptId: attempt._id });
  } catch (error) {
    console.error("Error starting test:", error);
    res
      .status(500)
      .json({ message: "Server error", error: error.message || error });
  }
});
router.get("/:testId", authenticateToken, async (req, res) => {
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
router.post("/submit-test", authenticateToken, async (req, res) => {
  try {
    const { testId, responses } = req.body;
    const studentId = req.user.id;

    // console.log("Received:", { testId, responses });
    // console.log(studentId);

    if (!testId || !Array.isArray(responses) || responses.length === 0) {
      return res.status(400).json({ error: "Invalid data" });
    }

    const attempt = new TestAttempt({
      testId,
      studentId,
      responses,
      endTime: new Date(),
      status: "completed",
    });

    await attempt.save();

    res
      .status(200)
      .json({ message: "Test submitted successfully", attemptId: attempt._id });
  } catch (err) {
    console.error("Error:", err);
    res.status(500).json({ error: "Server error" });
  }
});

const calculateScore = (responses, questions) => {
  let score = 0;
  questions.forEach((question, index) => {
    if (
      responses[index] &&
      responses[index].selectedAnswer === question.correctAnswer
    ) {
      score += 1;
    }
  });
  return score;
};

router.get("/teacher/view-submissions", authenticateToken, async (req, res) => {
  try {
    if (req.user.role !== "teacher") {
      return res.status(403).json({ message: "You are not authorized." });
    }

    const tests = await Test.find({ createdBy: req.user.id });

    if (!tests || tests.length === 0) {
      return res.status(404).json({ message: "No tests found." });
    }

    const testIdList = tests.map((test) => test._id);

    const submissions = await TestAttempt.find({
      testId: { $in: testIdList },
      status: { $ne: "ongoing" },
    })
      .populate("studentId", "name")
      .populate("testId", "testTitle questions")
      .exec();

    if (!submissions || submissions.length === 0) {
      return res.status(404).json({ message: "No submissions found." });
    }

    const formattedSubmissions = submissions.map((submission) => ({
      studentName: submission.studentId?.name || "Unknown",
      testTitle: submission.testId?.testTitle || "Untitled Test",
      score: calculateScore(
        submission.responses,
        submission.testId?.questions || []
      ),
      status: submission.status,
    }));

    res.json({ attempts: formattedSubmissions });
  } catch (error) {
    console.error("Error fetching submissions:", error);
    res.status(500).json({ message: "Server error. Please try again later." });
  }
});

router.delete(
  "/teacher/delete-test/:testTitle",
  authenticateToken,
  async (req, res) => {
    try {
      const { testTitle } = req.params;
      if (req.user.role !== "teacher") {
        return res.status(403).json({ message: "Unauthorized" });
      }

      const test = await Test.findOne({ testTitle, createdBy: req.user.id });
      if (!test) return res.status(404).json({ message: "Test not found" });

      await TestAttempt.deleteMany({ testId: test._id });

      res.json({ message: "Test and submissions deleted successfully" });
    } catch (error) {
      console.error("Delete error:", error);
      res.status(500).json({ message: "Server error" });
    }
  }
);

module.exports = router;
