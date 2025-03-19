import express from "express";
import cors from "cors";
import userRouter from "./src/routes/userRoutes";
import postRouter from "./src/routes/postRoutes";
import authRouter from "./src/routes/authRoutes";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.use("/users", userRouter);
app.use("/posts", postRouter);
app.use("/auth", authRouter);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});