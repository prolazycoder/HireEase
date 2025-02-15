import express, { Express } from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import { authRoutes } from './routes/auth.routes';
import { interviewRoutes } from './routes/interview.routes';

// Load environment variables
dotenv.config();

const app: Express = express();

// Middleware
app.use(cors({
  origin: process.env.CORS_ORIGIN,
  credentials: true,
}));
app.use(express.json());

// Database Connection with better error handling
mongoose
  .connect(process.env.MONGODB_URI!)
  .then(() => {
    console.log("Connected to MongoDB:", process.env.MONGODB_URI);
    console.log("Connection state:", mongoose.connection.readyState);
  })
  .catch((err) => {
    console.error("MongoDB connection error details:", {
      error: err.message,
      code: err.code,
      uri: process.env.MONGODB_URI
    });
  });

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/interviews', interviewRoutes);

// Health check with DB status
app.get("/health", (req, res) => {
  res.json({ 
    status: "ok",
    dbState: mongoose.connection.readyState
  });
});

export default app;
