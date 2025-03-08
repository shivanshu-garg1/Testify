import { useState } from "react";

export default function Createtest() {
  const [testDetails, setTestDetails] = useState({
    testTitle: "",
    subject: "",
    date: "",
    duration: "",
  });

  const [questions, setQuestions] = useState([]);

  // Handles input change for test details
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setTestDetails((prev) => ({ ...prev, [name]: value }));
  };

  // Adds a new question to the questions array
  const addQuestion = () => {
    setQuestions((prevQuestions) => [
      ...prevQuestions,
      { question: "", options: ["", "", "", ""], correctAnswer: "" },
    ]);
  };

  // Updates the question text
  const updateQuestion = (index, value) => {
    setQuestions((prevQuestions) =>
      prevQuestions.map((q, i) =>
        i === index ? { ...q, question: value } : q
      )
    );
  };

  // Updates the text of a specific option
  const updateOptionText = (qIndex, oIndex, value) => {
    setQuestions((prevQuestions) =>
      prevQuestions.map((q, i) =>
        i === qIndex
          ? {
              ...q,
              options: q.options.map((opt, j) =>
                j === oIndex ? value : opt
              ),
            }
          : q
      )
    );
  };

  // Updates the correct answer selection
  const updateCorrectAnswer = (qIndex, value) => {
    setQuestions((prevQuestions) =>
      prevQuestions.map((q, i) =>
        i === qIndex ? { ...q, correctAnswer: value } : q
      )
    );
  };

  // Removes a question
  const removeQuestion = (index) => {
    setQuestions((prevQuestions) => prevQuestions.filter((_, i) => i !== index));
  };

  // Submit function
  const handleSubmit = async () => {
    console.log("Final Questions:", questions); // Debugging log
    try {
      const response = await fetch("http://localhost:3000/api/tests/teacher/create-test", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...testDetails, questions }),
      });

      const data = await response.json();
      if (response.ok) {
        alert("Test Created Successfully!");
      } else {
        alert(data.error || "Failed to create test.");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Something went wrong.");
    }
  };

  return (
    <div className="min-h-screen p-6 flex items-center justify-center bg-purple-50">
      <div className="container max-w-screen-lg mx-auto">
        <div>
          <h2 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-indigo-600">
            Create / Edit Test
          </h2>
          <p className="text-purple-600 mb-6">Fill out the details below to create or modify a test.</p>

          <div className="bg-white rounded-lg shadow-md p-6 md:p-8 mb-6">
            <div className="grid gap-6 text-sm grid-cols-1 lg:grid-cols-3">
              <div>
                <p className="text-lg font-semibold bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-indigo-600">
                  Test Details
                </p>
                <p className="text-purple-600">Provide necessary information about the test.</p>
              </div>

              <div className="lg:col-span-2">
                <div className="grid gap-4 text-sm grid-cols-1 md:grid-cols-5">
                  <div className="md:col-span-5">
                    <label className="text-purple-600 font-semibold">Test Title</label>
                    <input
                      type="text"
                      name="testTitle"
                      className="h-10 border border-purple-300 mt-1 rounded px-4 w-full bg-purple-50"
                      placeholder="Enter test title"
                      value={testDetails.testTitle}
                      onChange={handleInputChange}
                    />
                  </div>

                  <div className="md:col-span-3">
                    <label className="text-purple-600 font-semibold">Subject</label>
                    <input
                      type="text"
                      name="subject"
                      className="h-10 border border-purple-300 mt-1 rounded px-4 w-full bg-purple-50"
                      placeholder="Enter subject"
                      value={testDetails.subject}
                      onChange={handleInputChange}
                    />
                  </div>

                  <div className="md:col-span-2">
                    <label className="text-purple-600 font-semibold">Date</label>
                    <input
                      type="date"
                      name="date"
                      className="h-10 border border-purple-300 mt-1 rounded px-4 w-full bg-purple-50"
                      value={testDetails.date}
                      onChange={handleInputChange}
                    />
                  </div>

                  <div className="md:col-span-3">
                    <label className="text-purple-600 font-semibold">Duration (mins)</label>
                    <input
                      type="number"
                      name="duration"
                      className="h-10 border border-purple-300 mt-1 rounded px-4 w-full bg-purple-50"
                      placeholder="Enter duration"
                      value={testDetails.duration}
                      onChange={handleInputChange}
                    />
                  </div>

                  <div className="md:col-span-5">
                    <h3 className="text-xl font-semibold text-purple-600 mt-4">
                      Multiple-Choice Questions
                    </h3>

                    {questions.map((q, qIndex) => (
                      <div key={qIndex} className="border p-4 rounded-lg bg-gray-50 mb-4">
                        <label className="text-purple-600 font-semibold">
                          Question {qIndex + 1}
                        </label>
                        <input
                          type="text"
                          className="h-10 border border-purple-300 mt-1 rounded px-4 w-full bg-white"
                          placeholder="Enter question"
                          value={q.question}
                          onChange={(e) => updateQuestion(qIndex, e.target.value)}
                        />

                        <div className="grid grid-cols-2 gap-4 mt-2">
                          {q.options.map((option, oIndex) => (
                            <div key={oIndex}>
                              <input
                                type="text"
                                className="h-10 border border-purple-300 mt-1 rounded px-4 w-full bg-white"
                                placeholder={`Option ${oIndex + 1}`}
                                value={option}
                                onChange={(e) => updateOptionText(qIndex, oIndex, e.target.value)}
                              />
                            </div>
                          ))}
                        </div>

                        <label className="block mt-2 text-purple-600 font-semibold">
                          Correct Answer
                        </label>
                        <select
                          className="h-10 border border-purple-300 rounded px-4 w-full bg-white"
                          value={q.correctAnswer}
                          onChange={(e) => updateCorrectAnswer(qIndex, e.target.value)}
                        >
                          <option value="">Select Correct Answer</option>
                          {q.options.map((option, oIndex) => (
                            <option key={oIndex} value={option}>
                              {option}
                            </option>
                          ))}
                        </select>

                        <button className="text-red-500 mt-2" onClick={() => removeQuestion(qIndex)}>
                          Remove Question
                        </button>
                      </div>
                    ))}

                    <button className="bg-purple-600 text-white px-4 py-2 rounded mt-4" onClick={addQuestion}>
                      + Add Question
                    </button>
                  </div>

                  <div className="md:col-span-5 text-right">
                    <button className="bg-purple-600 text-white px-6 py-2 rounded-lg shadow-md transition-all" onClick={handleSubmit}>
                      Save Test
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
