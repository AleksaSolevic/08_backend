import { Request, Response } from "express";
import prisma from "../../config/prisma";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const SECRET_KEY = process.env.JWT_SECRET as string;


console.log("SECRET_KEY", SECRET_KEY);

if (!SECRET_KEY) {
  throw new Error("JWT_SECRET is not defined in .env file");
}

export const loginUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, password } = req.body;
    const user = await prisma.user.findUnique({ where: { email } });

    if (!user || !(await bcrypt.compare(password, user.password))) {
      res.status(400).json({ message: "Invalid email or password" });
      return;
    }

    const token = jwt.sign({ userId: user.id }, SECRET_KEY, { expiresIn: "1h" });
    res.json({ token, user });
  } catch (error: any) {
    res.status(500).json({ error: error.message || "Something went wrong" });
  }
};