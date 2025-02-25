import React, { useState } from "react";
import { Link } from "react-router-dom";
import Button from "./Button";
import { X, Menu } from "lucide-react";

export default function Navbar({ logo, links = [] }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed w-full flex flex-wrap items-center justify-between px-10 py-4 bg-[#0d0225] text-purple-100 border-b-2 border-b-purple-100 z-50">
      {/* Logo */}
      <div className="cursor-pointer text-2xl font-semibold">{logo}</div>

      {/* Desktop Menu */}
      <ul className="hidden md:flex gap-10">
        {links.map((link, index) => (
          <li key={index}>
            <Link to={link.path} className="hover:text-purple-300">
              {link.name}
            </Link>
          </li>
        ))}
      </ul>

      {/* Laptop Screen Button */}
      <div className="hidden md:block">
        <Button text="Get Started" link="/signup" />
      </div>

      {/* Hamburger Menu for Mobile */}
      <button className="md:hidden" onClick={() => setIsOpen(!isOpen)}>
        {isOpen ? <X size={28} /> : <Menu size={28} />}
      </button>

      {/* Mobile Menu */}
      <div
        className={`absolute top-16 left-0 w-full bg-[#0d0225] ${
          isOpen ? "block" : "hidden"
        } md:hidden`}
      >
        <ul className="flex flex-col items-center">
          {links.map((link, index) => (
            <li
              key={index}
              className="m-4 hover:border-b-2 hover:border-b-purple-100"
            >
              <Link to={link.path} onClick={() => setIsOpen(false)}>
                {link.name}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}
