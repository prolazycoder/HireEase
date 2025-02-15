import mongoose from 'mongoose';

export interface IInterview {
  title: string;
  candidateName: string;
  candidateEmail: string;
  date: string;
  startTime: string;
  endTime: string;
  description?: string;
  status: "upcoming" | "ongoing" | "completed";
  userId: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface IInterviewDocument extends IInterview, mongoose.Document {}

const interviewSchema = new mongoose.Schema<IInterviewDocument>({
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
    type: String,
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
  userId: {
    type: String,
    required: true,
    index: true,
  }
}, {
  timestamps: true,
});

interviewSchema.index({ userId: 1, date: 1 });

export const Interview = mongoose.model<IInterviewDocument>("Interview", interviewSchema); 