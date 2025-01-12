    import express from "express";
    import { changePassword, getUserProfile, updateUserProfile } from "../controllers/userController";
    import { authenticate } from "../middlewares/authMiddleware";

    const router = express.Router();

    router.get("/profile", authenticate, getUserProfile);
    router.put("/profile", authenticate, updateUserProfile);
    router.put("/change-password", authenticate, changePassword);

    export default router;
