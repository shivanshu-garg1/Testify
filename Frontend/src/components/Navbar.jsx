import React from 'react';
import { Link } from 'react-router-dom';
export default function Navbar() {
  return (
    <nav className="container shadow-green-300 shadow-sm py-4 px-28 flex justify-between ">
    <div className="text-xl font-bold text-green-400 cursor-pointer">Testify</div>
    <div className="space-x-9 text-green-400 text-md  font-bold cursor-pointer">
      <Link to="/" className='hover:text-lg'>Home</Link>
      <Link to="/about">About</Link>
      <Link to="/about">Contact us</Link>
      <Link to="/about">Contact us</Link>
    </div>
  </nav>
  );
}
