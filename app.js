import express from "express";
import dotenv from "dotenv";
import { dbConnection } from "./database/dbConnection.js";
import jobRouter from "./router/jobRouter.js";
import userRouter from "./router/userRouter.js";
import applicationRouter from "./router/applicationRouter.js";
import cors from "cors";
import { errorMiddleware } from "./middlewares/error.js";
import cookieParser from "cookie-parser";
import fileUpload from "express-fileupload";
import os from "os";
import morgan from "morgan";

// Load environment variables from .env file
dotenv.config();

const app = express();
app.use((req, res, next) => {
  console.log(req.method, req.url);
  next();
});

// CORS configuration
app.use(
  cors({
    origin: [process.env.FRONTEND_URL],
    methods: ["GET", "POST", "DELETE", "PUT", "PATCH", "OPTIONS"],
    credentials: true,
  })
);

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));

// File upload configuration
app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: os.tmpdir(),
  })
);

// API routes
app.use("/api/user", userRouter);
app.use("/api/job", jobRouter);
app.use("/api/application", applicationRouter);

// Handle unrecognized routes
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "API endpoint not found",
  });
});

// Error handling middleware
app.use(errorMiddleware);

// Database connection and server startup
const PORT = 4000;
dbConnection()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error("Database connection failed:", error);
    process.exit(1);
  });

export default app;
