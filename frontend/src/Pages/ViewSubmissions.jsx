import React, { useEffect, useState } from "react";

const ViewSubmissions = () => {
  const [submissions, setSubmissions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const token = localStorage.getItem("token");
  console.log(token);

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

        console.log({
          Authorization: `Bearer ${token}`,
        });

        console.log("Response status:", response.status);

        if (!response.ok) {
          throw new Error(
            `Failed to fetch submissions. Status code: ${response.status}`
          );
        }

        const data = await response.json();
        console.log(data);
        setSubmissions(data.attempts || []);
      } catch (err) {
        console.error("Error fetching data:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }; // 🚨 You forgot to call the function!

    fetchSubmissions();
  }, [token]); // 👈 good useEffect dependency

  if (loading)
    return <p className="text-center mt-4">Loading submissions...</p>;
  if (error) return <p className="text-center text-red-500 mt-4">{error}</p>;

  return (
    <div className="max-w-4xl mx-auto mt-8 p-4 bg-white shadow rounded">
      <h2 className="text-2xl font-bold mb-4 text-center">
        Student Submissions
      </h2>
      {submissions.length === 0 ? (
        <p className="text-center">No submissions found.</p>
      ) : (
        <table className="w-full table-auto border border-gray-300">
          <thead>
            <tr className="bg-gray-100">
              <th className="p-2 border">Student Name</th>
              <th className="p-2 border">Test Title</th>
              <th className="p-2 border">Score</th>
              <th className="p-2 border">Status</th>
            </tr>
          </thead>
          <tbody>
            {submissions.map((sub, index) => (
              <tr key={index} className="text-center">
                <td className="p-2 border">{sub.studentName}</td>
                <td className="p-2 border">{sub.testTitle}</td>
                <td className="p-2 border">{sub.score}</td>
                <td className="p-2 border">{sub.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default ViewSubmissions;
