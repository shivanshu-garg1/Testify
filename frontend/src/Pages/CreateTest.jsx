import { useState } from "react";
import {useNavigate} from 'react-router-dom';

export default function CreateTest() {
  const [testDetails, setTestDetails] = useState({
    testTitle: "",
    subject: "",
    date: "",
    duration: "",
  });

  const [questions, setQuestions] = useState([]);

  const navigate = useNavigate();

  // Handles input change for test details
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setTestDetails((prev) => ({ ...prev, [name]: value }));
  };

  // Adds a new question
  const addQuestion = () => {
    setQuestions((prev) => [
      ...prev,
      { question: "", options: ["", "", "", ""], correctAnswer: "" },
    ]);
  };

  // Updates question text
  const updateQuestion = (index, value) => {
    setQuestions((prev) =>
      prev.map((q, i) => (i === index ? { ...q, question: value } : q))
    );
  };

  // Updates option text
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

  // Updates correct answer selection
  const updateCorrectAnswer = (qIndex, value) => {
    setQuestions((prev) =>
      prev.map((q, i) =>
        i === qIndex ? { ...q, correctAnswer: value } : q
      )
    );
  };

  // Removes a question
  const removeQuestion = (index) => {
    setQuestions((prev) => prev.filter((_, i) => i !== index));
  };

  // Save the test without publishing
  const handleSubmit = async () => {
    try {
      const response = await fetch("http://localhost:3000/api/tests/teacher/create-test", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ tests: [{ ...testDetails, questions }] }), // Wrap in an array
      });
  
      const data = await response.json();
      if (response.ok) {
        alert(`${data.message}`);
        navigate('/teacher/see-test')
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
          <h2 className="text-2xl font-bold text-purple-600">Create / Edit Test</h2>

          <div className="grid gap-4 grid-cols-1 md:grid-cols-2">
            <input
              type="text"
              name="testTitle"
              placeholder="Test Title"
              className="border border-purple-600  p-2 rounded"
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
          </div>

          <h3 className="text-xl font-semibold text-purple-600 mt-6">Questions</h3>

          {questions.map((q, qIndex) => (
            <div key={qIndex} className="border border-purple-600 p-4 rounded-lg  mb-4">
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
                    onChange={(e) => updateOptionText(qIndex, oIndex, e.target.value)}
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

              <button className="text-red-500 mt-2" onClick={() => removeQuestion(qIndex)}>
                Remove Question
              </button>
            </div>
          ))}

          <button className=" bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-semibold  px-4 py-2 rounded mt-4" onClick={addQuestion}>
            + Add Question
          </button>

          <div className="mt-4 flex gap-4">
            <button className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-semibold px-6 py-2 rounded" onClick={handleSubmit}>
              Save Test
            </button>
            
          </div>
        </div>
      </div>
    </div>
  );
}
