import { useEffect, useState } from "react";

export default function SeeTest() {
  const [tests, setTests] = useState([]);

  useEffect(() => {
    fetchTests();
  }, []);

  const fetchTests = async () => {
    try {
      const response = await fetch("http://localhost:3000/api/tests/teacher/see-test");
      const data = await response.json();
      setTests(data);
    } catch (error) {
      console.error("Error fetching tests:", error);
    }
  };

  // ✅ Define handlePublish inside SeeTest.jsx
  const handlePublish = async (testId) => {
    try {
      const response = await fetch("http://localhost:3000/api/tests/teacher/publish-test", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ testId }),
      });

      const data = await response.json();
      if (response.ok) {
        alert("Test Published Successfully!");
        fetchTests(); // Refresh the test list
      } else {
        alert(data.error || "Failed to publish test.");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Something went wrong.");
    }
  };

  return (
    <div className="min-h-screen p-6 bg-purple-50">
      <div className="container max-w-screen-lg mx-auto">
        <h2 className="text-2xl font-bold text-purple-600">All Tests</h2>

        {tests.length === 0 ? (
          <p>No tests available.</p>
        ) : (
          tests.map((test) => (
            <div key={test._id} className="border border-purple-600 p-4 rounded-lg mb-4">
              <h3 className="text-lg font-semibold">{test.testTitle}</h3>
              <p><strong>Subject:</strong> {test.subject}</p>
              <p><strong>Date:</strong> {test.date}</p>
              <p><strong>Duration:</strong> {test.duration} mins</p>
              <p><strong>Status:</strong> {test.published ? "Published ✅" : "Unpublished ❌"}</p>

              {!test.published && (
                <button
                  className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-semibold px-4 py-2 rounded mt-2"
                  onClick={() => handlePublish(test._id)}
                >
                  Publish
                </button>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
}
