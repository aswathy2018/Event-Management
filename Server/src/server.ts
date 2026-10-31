import mongoose from "mongoose";
import app from "./app";
import { Logger } from "./utils/logger";

const PORT = process.env.PORT || 5000;
const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost:27017/elan_weddings";

const startServer = async (): Promise<void> => {
  try {
    await mongoose.connect(MONGODB_URI);
    Logger.info("Connected to MongoDB successfully");

    app.listen(PORT, () => {
      Logger.info(`Server is running on port ${PORT}`);
    });
  } catch (error) {
    Logger.error("Failed to start server:", error);
    process.exit(1);
  }
};

startServer();

