import { DataTypes, Model, CreationOptional } from "sequelize";
import sequelize from "../config/database";

class User extends Model {
  declare id: CreationOptional<number>;
  declare email: string;
  declare name: string;
  declare password: string;
  declare role: "user" | "admin";
  declare isActive: CreationOptional<boolean>;

  declare readonly created_at?: Date;
  declare readonly updated_at?: Date;
}

User.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
      },
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: false,
      },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    role: {
      type: DataTypes.ENUM("user", "admin"),
      defaultValue: "user",
    },
    isActive: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
  },
  {
    sequelize,
    tableName: "users",
    timestamps: true,
    createdAt: "created_at",
    updatedAt: "updated_at",
  }
);

export default User;
    