import React from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
// import Landing from "./Pages/Home";
import About from "./Pages/About";
import Contact from "./pages/Contact";
import Landing from "./Pages/Landing";
import Login from "./Pages/Login";
import Signup from "./Pages/Signup";

export default function App() {
  

  return (
    <>
      
      <Routes>
        <Route path="/" element={<Landing  />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>

      <Routes>

      </Routes>

    </>
  );
}
