import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  FaHome,
  FaUser,
  FaCog,
  FaSignOutAlt,
  FaBook,
  FaChartBar,
  FaChevronRight,
} from "react-icons/fa";

const menuItems = {
  student: [
    { name: "Dashboard", path: "/student", icon: <FaHome /> },
    { name: "Profile", path: "/student/profile", icon: <FaUser /> },
    { name: "Settings", path: "/student/settings", icon: <FaCog /> },
    { name: "Logout", path: "/logout", icon: <FaSignOutAlt /> },
  ],
  teacher: [
    { name: "Dashboard", path: "/teacher", icon: <FaHome /> },
    { name: "Create test", path: "/teacher/create-test", icon: <FaBook /> },
    { name: "Reports", path: "/teacher/reports", icon: <FaChartBar /> },
    { name: "Logout", path: "/logout", icon: <FaSignOutAlt /> },
  ],
};

export default function Sidebar() {
  const location = useLocation();
  const role = location.pathname.startsWith("/teacher") ? "teacher" : "student"; 
  const [expanded, setExpanded] = useState(false);
  const [name,setName] = useState("");

  

  useEffect(()=>{
    const getName =  localStorage.getItem("name");
    if(getName){
      setName(getName);
    }
  })


  return (
    <div
      className={`h-full fixed top-0 left-0 bg-gradient-to-r from-purple-600 to-indigo-600 text-white p-4 transition-all duration-300 z-50 ${
        expanded ? "w-64" : "w-16"
      } `}
    >
      {/* Toggle Button */}
      <button
        onClick={() => setExpanded(!expanded)}
        className="text-white p-2 mb-1 focus:outline-none"
      >
        <FaChevronRight
          className={`transform transition-transform ${
            expanded ? "rotate-180" : ""
          }`}
        />
      </button>

      <div className="flex items-center font-semibold text-2xl mb-4">
        {expanded ? <p>{name}</p> : ""}
      </div>
      <ul>
        {menuItems[role].map((item, index) => (
          <li
            key={index}
            className={`flex items-center mb-2 p-2 rounded ${
              location.pathname === item.path
                ? "bg-indigo-700"
                : "hover:bg-indigo-700"
            }`}
          >
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
