import mongoose, { Document } from "mongoose";

export interface IInterview extends Document {
  title: string;
  candidateName: string;
  candidateEmail: string;
  date: Date;
  startTime: string;
  endTime: string;
  description?: string;
  status: "scheduled" | "completed" | "cancelled";
  createdBy: mongoose.Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

const interviewSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  candidateName: {
    type: String,
    required: true,
  },
  candidateEmail: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  startTime: {
    type: String,
    required: true,
  },
  endTime: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  status: {
    type: String,
    enum: ["scheduled", "completed", "cancelled"],
    default: "scheduled",
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
}, {
  timestamps: true,
});

export const Interview = mongoose.model<IInterview>("Interview", interviewSchema); 