import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import authRoutes from "./routes/authRoutes";
import adminRoutes from "./routes/adminRoutes";
import sequelize from "./config/database";
import userRoutes from "./routes/userRoutes";
import { errorHandlerMiddleware } from "./middlewares/errorHandlerMiddleware";

const app = express();

app.use(cors());
app.use(bodyParser.json());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);
app.use("/api/admin", adminRoutes);

// Global Error Handler
app.use(errorHandlerMiddleware);

// Server Setup
sequelize
  .authenticate()
  .then(() => console.log("Database connected!"))
  .catch((error: any) => console.error("Error connecting to the database", error));

export default app;
