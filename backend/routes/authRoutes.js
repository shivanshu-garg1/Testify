const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/Users.js");
require("dotenv").config();


const router = express.Router();

router.post("/signup", async (req, res) => {
  const { name, email, password, role, batch } = req.body;
  //   console.log(req.body);
  if (!name || !email || !password || !role) {
    return res.status(400).json({ message: "All fields required" });
  }

  if (role === "student" && !batch) {
    return res.status(400).json({ message: "Batch is required" });
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
    const newUser = new User({
      name,
      email,
      password: hashedPassword,
      role,
      ...(role === "student" && { batch }),
    });
    await newUser.save();
    res.status(201).json({ message: "User registered Successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error, please try again later." });
  }
});

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ error: "Email not Registered" });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ error: "Password is incorrect" });
    }
    const expiresIn = 24 * 60 * 60;
    const MySecret = process.env.JWT_SECRET;
    const token = jwt.sign(
      { id: user._id, role: user.role, name: user.name, batch: user.batch },
      MySecret,
      { expiresIn: expiresIn }
    );
    res.json({
      message: "Login successful!",
      token,
      expiresIn: expiresIn,
      role: user.role,
      name: user.name,
      ...(user.role === "student" && { batch: user.batch }),
    });
  } catch (error) {
    console.error("Login Error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;
