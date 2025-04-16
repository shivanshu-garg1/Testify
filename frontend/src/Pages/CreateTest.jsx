import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function CreateTest() {
  const [testDetails, setTestDetails] = useState({
    testTitle: "",
    subject: "",
    date: "",
    duration: "",
    batch: "", // Added batch field
  });

  const [questions, setQuestions] = useState([]);
  const [file, setFile] = useState(null);

  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setTestDetails((prev) => ({ ...prev, [name]: value }));
  };

  const addQuestion = () => {
    setQuestions((prev) => [
      ...prev,
      { question: "", options: ["", "", "", ""], correctAnswer: "" },
    ]);
  };

  const updateQuestion = (index, value) => {
    setQuestions((prev) =>
      prev.map((q, i) => (i === index ? { ...q, question: value } : q))
    );
  };

  const updateOptionText = (qIndex, oIndex, value) => {
    setQuestions((prev) =>
      prev.map((q, i) =>
        i === qIndex
          ? {
              ...q,
              options: q.options.map((opt, j) => (j === oIndex ? value : opt)),
            }
          : q
      )
    );
  };

  const updateCorrectAnswer = (qIndex, value) => {
    setQuestions((prev) =>
      prev.map((q, i) => (i === qIndex ? { ...q, correctAnswer: value } : q))
    );
  };

  const removeQuestion = (index) => {
    setQuestions((prev) => prev.filter((_, i) => i !== index));
  };

  const handleFileChange = (e) => {
    const uploadedFile = e.target.files[0];
    setFile(uploadedFile);

    if (uploadedFile?.type === "application/json") {
      const reader = new FileReader();
      reader.onload = (event) => {
        try {
          const json = JSON.parse(event.target.result);
          if (Array.isArray(json)) {
            setQuestions((prev) => [...prev, ...json]);
          } else {
            alert("JSON must be an array of questions.");
          }
        } catch (err) {
          alert("Invalid JSON file.");
        }
      };
      reader.readAsText(uploadedFile);
    } else if (uploadedFile?.type === "application/pdf") {
      alert(
        "PDF parsing not yet implemented. Please upload a JSON file for now."
      );
    } else {
      alert("Unsupported file type. Please upload a JSON or PDF file.");
    }
  };

  const handleSubmit = async () => {
    try {
      const response = await fetch(
        "http://localhost:3000/api/tests/teacher/create-test",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ tests: [{ ...testDetails, questions }] }),
        }
      );

      const data = await response.json();
      if (response.ok) {
        alert(`${data.message}`);
        navigate("/teacher/see-test");
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
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-bold text-purple-600 mb-2">
            Create Test
          </h2>

          <div className="grid gap-4 grid-cols-1 md:grid-cols-2">
            <input
              type="text"
              name="testTitle"
              placeholder="Test Title"
              className="border border-purple-600 p-2 rounded"
              value={testDetails.testTitle}
              onChange={handleInputChange}
            />

            <input
              type="text"
              name="subject"
              placeholder="Subject"
              className="border border-purple-600 p-2 rounded"
              value={testDetails.subject}
              onChange={handleInputChange}
            />

            <input
              type="date"
              name="date"
              className="border border-purple-600 p-2 rounded"
              value={testDetails.date}
              onChange={handleInputChange}
            />

            <input
              type="number"
              name="duration"
              placeholder="Duration (mins)"
              className="border border-purple-600 p-2 rounded"
              value={testDetails.duration}
              onChange={handleInputChange}
            />

            {/* Batch Selection */}
            <select
              name="batch"
              className="border border-purple-600 p-2 rounded"
              value={testDetails.batch}
              onChange={handleInputChange}
            >
              <option value="">Select Batch</option>
              <option value="2025">2025</option>
              <option value="2024">2024</option>
              <option value="2023">2023</option>
              <option value="2022">2022</option>
              <option value="2021">2021</option>
            </select>
          </div>

          <div className="mt-4">
            <label className="block font-semibold text-purple-600 mb-2">
              Upload Questions File (.json)
            </label>
            <input
              type="file"
              accept=".json,application/pdf"
              onChange={handleFileChange}
              className="p-2 border border-purple-600 rounded"
            />
          </div>

          <h3 className="text-xl font-semibold text-purple-600 mt-6">
            Questions
          </h3>

          {questions.map((q, qIndex) => (
            <div
              key={qIndex}
              className="border border-purple-600 p-4 rounded-lg mb-4"
            >
              <input
                type="text"
                placeholder="Enter question"
                className="border border-purple-600 p-2 w-full rounded"
                value={q.question}
                onChange={(e) => updateQuestion(qIndex, e.target.value)}
              />

              <div className="grid grid-cols-2 gap-2 mt-2">
                {q.options.map((option, oIndex) => (
                  <input
                    key={oIndex}
                    type="text"
                    placeholder={`Option ${oIndex + 1}`}
                    className="border border-purple-600 p-2 rounded"
                    value={option}
                    onChange={(e) =>
                      updateOptionText(qIndex, oIndex, e.target.value)
                    }
                  />
                ))}
              </div>

              <select
                className="border border-purple-600 p-2 mt-2 w-full rounded"
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

              <button
                className="text-red-500 mt-2"
                onClick={() => removeQuestion(qIndex)}
              >
                Remove Question
              </button>
            </div>
          ))}

          <button
            className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-semibold px-4 py-2 rounded mt-4"
            onClick={addQuestion}
          >
            + Add Question
          </button>

          <div className="mt-4 flex gap-4">
            <button
              className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-semibold px-6 py-2 rounded"
              onClick={handleSubmit}
            >
              Save Test
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
