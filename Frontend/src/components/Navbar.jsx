import { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
<nav className="fixed top-0 left-0 w-full px-6 py-4 flex justify-between items-center bg-[#0d0225] text-purple-100 border-b-2 border-purple-950 z-50">
<Link to='/'>
      <div className="text-xl font-bold text-purple-100 cursor-pointer relative group">
        Testify
      </div>
      </Link>
      
      <div className="hidden md:flex space-x-9 text-purple-100 text-md font-bold">
        <Link to="/" className="relative group">
          Home
          <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-violet-100 transition-all group-hover:w-full"></span>
        </Link>
        <Link to="/about" className="relative group">
          About
          <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-violet-100 transition-all group-hover:w-full"></span>
        </Link>
        <Link to="/contact" className="relative group">
          Contact Us
          <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-violet-100 transition-all group-hover:w-full"></span>
        </Link>

       
      </div>

      
      <Link to="/login">
  <button className="bg-violet-100 text-gray-900 px-4 py-2 rounded-lg hover:bg-violet-100 transition">
    Login
  </button>
</Link>
     

      {/* Hamburger Menu */}
      <div className="md:hidden text-purple-100 cursor-pointer">
        {!isOpen ? (
          <Menu size={24} onClick={() => setIsOpen(true)} />
        ) : (
          <X size={24} onClick={() => setIsOpen(false)} />
        )}
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="absolute top-16 left-0 w-full bg-[#10032d] p-4 space-y-4 text-purple-100 text-md font-bold z-50 md:hidden">
          <Link to="/" onClick={() => setIsOpen(false)} className="block relative group">
            Home
            <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-violet-100 transition-all group-hover:w-full"></span>
          </Link>
          <Link to="/about" onClick={() => setIsOpen(false)} className="block relative group">
            About
            <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-violet-100 transition-all group-hover:w-full"></span>
          </Link>
          <Link to="/contact" onClick={() => setIsOpen(false)} className="block relative group">
            Contact Us
            <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-violet-100 transition-all group-hover:w-full"></span>
          </Link>
          <Link to="/login" onClick={() => setIsOpen(false)} className="block relative group">
            Login
            <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-violet-100 transition-all group-hover:w-full"></span>
          </Link>
        </div>
      )}
    </nav>
  );
}
