import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./src/config/db.js";
//router
import AuthRouter from "./src/routes/auth.route.js";
import UserRouter from "./src/routes/user.route.js";

dotenv.config();

const app = express();

app.use(express.json());

connectDB();

app.get("/", (req, res) => {
  res.send("API Running");
});

app.use("/auth",AuthRouter);
app.use("/user",UserRouter);

app.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT}`);
});
