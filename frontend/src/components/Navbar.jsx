import React, { useState } from "react";
import { Link } from "react-router-dom";
import Button from "./Button";
import { X, Menu } from "lucide-react";

export default function Navbar({ logo, links }) {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <nav className=" fixed top-0 left-0 w-full flex flex-wrap items-center justify-between px-10 py-4 bg-[#0d0225] text-purple-100 border-b-2 border-b-purple-100">
        {/* Logo */}
        <div className="cursor-pointer text-2xl font-semibold">{logo}</div>
        {/* DeskTop Menu */}
        <ul className="hidden md:flex gap-10">
          {links.map((link, index) => (
            <li key={index}>
              <Link to={link.path} className="">
                {link.name}
              </Link>
            </li>
          ))}
        </ul>
        {/* for laptop screeen */}
        <div className="hidden md:block">
          <Button text="Get Started" link="/signup" />
        </div>
        {/* for mobile screen */}
        <div className="md:hidden ">
          <Button text="Get Started" link="/signup" />
        </div>
        {/* Hamburger menu */}
        <button className="md:hidden" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>

        <div
          className={`absolute top-16 left-0 w-full bg-[#0d0225] flex   ${
            isOpen ? "block" : "hidden"
          } md:hidden`}
        >
          <ul className="">
            {links.map((link, index) => (
              <li
                key={index}
                className="m-10 hover:border-b-2 hover:border-b-purple-100 rounded p-0 "
              >
                <Link
                  to={link.path}
                  onClick={() => setIsOpen(false)}
                  className=""
                >
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </nav>
    </>
  );
}
