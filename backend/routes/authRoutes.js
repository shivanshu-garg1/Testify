const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/Users.js");

const router = express.Router();

router.post("/signup", async (req, res) => {
  const { name, email, password, role } = req.body;
  //   console.log(req.body);
  if (!name || !email || !password || !role) {
    return res.status(400).json({ message: "All fields required" });
  }
  if (typeof password !== "string" || password.length < 6) {
    return res
      .status(400)
      .json({ message: "Password too short. Minimum 6 characters required." });
  }

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email already is use" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ name, email, password: hashedPassword, role });
    await newUser.save();
    res.status(201).json({ message: "User registered Successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error, please try again later." });
  }
});

router.post('/login',async(req,res)=>{
    try{
        const {email,password} = req.body;
        const user = await User.findOne({email});
        if(!user){
            return res.status(400).json({error:"Invalid details"});
        }
        const isMatch = await bcrypt.compare(password,user.password);
        if(!isMatch){
            return res.status(400).json({error:"Invalid details"});
        }
        const token = jwt.sign({ id: user._id }, "MySecret", { expiresIn: "10s" });
        res.json({ message: "Login successful!", token });

    }
    catch (error) {
        console.error("Login Error:", error); 
        res.status(500).json({ error: "Internal Server Error" });
    }
})

module.exports = router;
