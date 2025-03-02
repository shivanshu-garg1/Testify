import React from "react";
import { Routes, Route } from "react-router-dom";
import About from "./Pages/About";
import Contact from "./Pages/Contact";
import Landing from "./Pages/Landing";
import Login from "./Pages/Login";
import Signup from "./Pages/Signup";
import StudentDashboard from "./Pages/StudentDashboard";
import TeacherDashboard from "./Pages/TeacherDashboard"; // ✅ Fixed spelling

export default function App() {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<Landing />} />
      <Route path="/about" element={<About />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />

      {/* Role-Based Routes */}
      <Route path="/student" element={<StudentDashboard />} />
      <Route path="/teacher" element={<TeacherDashboard />} />
    </Routes>
  );
}
