  import React, { useState } from "react";

  import {Link,useNavigate} from 'react-router-dom';

  const Login = () => {
    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");
    const navigate = useNavigate();

    const handelSubmit = async(e)=>{
      e.preventDefault();
      try{
        
        const res = await fetch("http://localhost:3000/api/auth/login",{
          method:"POST",
          headers:{"Content-Type":"application/json"},
          body:JSON.stringify({email,password})
        })
        const data = await res.json();
        if (!res.ok || data.error || !data.token) {
          alert(data.error || data.message || "Invalid credentials. Please try again.");
          return;
        }
        
        // alert("Login successful");

      
      localStorage.setItem("token", data.token);

      
      let role = data.role;
      if (role === "student") {
        navigate("/student");
      } else if (role === "teacher") {
        navigate("/teacher");
      }

        const expireInMs = data.expiresIn * 1000;
        setTimeout(() => {
          alert("Your session has expired. Please log in again.");
          navigate("/login")
        },expireInMs); // 10 seconds
        
    
      }
      catch(error){
        alert(error.message || "Login Failed");
      }
    };

    return (
      <>
      
        <div className="relative w-full h-screen flex items-center justify-center  bg-white ">
          {/* Login Form */}
          <div className="relative z-10 bg-white text-black bg-opacity-90 p-10 rounded-xl  shadow-purple-600 shadow-2xl  w-[90%] max-w-md">
            <h2 className="text-2xl  font-bold text-center mb-5 bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-indigo-600">Login</h2>
            <form className="space-y-5" onSubmit={handelSubmit}>
              <div>
                <label htmlFor="email" className=" block mb-1 bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-indigo-600 font-semibold">
                  Enter Email
                </label>
                <input
                  type="email"
                  className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:border-purple-500"
                  id="email"
                  name="email"
                  value={email}
                  onChange={(e)=>setEmail(e.target.value)}
                  placeholder="Enter email"
                  required
                />
              </div>
              <div>
                <label htmlFor="password" className="block mb-1 bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-indigo-600 font-semibold">
                  Enter Password
                </label>
                <input
                  type="password"
                  className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:border-purple-500"
                  id="password"
                  name="password"
                  placeholder="Enter password"
                  value={password}
                  onChange={(e)=>setPassword(e.target.value)}
                  required
                />
              </div>
              <button
                type="submit"
                className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-800 text-white font-semibold py-2 rounded-md"
              >
                Login
              </button>
            </form>
            <div className="text-center pt-4 bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-indigo-600 font-semibold">
            <Link to="/" className="">Go Back to Landing page</Link>
            </div>
          </div>
        </div>
      </>
    );
  };

  export default Login;
