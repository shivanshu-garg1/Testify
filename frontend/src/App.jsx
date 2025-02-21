import React from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
// import Landing from "./Pages/Home";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Landing from "./Pages/Landing";

export default function App() {
  const navLinks = [
    { name: "Home", path: "/" },
    { name: "About", path: "/about" },
    { name: "Contact", path: "/contact" },
    { name: "Login", path: "/login" },
  ];

  return (
    <>
      <Navbar logo="Testify" links={navLinks} />
      <Routes>
        <Route path="/" element={<Landing  />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
    </>
  );
}
