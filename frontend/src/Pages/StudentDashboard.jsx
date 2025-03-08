import React, { useEffect, useState } from "react";

export default function TeacherDashboard() {
  const [user, setUser] = useState({ name: "", role: "" });

  useEffect(() => {
    const name = localStorage.getItem("name");
    const role = localStorage.getItem("role");

    if (name && role) {
      setUser({ name, role });
    }
  }, []);

  return (
    <>
      <div className="container relative flex flex-col justify-between h-full max-w-6xl px-5 mx-auto xl:px-0 mt-5">
      <h2 className="mb-1 text-3xl font-extrabold leading-tight bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-indigo-600 text-center  sm:text-left">Testify - Streamlined test management website</h2>

        <h2 className="mb-1 text-2xl font-semibold leading-tight bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-indigo-600 text-center sm:text-left mt-10">Student Dashboard</h2>
        <p className="mb-12 text-lg text-gray-500 text-center sm:text-left">Welcome, {user.name}! Manage tests, track student progress, and analyze performance.</p>
        <div className="w-full">
          <div className="flex flex-col w-full mb-10 sm:flex-row gap-5">
            <div className="w-full sm:w-1/2">
              <div className="relative h-full ml-0 sm:mr-5">
                <span className="absolute top-0 left-0 w-full h-full mt-1 ml-1 bg-indigo-500 rounded-lg"></span>
                <div className="relative h-full p-5 bg-white border-2 border-indigo-500 rounded-lg">
                  <h3 className="my-2 text-lg font-bold text-gray-800">Create & Manage Tests</h3>
                  <p className="mb-2 text-gray-600">Design and schedule tests for students with ease.</p>
                </div>
              </div>
            </div>
            <div className="w-full sm:w-1/2">
              <div className="relative h-full ml-0 sm:mr-5">
                <span className="absolute top-0 left-0 w-full h-full mt-1 ml-1 bg-purple-500 rounded-lg"></span>
                <div className="relative h-full p-5 bg-white border-2 border-purple-500 rounded-lg">
                  <h3 className="my-2 text-lg font-bold text-gray-800">Student Progress</h3>
                  <p className="mb-2 text-gray-600">Monitor students' test scores and overall performance.</p>
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-col w-full mb-5 sm:flex-row gap-5">
            <div className="w-full sm:w-1/2">
              <div className="relative h-full ml-0 sm:mr-5">
                <span className="absolute top-0 left-0 w-full h-full mt-1 ml-1 bg-blue-400 rounded-lg"></span>
                <div className="relative h-full p-5 bg-white border-2 border-blue-400 rounded-lg">
                  <h3 className="my-2 text-lg font-bold text-gray-800">Automated Grading</h3>
                  <p className="mb-2 text-gray-600">Save time with automatic test grading and feedback.</p>
                </div>
              </div>
            </div>
            <div className="w-full sm:w-1/2">
              <div className="relative h-full ml-0 sm:mr-5">
                <span className="absolute top-0 left-0 w-full h-full mt-1 ml-1 bg-green-500 rounded-lg"></span>
                <div className="relative h-full p-5 bg-white border-2 border-green-500 rounded-lg">
                  <h3 className="my-2 text-lg font-bold text-gray-800">Performance Insights</h3>
                  <p className="mb-2 text-gray-600">Analyze trends and provide data-driven improvements for students.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}