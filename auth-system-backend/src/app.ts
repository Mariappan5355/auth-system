import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import swaggerUi from "swagger-ui-express";
import swaggerJsdoc from "swagger-jsdoc";
import authRoutes from "./routes/authRoutes";
import adminRoutes from "./routes/adminRoutes";
import userRoutes from "./routes/userRoutes";
import sequelize from "./config/database";
import { errorHandlerMiddleware } from "./middlewares/errorHandlerMiddleware";

// Initialize express
const app = express();

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "My API",
      version: "1.0.0",
      description: "API documentation for the application",
    },
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
    },
  },
  apis: ["./dist/routes/**/*.js"], // Change this to the compiled path
};

const swaggerSpec = swaggerJsdoc(options);

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Swagger UI route
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

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
