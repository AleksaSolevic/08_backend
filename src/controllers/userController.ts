import { Request, Response } from "express";
import prisma from "../../config/prisma";
import bcrypt from "bcrypt";

export const createUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const { name, email, password } = req.body;

    const existingUser = await prisma.user.findUnique({
      where: { email },
    });
    if (existingUser) {
      res.status(409).json({ error: "User already exists" });
      return;
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await prisma.user.create({
      data: { name, email, password: hashedPassword },
    });
    res.status(201).json({ message: "User created successfully", user });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const getAllUsers = async (req: Request, res: Response): Promise<void> => {
  try {
    const users = await prisma.user.findMany();
    if (!users) {
      res.status(400).json({ message: `Users not found` });
      return;
    }
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const getOneUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const user = await prisma.user.findUnique({ where: { id } });
    if (!user) {
      res.status(400).json({ message: `User not found` });
      return;
    }
    res.status(200).json({ message: `User found`, user });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const updateUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const { name, email, password } = req.body;
    const user = await prisma.user.findUnique({ where: { id } });
    if (!user) {
      res.status(400).json({ message: `User not found` });
      return;
    }
    const hashedPassword = password ? await bcrypt.hash(password, 10) : undefined;
    const updatedUser = await prisma.user.update({
      where: { id },
      data: { name, email, password: hashedPassword },
    });
    res.status(200).json({ message: `User updated successfully`, updatedUser });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const deleteUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const user = await prisma.user.findUnique({ where: { id } });
    if (!user) {
      res.status(400).json({ message: `User not found` });
      return;
    }
    await prisma.user.delete({ where: { id } });
    res.status(200).json({ message: `User deleted successfully` });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};