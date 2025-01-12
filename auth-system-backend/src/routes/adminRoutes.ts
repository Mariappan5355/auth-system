import express from "express";
import { getUsers, updateUser } from "../controllers/adminController";
import { authenticate } from "../middlewares/authMiddleware";
import { checkAdminRole } from "../middlewares/checkAdminMiddleware";

const router = express.Router();

/**
 * @swagger
 * /api/admin/users:
 *   get:
 *     summary: Get all users
 *     tags: [Admin]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of users
 *       403:
 *         description: Forbidden, only admin can access
 */
router.get("/users", authenticate, checkAdminRole, getUsers);

/**
 * @swagger
 * /api/admin/users/{userId}/update:
 *   put:
 *     summary: Update user information
 *     tags: [Admin]
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         description: The ID of the user to update
 *         schema:
 *           type: string
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               name:
 *                 type: string
 *               role:
 *                 type: string
 *               isActive:
 *                 type: boolean
 *     responses:
 *       200:
 *         description: User updated successfully
 *       400:
 *         description: Bad request, invalid data format
 *       403:
 *         description: Forbidden, only admin can access
 *       404:
 *         description: User not found
 */
router.put("/users/:userId/update", authenticate, checkAdminRole, updateUser);


export default router;
