import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
const Signup = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "",
  });
  const navigate = useNavigate();

  const handelChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handelSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("https://testify-server-mocha.vercel.app/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.message);
      }
      alert("User Registered Successfully");
      navigate("/login");
    } catch (error) {
      alert(error.message || "Signup failed");
    }
  };
  return (
    <div className="relative w-full h-screen flex items-center justify-center  bg-white">
      {/* Signup Form */}
      <div className="relative z-10  bg-white bg-opacity-90 p-10 rounded-xl w-[90%] max-w-md  shadow-purple-600 shadow-2xl">
        <h2 className="text-2xl  font-bold text-center mb-5  bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-indigo-600">
          Signup
        </h2>
        <form className="space-y-5" onSubmit={handelSubmit}>
          {/* Name Field */}
          <div>
            <label
              htmlFor="name"
              className=" block mb-1 bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-indigo-600 font-semibold"
            >
              Name
            </label>
            <input
              type="text"
              className="w-full p-2 border border-gray-300 rounded-md text-black focus:outline-none focus:border-purple-500"
              id="name"
              name="name"
              value={form.name}
              onChange={handelChange}
              placeholder="Enter name"
            />
          </div>

          {/* Email Field */}
          <div>
            <label
              htmlFor="email"
              className=" block mb-1 bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-indigo-600 font-semibold"
            >
              Enter Email
            </label>
            <input
              type="email"
              className="w-full p-2 border border-gray-300 rounded-md text-black focus:outline-none focus:border-purple-500"
              id="email"
              name="email"
              placeholder="Enter email"
              value={form.email}
              onChange={handelChange}
            />
          </div>

          {/* Password Field */}
          <div>
            <label
              htmlFor="password"
              className="bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-indigo-600 font-semibold block mb-1"
            >
              Enter Password
            </label>
            <input
              type="password"
              className="w-full p-2 border border-gray-300 rounded-md text-black focus:outline-none focus:border-purple-500"
              id="password"
              name="password"
              placeholder="Enter password"
              value={form.password}
              onChange={handelChange}
            />
          </div>

          {/* Confirm Password Field */}
          <div>
            <label
              htmlFor="confirmPassword"
              className="bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-indigo-600 font-semibold block mb-1"
            >
              Confirm Password
            </label>
            <input
              type="password"
              className="w-full p-2 border border-gray-300 rounded-md text-black focus:outline-none focus:border-purple-500"
              id="confirmPassword"
              name="confirmPassword"
              placeholder="Confirm password"
              value={form.confirmPassword}
              onChange={handelChange}
            />
          </div>
          <div>
            <label
              htmlFor="role"
              className="bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-indigo-600 font-semibold block mb-1"
            >
              Role
            </label>
            <select
              name="role"
              className="w-full p-2 border border-gray-300 rounded-md text-black focus:outline-none focus:border-purple-500"
              id=""
              value={form.role}
              onChange={handelChange}
            >
              <option value="">Select Role</option>
              <option value="student">Student</option>
              <option value="teacher">Teacher</option>
            </select>
          </div>

          <button
            type="submit"
            className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-800 font-semibold text-white py-2 rounded-md"
          >
            Signup
          </button>
        </form>
      </div>
    </div>
  );
};

export default Signup;
