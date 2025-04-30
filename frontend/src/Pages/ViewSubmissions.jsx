import React, { useEffect, useState } from "react";

const ViewSubmissions = () => {
  const [groupedSubmissions, setGroupedSubmissions] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchSubmissions = async () => {
      if (!token) {
        setError("No token found. Please log in again.");
        setLoading(false);
        return;
      }
      try {
        const response = await fetch(
          "http://localhost:3000/api/tests/teacher/view-submissions",
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!response.ok) {
          throw new Error(
            `Failed to fetch submissions. Status code: ${response.status}`
          );
        }

        const data = await response.json();
        console.log(data);
        const grouped = data.attempts.reduce((acc, curr) => {
          if (!acc[curr.testTitle]) acc[curr.testTitle] = [];
          acc[curr.testTitle].push(curr);
          return acc;
        }, {});
        setGroupedSubmissions(grouped);
      } catch (err) {
        console.error("Error fetching data:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchSubmissions();
  }, [token]);

  const handleDeleteTest = async (testTitle) => {
    console.log("Delete test:", testTitle);
    const confirmed = confirm(
      `Are you sure you want to delete test "${testTitle}" and its submissions?`
    );
    if (!confirmed) return;
  
    try {
      const response = await fetch(
        `http://localhost:3000/api/tests/teacher/delete-test/${encodeURIComponent(
          testTitle
        )}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
  
      if (!response.ok) {
        throw new Error("Failed to delete the test.");
      }
  
      const newData = { ...groupedSubmissions };
      delete newData[testTitle];
      setGroupedSubmissions(newData);
    } catch (err) {
      console.error("Error deleting test:", err);
      alert("Failed to delete test. Try again.");
    }
  };
  
  if (loading)
    return <p className="text-center mt-4">Loading submissions...</p>;
  if (error) return <p className="text-center text-red-500 mt-4">{error}</p>;

  return (
    <div className="max-w-4xl mx-auto mt-8 p-4">
      <h2 className="text-2xl font-bold mb-6 text-center">
        Student Submissions
      </h2>
      {Object.keys(groupedSubmissions).length === 0 ? (
        <p className="text-center">No submissions found.</p>
      ) : (
        Object.entries(groupedSubmissions).map(([testTitle, submissions]) => (
          <div
            key={testTitle}
            className="mb-6 border rounded shadow-md p-4 bg-white"
          >
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-semibold">{testTitle}</h3>
              <button
                onClick={() => handleDeleteTest(testTitle)}
                className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
              >
                Delete Test
              </button>
            </div>
            <table className="w-full table-auto border border-gray-300">
              <thead>
                <tr className="bg-gray-100">
                  <th className="p-2 border">Student Name</th>
                  <th className="p-2 border">Score</th>
                  <th className="p-2 border">Status</th>
                </tr>
              </thead>
              <tbody>
                {submissions.map((sub, index) => (
                  <tr key={index} className="text-center">
                    <td className="p-2 border">{sub.studentName}</td>
                    <td className="p-2 border">{sub.score}</td>
                    <td className="p-2 border">{sub.status}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ))
      )}
    </div>
  );
};

export default ViewSubmissions;
