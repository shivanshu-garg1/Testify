import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  FaHome,
  FaUser,
  FaCog,
  FaSignOutAlt,
  FaBook,
  FaBookOpen,
  FaChartBar,
  FaChevronRight,
  FaClipboardCheck
} from "react-icons/fa";

const menuItems = {
  student: [
    { name: "Dashboard", path: "/student", icon: <FaHome /> },
    { name: "Profile", path: "/student/assigned-tests", icon: <FaBookOpen /> },
    { name: "Settings", path: "/student/settings", icon: <FaCog /> },
  ],
  teacher: [
    { name: "Dashboard", path: "/teacher", icon: <FaHome /> },
    { name: "Create Test", path: "/teacher/create-test", icon: <FaBook /> },
    { name: "See Created Test", path: "/teacher/see-test", icon: <FaClipboardCheck /> },
    { name: "Reports", path: "/teacher/reports", icon: <FaChartBar /> },
  ],
};

export default function Sidebar() {
  const location = useLocation();
  const navigate = useNavigate();
  const role = location.pathname.startsWith("/teacher") ? "teacher" : "student";
  const [expanded, setExpanded] = useState(false);
  const [name, setName] = useState("");

  useEffect(() => {
    const storedName = localStorage.getItem("name");
    if (storedName) setName(storedName);
     console.log(storedName);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("teacherToken");
    localStorage.removeItem("studentToken");
    localStorage.removeItem("name");
    navigate("/login"); 
  };

  return (
    <div
      className={`h-full fixed top-0 left-0 bg-gradient-to-r from-purple-600 to-indigo-600 text-white p-4 transition-all duration-300 z-50 ${
        expanded ? "w-64" : "w-16"
      } overflow-hidden`}
    >
      {/* Toggle Sidebar Button */}
      <button
        onClick={() => setExpanded(!expanded)}
        className="text-white p-2 mb-1 focus:outline-none"
      >
        <FaChevronRight
          className={`transform transition-transform ${expanded ? "rotate-180" : ""}`}
        />
      </button>

      {/* Display User Name when Expanded */}
      {expanded && (
        <div className="flex items-center font-semibold text-xl mb-4">
          {name}
        </div>
      )}

      {/* Menu Items */}
      <ul>
        {menuItems[role].map((item, index) => (
          <li
            key={index}
            className={`flex items-center mb-2 p-2 rounded ${
              location.pathname === item.path ? "bg-indigo-700" : "hover:bg-indigo-700"
            }`}
          >
            <Link to={item.path} className="flex items-center">
              <span className="text-xl">{item.icon}</span>
              {expanded && <span className="ml-3">{item.name}</span>}
            </Link>
          </li>
        ))}

        {/* Logout Button */}
        <li className="flex items-center mb-2 p-2 rounded hover:bg-indigo-700">
          <button onClick={handleLogout} className="flex items-center w-full text-left">
            <span className="text-xl"><FaSignOutAlt /></span>
            {expanded && <span className="ml-3">Logout</span>}
          </button>
        </li>
      </ul>
    </div>
  );
}
