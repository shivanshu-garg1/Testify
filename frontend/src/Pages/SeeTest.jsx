import { useEffect, useState } from "react";

export default function SeeTest() {
  const [tests, setTests] = useState([]);

  useEffect(() => {
    fetchTests();
  }, []);

  
  const fetchTests = async () => {
    try {
      const response = await fetch("http://localhost:3000/api/tests/teacher/see-tests");
      const data = await response.json();
      setTests(data);
    } catch (error) {
      console.error("Error fetching tests:", error);
    }
  };

 
  const handlePublish = async (testId) => {
    try {
      const response = await fetch("http://localhost:3000/api/tests/teacher/publish-test", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ testId }),
      });

      const data = await response.json();
      if (response.ok) {
        alert("Test Published Successfully!");
        fetchTests();
      } else {
        alert(data.error || "Failed to publish test.");
      }
    } catch (error) {
      console.error("Error publishing test:", error);
      alert("Something went wrong.");
    }
  };

   
   const handleUnPublish = async (testId) => {
    try {
      const response = await fetch("http://localhost:3000/api/tests/teacher/unPublish-test", {
        method: "PATCH", 
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ testId }),
      });

      const data = await response.json();
      if (response.ok) {
        alert("Test Unpublished Successfully!");
        fetchTests();
      } else {
        alert(data.error || "Failed to unpublish test.");
      }
    } catch (error) {
      console.error("Error unpublishing test:", error);
      alert("Something went wrong.");
    }
  };


  
  const handleDelete = async (testId) => {
    if (!window.confirm("Are you sure you want to delete this test?")) return;

    try {
      const response = await fetch("http://localhost:3000/api/tests/teacher/delete-test", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ testId }),
      });

      const data = await response.json();
      if (response.ok) {
        alert("Test Deleted Successfully!");
        fetchTests();
      } else {
        alert(data.error || "Failed to delete test.");
      }
    } catch (error) {
      console.error("Error deleting test:", error);
      alert("Something went wrong.");
    }
  };

  return (
    <div className="min-h-screen p-6 bg-purple-50">
      <div className="container max-w-screen-lg mx-auto">
        <h2 className="text-2xl font-bold text-purple-600 mb-4">All Tests</h2>

        {tests.length === 0 ? (
          <p>No tests available.</p>
        ) : (
          tests.map((test) => (
            <div key={test._id} className="border border-purple-600 p-4 rounded-lg mb-4 shadow-lg bg-white">
              <h3 className="text-lg font-semibold">{test.testTitle}</h3>
              <p><strong>Subject:</strong> {test.subject}</p>
              <p><strong>Date:</strong> {test.date}</p>
              <p><strong>Duration:</strong> {test.duration} mins</p>
              <p><strong>Status:</strong> {test.published ? "Published" : "Unpublished"}</p>

              <div className="flex gap-2 mt-2">
                {!test.published ? (
                  <button
                    className="bg-green-500 text-white font-semibold px-4 py-2 rounded"
                    onClick={() => handlePublish(test._id)}
                  >
                    Publish
                  </button>
                ) : (
                  <button
                    className="bg-yellow-500 text-white font-semibold px-4 py-2 rounded"
                    onClick={() => handleUnPublish(test._id)}
                  >
                    Unpublish
                  </button>
                )}
                
                <button
                  className="bg-red-500 text-white font-semibold px-4 py-2 rounded"
                  onClick={() => handleDelete(test._id)}
                >
                  Delete
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}


