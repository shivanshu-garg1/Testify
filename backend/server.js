const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
const authRoutes = require("./routes/authRoutes.js");
const testRoutes = require("./routes/testRoutes");

require('dotenv').config();


const app = express();
const port = process.env.PORT
app.use(express.json());
app.use(cors());

connectDB();

app.use("/api/auth", authRoutes);
app.use("/api/tests", testRoutes);

app.listen(port, () => {
  console.log(`Server Started at https:localhost:${port}`);
});
