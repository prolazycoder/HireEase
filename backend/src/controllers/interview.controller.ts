import { RequestHandler } from "express";
import { Interview } from "../models/Interview";

export const interviewController = {
  createInterview: (async (req, res) => {
    try {
      const interview = await Interview.create({
        ...req.body,
        userId: req.user._id // Add user ID from auth
      });
      void res.status(201).json({ interview });
    } catch (error) {
      void res.status(500).json({ error: "Failed to create interview" });
    }
  }) as RequestHandler,

  getForthcomingInterviews: (async (req, res) => {
    try {
      const interviews = await Interview.find({
        userId: req.user._id, // Filter by user ID
        date: { $gte: new Date().toISOString().split('T')[0] },
        status: "scheduled"
      })
        .sort({ date: 1, startTime: 1 });

      void res.json({ interviews });
    } catch (error) {
      void res.status(500).json({ error: "Failed to fetch interviews" });
    }
  }) as RequestHandler,

  updateInterview: (async (req, res) => {
    try {
      const interview = await Interview.findOneAndUpdate(
        { 
          _id: req.params.id,
          userId: req.user._id // Ensure user owns the interview
        },
        req.body,
        { new: true }
      );
      if (!interview) {
        void res.status(404).json({ error: "Interview not found" });
        return;
      }
      void res.json({ interview });
    } catch (error) {
      void res.status(500).json({ error: "Failed to update interview" });
    }
  }) as RequestHandler,

  deleteInterview: (async (req, res) => {
    try {
      const interview = await Interview.findOneAndDelete({
        _id: req.params.id,
        userId: req.user._id // Ensure user owns the interview
      });
      if (!interview) {
        void res.status(404).json({ error: "Interview not found" });
        return;
      }
      void res.json({ message: "Interview deleted successfully" });
    } catch (error) {
      void res.status(500).json({ error: "Failed to delete interview" });
    }
  }) as RequestHandler
}; 