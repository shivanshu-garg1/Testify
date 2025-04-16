import React from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import About from "./Pages/About";
import Contact from "./Pages/Contact";
import Landing from "./Pages/Landing";
import Login from "./Pages/Login";
import Signup from "./Pages/Signup";
import StudentDashboard from "./Pages/StudentDashboard";
import TeacherDashboard from "./Pages/TeacherDashboard"; 
// import Sidebar from "./components/Sidebar";
import DashboardLayout from "./layouts/DashboardLayout";
import CreateTest from "./Pages/CreateTest";
import SeeTests from "./Pages/SeeTest";
import AssignedTasks from "./Pages/AssignedTasks";
import TestPage from "./Pages/TestPage";

export default function App() {
  // const location = useLocation();
  // const showSidebar = location.pathname === "/student" || location.pathname === "/teacher";



  
  return (
    <div className="app-container">
      {/* {showSidebar && <Sidebar />} */}
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        {/* <Route path="/student" element={<StudentDashboard />} />
        <Route path="/teacher" element={<TeacherDashboard />} /> */}

        <Route path="/" element={<DashboardLayout />}>
        <Route path="student" element={<StudentDashboard />} />
        <Route path="/student/assigned-tests" element={<AssignedTasks />} />
        <Route path="/test/:testId" element={<TestPage />} />
        <Route path="teacher" element={<TeacherDashboard />} />
        <Route path="/teacher/create-test" element={<CreateTest />} />
        <Route path="/teacher/see-test" element={<SeeTests />} />
      </Route>
      </Routes>
     
    </div>
  );
}
