import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";
import cors from "cors";
import cookieParser from "cookie-parser";
import "./config/redis.js"; //integrating redis for load balancing

//router
import AuthRouter from "./routes/auth.route.js";
import UserRouter from "./routes/user.route.js";
import ResumeRouter from "./routes/resume.route.js"

dotenv.config();

const app = express();

app.use(
  cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
  })
);

app.use(express.json());
app.use(cookieParser());
connectDB();

app.get("/", (req, res) => {
  res.send("API Running");
});

app.use("/auth",AuthRouter);
app.use("/user",UserRouter);
app.use("/resume",ResumeRouter);

app.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT}`);
});
