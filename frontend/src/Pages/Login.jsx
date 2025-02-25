import React, { useState } from "react";
import Navbar from "../components/Navbar";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import V1 from "../assets/video.mp4";

const Login = () => {
  const navigate = useNavigate();
  const [post, setPost] = useState({
    email: "",
    password: "",
  });

  const handleInput = (event) => {
    setPost({ ...post, [event.target.name]: event.target.value });
  };

  const validateForm = () => {
    if (!post.email.includes("@")) {
      toast.error("Email must be a valid @ address");
      return false;
    }
    if (post.password.length < 3) {
      toast.error("Password must be at least 3 characters long");
      return false;
    }
    return true;
  };

  const submitHandle = async (event) => {
    event.preventDefault();
    if (!validateForm()) return;

    try {
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };
      console.log(post);
      const { data } = await axios.post(
        "http://localhost:7000/api/user/login",
        post,
        config
      );
      toast.success("Login successfully");
      localStorage.setItem("userInfo", JSON.stringify(data));
      setTimeout(() => navigate("/afterlogin"), 1500);
    } catch (error) {
      toast.error("Login failed. Please check your credentials.");
      console.log("Error from login page: " + error);
    }
  };

  return (
    <div className="relative w-full h-screen flex items-center justify-center bg-[#0d0225] ">
      

      {/* Login Form */}
      <div className="relative z-10 bg-[#0d0225] text-purple-100 bg-opacity-90 p-10 rounded-xl border-2 border-purple-100 shadow-lg  w-[90%] max-w-md">
        <h2 className="text-2xl  font-bold text-center mb-5">Login</h2>
        <form onSubmit={submitHandle} className="space-y-5">
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
              onChange={handleInput}
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
              onChange={handleInput}
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
