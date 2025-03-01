import React from "react";

import {Link} from 'react-router-dom';

const Login = () => {
  return (
    <>
    
      <div className="relative w-full h-screen flex items-center justify-center  bg-white ">
        {/* Login Form */}
        <div className="relative z-10 bg-white text-black bg-opacity-90 p-10 rounded-xl  shadow-purple-600 shadow-2xl  w-[90%] max-w-md">
          <h2 className="text-2xl  font-bold text-center mb-5 bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-indigo-600">Login</h2>
          <form className="space-y-5">
            <div>
              <label htmlFor="email" className=" block mb-1">
                Enter Email
              </label>
              <input
                type="email"
                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:border-purple-500"
                id="email"
                name="email"
                placeholder="Enter email"
              />
            </div>
            <div>
              <label htmlFor="password" className="block mb-1">
                Enter Password
              </label>
              <input
                type="password"
                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:border-purple-500"
                id="password"
                name="password"
                placeholder="Enter password"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-800 text-white py-2 rounded-md"
            >
              Login
            </button>
          </form>
          <div className="text-center pt-4">
          <Link to="/" className="">Go Back to Landing page</Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
