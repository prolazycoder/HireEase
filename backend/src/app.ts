import express, { Express } from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import { authRoutes } from './routes/auth.routes';

// Load environment variables
dotenv.config();

const app: Express = express();

// Middleware
app.use(cors({
  origin: process.env.CORS_ORIGIN,
  credentials: true,
}));
app.use(express.json());

// Database Connection
mongoose
  .connect(process.env.MONGODB_URI!)
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("MongoDB connection error:", err));

// Basic route
app.get("/health", (req, res) => {
  res.json({ status: "ok" });
});

app.use('/api/auth', authRoutes);

export default app;
