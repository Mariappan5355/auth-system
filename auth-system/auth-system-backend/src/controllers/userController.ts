import { Request, Response, NextFunction } from "express";
import UserService from "../services/userService";
import { updateUserPasswordSchema, updateUserProfileSchema } from "../validation/userValidation";

// Helper function to handle user ID validation
const validateUserId = (req: Request, res: Response): number | null => {
  const userId = req.user?.id;
  if (!userId) {
    res.status(400).json({ message: "User ID not found" });
    return null;
  }
  return userId;
};

export const getUserProfile = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const userId = validateUserId(req, res);
  if (!userId) return;
  
  try {
    const user = await UserService.getUserProfile(userId);
    res.json({ user });
  } catch (error) {
    next(error);
  }
};

export const updateUserProfile = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const userId = validateUserId(req, res);
  if (!userId) return;


  const { error } = updateUserProfileSchema.validate(req.body);
  if (error) {
    res.status(400).json({ message: error.details[0].message });
    return;
  }
  
  const { email, name } = req.body;
  
  try {
    const updatedUser = await UserService.updateUserProfile(userId, { email, name });
    res.json({ message: "Profile updated", user: updatedUser });
  } catch (error) {
    next(error);
  }
};

export const changePassword = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const userId = validateUserId(req, res);
  if (!userId) return;

  const { error } = updateUserPasswordSchema.validate(req.body);
  if (error) {
    res.status(400).json({ message: error.details[0].message });
    return;
  }
  
  const { currentPassword, newPassword } = req.body;

  try {
    await UserService.changePassword(userId, currentPassword, newPassword);
    res.json({ message: "Password updated successfully" });
  } catch (error) {
    next(error);
  }
};
