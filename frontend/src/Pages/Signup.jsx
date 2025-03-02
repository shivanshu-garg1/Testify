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

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("https://testify-backend-eta.vercel.app/api/auth/signup", {
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
    <div className="relative w-full h-screen flex items-center justify-center bg-white">
      <div className="relative z-10 bg-white p-10 rounded-xl w-[90%] max-w-md shadow-purple-600 shadow-2xl">
        <h2 className="text-2xl font-bold text-center mb-5 text-gradient">Signup</h2>
        <form className="space-y-5" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="name" className="block mb-1 text-gradient">Name</label>
            <input
              type="text"
              className="w-full p-2 border rounded-md focus:outline-none focus:border-purple-500"
              id="name"
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="Enter name"
            />
          </div>
          <div>
            <label htmlFor="email" className="block mb-1 text-gradient">Enter Email</label>
            <input
              type="email"
              className="w-full p-2 border rounded-md focus:outline-none focus:border-purple-500"
              id="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="Enter email"
            />
          </div>
          <div>
            <label htmlFor="password" className="block mb-1 text-gradient">Enter Password</label>
            <input
              type="password"
              className="w-full p-2 border rounded-md focus:outline-none focus:border-purple-500"
              id="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              placeholder="Enter password"
            />
          </div>
          <div>
            <label htmlFor="confirmPassword" className="block mb-1 text-gradient">Confirm Password</label>
            <input
              type="password"
              className="w-full p-2 border rounded-md focus:outline-none focus:border-purple-500"
              id="confirmPassword"
              name="confirmPassword"
              value={form.confirmPassword}
              onChange={handleChange}
              placeholder="Confirm password"
            />
          </div>
          <div>
            <label htmlFor="role" className="block mb-1 text-gradient">Role</label>
            <select
              name="role"
              className="w-full p-2 border rounded-md focus:outline-none focus:border-purple-500"
              value={form.role}
              onChange={handleChange}
            >
              <option value="">Select Role</option>
              <option value="student">Student</option>
              <option value="teacher">Teacher</option>
            </select>
          </div>
          <button type="submit" className="w-full btn-gradient">
            Signup
          </button>
        </form>
      </div>
    </div>
  );
};

export default Signup;
