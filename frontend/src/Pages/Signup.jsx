import React from "react";
const Signup = () => {
  return (
    <div className="relative w-full h-screen flex items-center justify-center  bg-white">
      {/* Signup Form */}
      <div className="relative z-10  bg-white bg-opacity-90 p-10 rounded-xl w-[90%] max-w-md  shadow-purple-600 shadow-2xl">
        <h2 className="text-2xl  font-bold text-center mb-5  bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-indigo-600">
          Signup
        </h2>
        <form className="space-y-5">
          {/* Name Field */}
          <div>
            <label htmlFor="name" className="text-black block mb-1">
              Name
            </label>
            <input
              type="text"
              className="w-full p-2 border border-gray-300 rounded-md text-black focus:outline-none focus:border-purple-500"
              id="name"
              name="name"
              placeholder="Enter name"
            />
          </div>

          {/* Email Field */}
          <div>
            <label htmlFor="email" className="text-black block mb-1">
              Enter Email
            </label>
            <input
              type="email"
              className="w-full p-2 border border-gray-300 rounded-md text-black focus:outline-none focus:border-purple-500"
              id="email"
              name="email"
              placeholder="Enter email"
            />
          </div>

          {/* Password Field */}
          <div>
            <label htmlFor="password" className="text-black block mb-1">
              Enter Password
            </label>
            <input
              type="password"
              className="w-full p-2 border border-gray-300 rounded-md text-black focus:outline-none focus:border-purple-500"
              id="password"
              name="password"
              placeholder="Enter password"
            />
          </div>

          {/* Confirm Password Field */}
          <div>
            <label htmlFor="confirmPassword" className="text-black block mb-1">
              Confirm Password
            </label>
            <input
              type="password"
              className="w-full p-2 border border-gray-300 rounded-md text-black focus:outline-none focus:border-purple-500"
              id="confirmPassword"
              name="confirmPassword"
              placeholder="Confirm password"
            />

            
          </div>
          <div>
          <label htmlFor="role" className="text-black block mb-1">
              Role
            </label>
          <select
              name="role"
              className="w-full p-2 border border-gray-300 rounded-md text-black focus:outline-none focus:border-purple-500"
              id=""
            >
              <option value="student">Student</option>
              <option value="teacher">Teacher</option>
            </select>
          </div>

          <button
            type="submit"
            className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-800 font-semibold text-black py-2 rounded-md"
          >
            Signup
          </button>
        </form>
      </div>
    </div>
  );
};

export default Signup;
