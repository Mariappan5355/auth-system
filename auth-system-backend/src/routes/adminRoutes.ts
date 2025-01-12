import express from "express";
import { getUsers, updateUser } from "../controllers/adminController";
import { authenticate } from "../middlewares/authMiddleware";
import { checkAdminRole } from "../middlewares/checkAdminMiddleware";

const router = express.Router();

router.get("/users",authenticate,checkAdminRole, getUsers);
router.put("/users/:userId/update", authenticate,checkAdminRole, updateUser);

export default router;