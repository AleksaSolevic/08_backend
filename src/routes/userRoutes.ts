import express from "express";
import { createUser, getOneUser, getAllUsers, updateUser, deleteUser } from "../controllers/userController";

const router = express.Router();

router.post("/", createUser);
router.get("/", getAllUsers);
router.get("/:id", getOneUser);
router.put("/:id", updateUser);
router.delete("/:id", deleteUser);

export default router;