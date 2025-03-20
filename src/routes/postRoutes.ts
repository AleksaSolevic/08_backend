import express from "express";
import { createPost, getAllPosts, getOnePost, updatePost, deletePost } from "../controllers/postController";
import { authenticateUser } from "../middleware/authMiddleware";
import { validatePost } from "../middleware/validatePost";


const router = express.Router();

router.post("/", authenticateUser, validatePost, createPost);
router.get("/", getAllPosts);
router.get("/:id", getOnePost);
router.put("/:id",authenticateUser, validatePost, updatePost);
router.delete("/:id",authenticateUser, validatePost, deletePost);

export default router;