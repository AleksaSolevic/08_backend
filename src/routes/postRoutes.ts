import express from "express";
import { createPost, getAllPosts, getOnePost, updatePost, deletePost } from "../controllers/postController";
import { authenticateUser } from "../middleware/authMiddleware";


const router = express.Router();

router.post("/", authenticateUser, createPost);
router.get("/", getAllPosts);
router.get("/:id", getOnePost);
router.put("/:id",authenticateUser,  updatePost);
router.delete("/:id",authenticateUser, deletePost);

export default router;