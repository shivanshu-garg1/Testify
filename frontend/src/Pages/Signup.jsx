import React from "react";
const Signup = () => {
  return (
    <div className="relative w-full h-screen flex items-center justify-center  bg-[#0d0225]">
           

      {/* Signup Form */}
      <div className="relative z-10  bg-[#0d0225] bg-opacity-90 p-10 rounded-xl w-[90%] max-w-md border-2 border-purple-100">
        <h2 className="text-2xl text-purple-100 font-bold text-center mb-5 ">Signup</h2>
        <form  className="space-y-5">
          {/* Name Field */}
          <div>
            <label htmlFor="name" className="text-purple-100 block mb-1">
              Name
            </label>
            <input
              type="text"
              className="w-full p-2 border border-gray-300 rounded-md text-purple-100 focus:outline-none focus:border-purple-500"
              id="name"
              name="name"
              placeholder="Enter name"
              
            />
          </div>

          {/* Email Field */}
          <div>
            <label htmlFor="email" className="text-purple-100 block mb-1">
              Enter Email
            </label>
            <input
              type="email"
              className="w-full p-2 border border-gray-300 rounded-md text-purple-100 focus:outline-none focus:border-purple-500"
              id="email"
              name="email"
              placeholder="Enter email"
              
            />
          </div>

          {/* Password Field */}
          <div>
            <label htmlFor="password" className="text-purple-100 block mb-1">
              Enter Password
            </label>
            <input
              type="password"
              className="w-full p-2 border border-gray-300 rounded-md text-purple-100 focus:outline-none focus:border-purple-500"
              id="password"
              name="password"
              placeholder="Enter password"
              
            />
          </div>

          {/* Confirm Password Field */}
          <div>
            <label htmlFor="confirmPassword" className="text-purple-100 block mb-1">
              Confirm Password
            </label>
            <input
              type="password"
              className="w-full p-2 border border-gray-300 rounded-md text-purple-100 focus:outline-none focus:border-purple-500"
              id="confirmPassword"
              name="confirmPassword"
              placeholder="Confirm password"
              
            />
          </div>

          <button
            type="submit"
            className="w-full bg-purple-500 hover:bg-purple-700 text-purple-100 py-2 rounded-md"
          >
            Signup
          </button>
        </form>
      </div>
    </div>
  );
};

export default Signup;
