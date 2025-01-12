import { Request, Response, NextFunction } from "express";

export const checkAdminRole = (req: Request, res: Response, next: NextFunction): void => {
  if (req.user?.role !== "admin") {
     res.status(403).json({ message: "Admin role required" });
     return;
  }
  next();
};
