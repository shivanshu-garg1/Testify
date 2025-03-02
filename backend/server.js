const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const authRoutes = require('./routes/authRoutes.js');


const app = express();
const PORT = 3000;
app.use(express.json());
app.use(cors({
    origin: "https://testify-iota.vercel.app/", // Replace with your frontend URL
    methods: "GET,POST,PUT,DELETE",
    credentials: true // If using cookies/auth
}));



connectDB();

app.use("/api/auth", authRoutes); 

app.listen(PORT,()=>{
    console.log(`Server Started at https:localhost:${PORT}`);
})
