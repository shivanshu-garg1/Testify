import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { FaHome, FaUser, FaCog, FaSignOutAlt, FaBook, FaChartBar, FaChevronRight } from "react-icons/fa";

const menuItems = {
  student: [
    { name: "Dashboard", path: "/student", icon: <FaHome /> },
    { name: "Profile", path: "/student/profile", icon: <FaUser /> },
    { name: "Settings", path: "/student/settings", icon: <FaCog /> },
    { name: "Logout", path: "/logout", icon: <FaSignOutAlt /> },
  ],
  teacher: [
    { name: "Dashboard", path: "/teacher", icon: <FaHome /> },
    { name: "Manage Classes", path: "/teacher/classes", icon: <FaBook /> },
    { name: "Reports", path: "/teacher/reports", icon: <FaChartBar /> },
    { name: "Logout", path: "/logout", icon: <FaSignOutAlt /> },
  ],
};

export default function Sidebar() {
  const location = useLocation();
  const role = location.pathname.startsWith("/teacher") ? "teacher" : "student"; // Determine role based on path
  const [expanded, setExpanded] = useState(false); // Sidebar toggle state

  return (
    <div className={`h-screen bg-gray-800 text-white p-4 transition-all duration-300 ${expanded ? "w-64" : "w-16"}`}>
      {/* Toggle Button */}
      <button
        onClick={() => setExpanded(!expanded)}
        className="text-white p-2 mb-4 focus:outline-none"
      >
        <FaChevronRight className={`transform transition-transform ${expanded ? "rotate-180" : ""}`} />
      </button>

      {/* Sidebar Menu */}
      <ul>
        {menuItems[role].map((item, index) => (
          <li key={index} className={`flex items-center mb-2 p-2 rounded ${location.pathname === item.path ? "bg-gray-700" : "hover:bg-gray-700"}`}>
            <Link to={item.path} className="flex items-center">
              <span className="text-xl">{item.icon}</span>
              {expanded && <span className="ml-3">{item.name}</span>}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
