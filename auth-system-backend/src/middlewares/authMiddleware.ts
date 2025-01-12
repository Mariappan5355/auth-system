import { Request, Response, NextFunction } from "express";
import { verifyToken } from "../utils/tokenUtils";
import User from "../models/userModel";

// Auth middleware to authenticate the user
export const authenticate = (req: Request, res: Response, next: NextFunction): void => {
  const token = req.headers.authorization?.split(" ")[1];
  
  if (!token) {
    res.status(401).json({ message: "Authentication required" });
    return;
  }

  try {
    const decoded = verifyToken(token);
    req.user = decoded as User;
    next();
  } catch (error) {
     res.status(403).json({ message: "Invalid or expired token" });
     return;
  }
};
