import bcrypt from "bcrypt";
import User from "../models/userModel";
import { Op } from "sequelize";

class UserService {
    static async getUsers(currentUserId: number) {
        return User.findAll({
            where: { id: { [Op.ne]: currentUserId } }
        });
    }

    static async updateUser(userId: string, updatedData: any) {
        const user = await User.findByPk(userId);
        if (!user) throw new Error("User not found");
        if (updatedData.password) {
            updatedData.password = await bcrypt.hash(updatedData.password, 10);
        }
        await user.update(updatedData);
        return user;
    }

    static async getUserProfile(userId: number) {
        const user = await User.findByPk(userId);
        if (!user) throw new Error("User not found");
        return user;
    }

    static async updateUserProfile(userId: string | number, updatedData: any) {
        const user = await User.findByPk(userId);
        if (!user) throw new Error("User not found");
        if (updatedData.email) user.email = updatedData.email;
        if (updatedData.name) user.name = updatedData.name;
        await user.save();

        return user;
    }

    static async changePassword(userId: number, currentPassword: string, newPassword: string) {
        const user = await User.findByPk(userId);
        if (!user) throw new Error("User not found");

        const isMatch = await bcrypt.compare(currentPassword, user.password);
        if (!isMatch) throw new Error("Current password is incorrect");

        user.password = await bcrypt.hash(newPassword, 10);
        await user.save();
    }
}

export default UserService;
