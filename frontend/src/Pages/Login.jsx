import React from "react";


const Login = () => {
 

  return (
    <div className="relative w-full h-screen flex items-center justify-center bg-[#deceff] ">
      

      {/* Login Form */}
      <div className="relative z-10 bg-white text-purple-100 bg-opacity-90 p-10 rounded-xl  shadow-lg  w-[90%] max-w-md">
        <h2 className="text-2xl  font-bold text-center mb-5">Login</h2>
        <form  className="space-y-5">
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
            className="w-full bg-purple-500 hover:bg-purple-700 text-white py-2 rounded-md"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
