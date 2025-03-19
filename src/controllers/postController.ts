import { Request, Response } from "express";
import prisma from "../../config/prisma";
import { AuthenticatedRequest } from "../middleware/authMiddleware";

export const createPost = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
  try {
    const { title, content } = req.body;
    const userId = req.user?.userId;

    if (!userId) {
      res.status(401).json({ message: "User not authenticated" });
      return;
    }

    const post = await prisma.post.create({
      data: { title, content, authorId: userId },
    });

    res.status(201).json(post);
  } catch (error) {
    res.status(500).json({ error: "Something went wrong" });
  }
};

export const getOnePost = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const post = await prisma.post.findUnique({
      where: { id },
      include: { author: true },
    });

    if (!post) {
      res.status(404).json({ message: "Post not found" });
      return;
    }

    res.status(200).json(post);
  } catch (error) {
    res.status(500).json({ error: "Something went wrong" });
  }
};

export const getAllPosts = async (req: Request, res: Response): Promise<void> => {
  try {
    const posts = await prisma.post.findMany({
      include: { author: true },
    });

    res.status(200).json(posts);
  } catch (error) {
    res.status(500).json({ error: "Something went wrong" });
  }
};

export const updatePost = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const { title, content } = req.body;
    const userId = req.user?.userId;

    if (!userId) {
      res.status(401).json({ message: "User not authenticated" });
      return;
    }

    const post = await prisma.post.findUnique({ where: { id } });

    if (!post || post.authorId !== userId) {
      res.status(403).json({ message: "Not authorized to edit this post" });
      return;
    }

    const updatedPost = await prisma.post.update({
      where: { id },
      data: { title, content },
    });

    res.status(200).json(updatedPost);
  } catch (error) {
    res.status(500).json({ error: "Something went wrong" });
  }
};

export const deletePost = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const userId = req.user?.userId;

    if (!userId) {
      res.status(401).json({ message: "User not authenticated" });
      return;
    }

    const post = await prisma.post.findUnique({ where: { id } });

    if (!post || post.authorId !== userId) {
      res.status(403).json({ message: "Not authorized to delete this post" });
      return;
    }

    await prisma.post.delete({ where: { id } });

    res.status(200).json({ message: "Post deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Something went wrong" });
  }
};