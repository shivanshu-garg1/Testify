import React from "react";
import gifAnimation from "../assets/animation1.gif"; // Import GIF file

export default function About() {
  return (
    <div className="bg-purple-900">
      <title>Testify | About</title>
      <div className="pt-16 px-4 text-lg font-semibold">
        {/* Section 1 */}
        <div className="flex gap-5 justify-center p-5  bg-white rounded-b-md">
          {/* Content Section */}
          <div className="overflow-hidden w-[150] flex flex-col  ">
            <h1 className="text-7xl font-bold  p-3">Empowering <h1/>
            <h1>Education </h1>
            <h1>with Smart Test </h1> 
            <h1>Management</h1>
            </h1>
            <p className="text-gray-600 p-3">
            Welcome to Testify, a revolutionary test management platform designed to simplify exam creation, administration, and evaluation. Built for educators and students alike, Testify enhances the testing experience with automation, real-time tracking, and AI-driven insights.


            </p>
          </div>

          {/* Animation (GIF Section) */}
          <div className="w-[200] h-[200] relative">
            <img src={gifAnimation} alt="Animated GIF" className="w-full h-full rounded-sm" />
          </div>

        </div>
      </div>
      Further Content...
    </div>
  );
}
