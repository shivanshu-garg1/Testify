const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const authRoutes = require('./routes/authRoutes.js');const testRoutes = require("./routes/testRoutes");




const app = express();
const PORT = 3000;
app.use(express.json());
app.use(cors());



connectDB();

app.use("/api/auth", authRoutes);
app.use("/api/tests", testRoutes); 

app.listen(PORT,()=>{
    console.log(`Server Started at https:localhost:${PORT}`);
})
