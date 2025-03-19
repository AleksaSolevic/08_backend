import express from "express";
import { createPost, getAllPosts, getOnePost, updatePost, deletePost } from "../controllers/postController";


const router = express.Router();

router.post("/", createPost);
router.get("/", getAllPosts);
router.get("/:id", getOnePost);
router.put("/:id",  updatePost);
router.delete("/:id",  deletePost);

export default router;