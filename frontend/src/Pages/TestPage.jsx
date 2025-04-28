import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

export default function TestPage() {
  const { testId } = useParams();
  const navigate = useNavigate();
  const [test, setTest] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [timeLeft, setTimeLeft] = useState(0);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    enableFullScreen();
    fetchTestDetails();

    return () => {
      exitFullScreen();
    };
  }, []);

  const enableFullScreen = () => {
    if (document.documentElement.requestFullscreen) {
      document.documentElement.requestFullscreen();
    }
  };

  const exitFullScreen = () => {
    if (document.fullscreenElement && document.exitFullscreen) {
      document.exitFullscreen();
    }
  };
  const token = localStorage.getItem("token");  

  const fetchTestDetails = async () => {
    try {
      const response = await fetch(`http://localhost:3000/api/tests/${testId}`,{
        headers: {
          "Authorization": `Bearer ${token}`
        },
      });
      if (!response.ok) {
        throw new Error(`Error: ${response.status} - ${response.statusText}`);
      }
      const data = await response.json();
      setTest(data);
      setTimeLeft(parseInt(data.duration) * 60);
    } catch (error) {
      console.error("Error fetching test:", error);
      setError("Failed to fetch test details.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    let timer;
    if (!submitted && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    } else if (timeLeft === 0 && !submitted && test) {
      handleSubmit();
    }
    return () => clearInterval(timer);
  }, [timeLeft, submitted, test]);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? "0" : ""}${secs}`;
  };

  const handleAnswerSelect = (option) => {
    if (!submitted) {
      setAnswers({ ...answers, [currentQuestionIndex]: option });
    }
  };

  const handleNext = () => {
    if (!submitted && currentQuestionIndex < test.questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  const handlePrevious = () => {
    if (!submitted && currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  const handleSubmit = () => {
    setSubmitted(true);
    console.log("Submitting answers:", answers);
    alert("Test submitted successfully!");
    exitFullScreen(); // Exit fullscreen when the test is submitted
    setTimeout(() => navigate("/student/assigned-tests"), 2000);
  };

  if (loading) return <p className="text-center mt-10 text-lg">Loading test...</p>;
  if (error) return <p className="text-red-500 text-center mt-10">{error}</p>;

  const currentQuestion = test.questions[currentQuestionIndex];
  const progress = ((currentQuestionIndex + 1) / test.questions.length) * 100;

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 px-4">
      <div className="w-full max-w-2xl bg-white shadow-xl rounded-lg p-6 border">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-800">{test.testTitle}</h2>
          <p className="text-gray-500">{test.subject} • {test.duration} mins</p>
        </div>

        {!submitted && (
          <div className="mt-4 text-center text-lg font-semibold text-red-600">
            ⏳ Time Left: {formatTime(timeLeft)}
          </div>
        )}

        {submitted && (
          <div className="mt-4 text-center text-lg font-semibold text-green-600">
            ✅ Test Submitted Successfully!
          </div>
        )}

        <div className="mt-6 w-full bg-gray-200 rounded-full h-3">
          <div
            className="bg-blue-500 h-3 rounded-full transition-all"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
        <p className="text-sm text-gray-600 text-center mt-2">
          Question {currentQuestionIndex + 1} of {test.questions.length}
        </p>

        <div className="mt-6 bg-gray-50 p-6 rounded-lg border">
          <h3 className="text-lg font-semibold">{currentQuestion.question}</h3>
          <div className="mt-4 space-y-3">
            {currentQuestion.options.map((option, index) => (
              <button
                key={index}
                className={`block w-full text-left px-4 py-2 border rounded-lg transition-all ${
                  answers[currentQuestionIndex] === option
                    ? "bg-blue-500 text-white border-blue-500"
                    : "bg-white text-gray-800 hover:bg-blue-100"
                } ${submitted ? "opacity-50 cursor-not-allowed" : ""}`}
                onClick={() => handleAnswerSelect(option)}
                disabled={submitted}
              >
                {option}
              </button>
            ))}
          </div>
        </div>

        <div className="mt-6 flex justify-between">
          <button
            className="px-4 py-2 rounded-lg font-medium transition-all bg-gray-400 text-white hover:bg-gray-500 disabled:opacity-50"
            disabled={currentQuestionIndex === 0 || submitted}
            onClick={handlePrevious}
          >
            Previous
          </button>

          {currentQuestionIndex === test.questions.length - 1 ? (
            <button
              className="px-4 py-2 rounded-lg font-medium transition-all bg-green-500 text-white hover:bg-green-600 disabled:opacity-50"
              onClick={handleSubmit}
              disabled={submitted}
            >
              Submit
            </button>
          ) : (
            <button
              className="px-4 py-2 rounded-lg font-medium transition-all bg-blue-500 text-white hover:bg-blue-600 disabled:opacity-50"
              onClick={handleNext}
              disabled={submitted}
            >
              Next
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
