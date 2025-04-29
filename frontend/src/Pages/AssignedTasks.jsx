import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function AssignedTask() {
  const [tests, setTests] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const studentEmail = localStorage.getItem("email");

  useEffect(() => {
    fetchPublishedTests();
  }, []);
  const token = localStorage.getItem("token");
  const fetchPublishedTests = async () => {
    try {
      const response = await fetch(
        "http://localhost:3000/api/tests/student/see-published-tests",
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (!response.ok) throw new Error("Failed to fetch tests");
      const data = await response.json();
      setTests(data);
    } catch (error) {
      console.error("Error fetching tests:", error);
    } finally {
      setLoading(false);
    }
  };

  const startTest = async (testId) => {
    const studentId = localStorage.getItem("studentId");

    try {
      if (!studentEmail) {
        alert("Student email not found. Please log in again.");
        return;
      }

      const response = await fetch(
        "http://localhost:3000/api/tests/start-test",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ testId,studentId }), 
        }
      );

      const data = await response.json();
      console.log(data);
      if (response.ok) {
        alert("Test Started Successfully!");
        navigate(`/test/${testId}`);
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.error("Error starting test:", error);
      alert("Failed to start test. Please try again.");
    }
  };

  return (
    <div className="min-h-screen p-6 bg-purple-50">
      <div className="container max-w-screen-lg mx-auto">
        <h2 className="text-2xl font-bold text-purple-600 mb-4">
          Assigned Tasks
        </h2>

        {loading ? (
          <p className="text-gray-600">Loading...</p>
        ) : tests.length === 0 ? (
          <p className="text-gray-500">No published tests available.</p>
        ) : (
          tests.map((test) => (
            <div
              key={test._id}
              className="border border-purple-600 p-4 rounded-lg mb-4 shadow-md bg-white"
            >
              <h3 className="text-lg font-semibold">{test.testTitle}</h3>
              <p>
                <strong>Subject:</strong> {test.subject}
              </p>
              <p>
                <strong>Date:</strong>{" "}
                {new Date(test.date).toLocaleDateString()}
              </p>
              <p>
                <strong>Duration:</strong> {test.duration} mins
              </p>
              <p className="text-green-600 font-bold">Published</p>

              {test.testStarted ? (
                <p className="text-green-600 font-semibold mt-2 flex items-center gap-1">
                      ✅ Test Done  {" "}
                </p>
              ) : (
                <button
                  onClick={() => startTest(test._id)}
                  className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white font-semibold mt-2 border rounded p-2"
                >
                      Start Test  {" "}
                </button>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
}
