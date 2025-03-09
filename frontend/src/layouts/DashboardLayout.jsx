import React from "react";
import { useLocation } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import { Outlet } from "react-router-dom";

export default function DashboardLayout() {
  const location = useLocation();

  // Hide Sidebar on test page
  const hideSidebar = location.pathname.startsWith("/test/");

  return (
    <div className="flex">
      {!hideSidebar && <Sidebar />}
      <div className="flex-1 p-4">
        <Outlet />
      </div>
    </div>
  );
}
