import { Request, Response, NextFunction } from "express";
import UserService from "../services/userService";
import User from "../models/userModel";
import { updateUserSchema } from "../validation/userValidation";


declare global {
  namespace Express {
    interface Request {
      user?: User; // Add user property with the optional User type
    }
  }
}

export const getUsers = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {

    const userId = req.user?.id;
    
    if (!userId) {
      res.status(400).json({ message: "User ID not found" });
      return;
    }
    const users = await UserService.getUsers(userId);
    res.json({ users });
  } catch (error) {
    next(error);
  }
};

export const updateUser = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const { userId } = req.params;
  const { name, email, password, role, isActive } = req.body;


      const { error } = updateUserSchema.validate(req.body);
      if (error) {
        res.status(400).json({ message: error.details[0].message });
        return;
      }

  try {
    const updatedUser = await UserService.updateUser(userId, { name, email, password, role, isActive });
    res.json({ message: "User details updated", user: updatedUser });
  } catch (error) {
    next(error);
  }
};
