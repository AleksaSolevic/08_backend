import express from "express";
import { createUser, getOneUser, getAllUsers, updateUser, deleteUser } from "../controllers/userController";
import { validateUser } from "../middleware/validateUser";
const router = express.Router();

router.post("/", validateUser, createUser);
router.get("/", getAllUsers);
router.get("/:id", getOneUser);
router.put("/:id",validateUser ,updateUser);
router.delete("/:id", deleteUser);

export default router;