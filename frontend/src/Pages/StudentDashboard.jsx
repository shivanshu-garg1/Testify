import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function StudentDashboard() {
  const [user, setUser] = useState({ name: "", role: "", batch: "" });

  useEffect(() => {
    const name = localStorage.getItem("name");
    const role = localStorage.getItem("role");
    const batch = localStorage.getItem("batch");

    if (name && role && batch) {
      setUser({ name, role, batch });
    }
  }, []);

  return (
    <>
      <div className="container relative flex flex-col justify-between h-full max-w-6xl px-5 mx-auto xl:px-0 mt-5 cursor-default">
        <h2 className="mb-1 text-3xl font-extrabold leading-tight bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-indigo-600 text-center sm:text-left">
          Testify - Streamlined test management website
        </h2>

        <h2 className="mb-1 text-2xl font-semibold leading-tight bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-indigo-600 text-center sm:text-left mt-10">
          Student Dashboard <br />
          Batch : {user.batch}
        </h2>

        <p className="mb-12 text-lg text-gray-500 text-center sm:text-left">
          Welcome, {user.name} View your assigned tests, track your progress,
          and improve your performance.
        </p>

        <div className="w-full">
          <div className="flex flex-col w-full mb-10 sm:flex-row gap-5">
            <div className="w-full sm:w-1/2">
              <Link to="/student/assigned-tests">
                <div className="relative h-full ml-0 sm:mr-5">
                  <span className="absolute top-0 left-0 w-full h-full mt-1 ml-1 bg-indigo-500 rounded-lg"></span>
                  <div className="relative h-full p-5 bg-white border-2 border-indigo-500 rounded-lg">
                    <h3 className="my-2 text-lg font-bold text-gray-800">
                      Assigned Tests
                    </h3>
                    <p className="mb-2 text-gray-600">
                      View and take your scheduled tests.
                    </p>
                  </div>
                </div>
              </Link>
            </div>

            <div className="w-full sm:w-1/2">
              <Link to="/student/performance">
                <div className="relative h-full ml-0 sm:mr-5">
                  <span className="absolute top-0 left-0 w-full h-full mt-1 ml-1 bg-purple-500 rounded-lg"></span>
                  <div className="relative h-full p-5 bg-white border-2 border-purple-500 rounded-lg">
                    <h3 className="my-2 text-lg font-bold text-gray-800">
                      Performance Overview
                    </h3>
                    <p className="mb-2 text-gray-600">
                      Check your test scores and analyze your progress.
                    </p>
                  </div>
                </div>
              </Link>
            </div>
          </div>

          <div className="flex flex-col w-full mb-5 sm:flex-row gap-5">
            <div className="w-full sm:w-1/2">
              <Link to="/student/feedback">
                <div className="relative h-full ml-0 sm:mr-5">
                  <span className="absolute top-0 left-0 w-full h-full mt-1 ml-1 bg-blue-400 rounded-lg"></span>
                  <div className="relative h-full p-5 bg-white border-2 border-blue-400 rounded-lg">
                    <h3 className="my-2 text-lg font-bold text-gray-800">
                      Feedback & Insights
                    </h3>
                    <p className="mb-2 text-gray-600">
                      Get feedback on your performance and improve your skills.
                    </p>
                  </div>
                </div>
              </Link>
            </div>

            <div className="w-full sm:w-1/2">
              <Link to="/student/resources">
                <div className="relative h-full ml-0 sm:mr-5">
                  <span className="absolute top-0 left-0 w-full h-full mt-1 ml-1 bg-green-500 rounded-lg"></span>
                  <div className="relative h-full p-5 bg-white border-2 border-green-500 rounded-lg">
                    <h3 className="my-2 text-lg font-bold text-gray-800">
                      Study Resources
                    </h3>
                    <p className="mb-2 text-gray-600">
                      Access study materials and test preparation resources.
                    </p>
                  </div>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
