import express, { Application, Request, Response } from "express";
import cors from "cors";
import apiRoutes from "./routes";
import { errorHandler } from "./middlewares/errorHandler";
import { Logger } from "./utils/logger";

const app: Application = express();

// Middlewares
app.use(cors({
  origin: process.env.CLIENT_URL || "http://localhost:5173",
  credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Request logging middleware
app.use((req: Request, _res: Response, next) => {
  Logger.info(`Incoming request: ${req.method} ${req.originalUrl}`);
  next();
});

// API Routes
app.use("/api/v1", apiRoutes);

// Health check endpoint
app.get("/health", (_req: Request, res: Response) => {
  res.status(200).json({ status: "ok", timestamp: new Date().toISOString() });
});

// Global Error Handler
app.use(errorHandler);

export default app;

