const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const authRoutes = require('./routes/authRoutes.js');


const app = express();
const PORT = 3000;
app.use(express.json());
app.use(cors({ origin: "https://your-frontend.vercel.app" }));



connectDB();

app.use("/api/auth", authRoutes); 

app.listen(PORT,()=>{
    console.log(`Server Started at https:localhost:${PORT}`);
})
