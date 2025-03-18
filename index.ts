import express from "express";
import cors from "cors";
import userRouter from "./src/routes/userRoutes";

import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.use("/users", userRouter);


app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});