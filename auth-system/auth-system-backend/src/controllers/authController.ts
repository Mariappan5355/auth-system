import { Request, Response, NextFunction } from "express";
import AuthService from "../services/authService";
import { loginSchema, registerSchema } from "../validation/userValidation";

export const register = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const { email, password } = req.body;

  
    const { error } = registerSchema.validate(req.body);
    if (error) {
      res.status(400).json({ message: error.details[0].message });
      return;
    }

  try {
    const newUser = await AuthService.registerUser(email, password);
    res.status(201).json({ message: "User created successfully", user: newUser });
  } catch (error) {
    next(error);
  }
};

export const login = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const { email, password } = req.body;

  const { error } = loginSchema.validate(req.body);
  if (error) {
    res.status(400).json({ message: error.details[0].message });
    return;
  }
  
  try {
    const { token, user } = await AuthService.loginUser(email, password);
    res.json({ message: "Login successful", token, user });
  } catch (error) {
    next(error);
  }
};
