import { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="container mx-auto px-6 py-4 flex justify-between items-center bg-slate-800 text-gray-100 shadow-teal-900 shadow-md border-b-1 border-teal-300">
      {/* App Name */}
      <div className="text-xl font-bold text-teal-200 cursor-pointer relative group">
        Testify
      </div>

      {/* Desktop Menu */}
      <div className="hidden md:flex space-x-9 text-teal-300 text-md font-bold">
        <Link
          to="/"
          className="relative group"
        >
          Home
          <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-teal-400 transition-all group-hover:w-full"></span>
        </Link>
        <Link
          to="/about"
          className="relative group"
        >
          About
          <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-teal-400 transition-all group-hover:w-full"></span>
        </Link>
        <Link
          to="/contact"
          className="relative group"
        >
          Contact Us
          <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-teal-400 transition-all group-hover:w-full"></span>
        </Link>
        <Link
          to="/login"
          className="relative group"
        >
          Login
          <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-teal-400 transition-all group-hover:w-full"></span>
        </Link>
      </div>

      {/* Get Started Button */}
      <div>
        <button className="bg-teal-400 text-gray-800 px-4 py-2 rounded-lg hover:bg-teal-500 transition">
          Get Started
        </button>
      </div>

      {/* Hamburger Menu */}
      <div className="md:hidden text-gray-100 cursor-pointer">
        {!isOpen ? (
          <Menu size={24} onClick={() => setIsOpen(true)} />
        ) : (
          <X size={24} onClick={() => setIsOpen(false)} />
        )}
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="absolute top-16 left-0 w-full bg-slate-900 p-4 space-y-4 text-teal-300 text-md font-bold z-50 md:hidden">
          <Link
            to="/"
            onClick={() => setIsOpen(false)}
            className="block relative group"
          >
            Home
            <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-teal-400 transition-all group-hover:w-full"></span>
          </Link>
          <Link
            to="/about"
            onClick={() => setIsOpen(false)}
            className="block relative group"
          >
            About
            <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-teal-400 transition-all group-hover:w-full"></span>
          </Link>
          <Link
            to="/contact"
            onClick={() => setIsOpen(false)}
            className="block relative group"
          >
            Contact Us
            <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-teal-400 transition-all group-hover:w-full"></span>
          </Link>
          <Link
            to="/login"
            onClick={() => setIsOpen(false)}
            className="block relative group"
          >
            Login
            <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-teal-400 transition-all group-hover:w-full"></span>
          </Link>
        </div>
      )}
    </nav>
  );
}
