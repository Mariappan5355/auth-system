import bcrypt from "bcrypt";
import User from "../models/userModel";
import { generateToken } from "../utils/tokenUtils";

class AuthService {
  static async registerUser(email: string, password: string) {
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) throw new Error("User already exists");

    const hashedPassword = await bcrypt.hash(password, 10);
    const name = email.split('@')[0]; 
    return User.create({ email, password: hashedPassword, role: "user", name });
  }

  static async loginUser(email: string, password: string) {
    const user = await User.findOne({ where: { email } });
    if (!user) throw new Error("Invalid Email");

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) throw new Error("Invalid password");

    const token = generateToken(user.id, user.role);
    return { token, user };
  }
}

export default AuthService;
