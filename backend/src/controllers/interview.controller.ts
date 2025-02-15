import { RequestHandler } from "express";
import { Interview } from "../models/Interview";

export const interviewController = {
  createInterview: (async (req, res) => {
    try {
      const interview = await Interview.create({
        ...req.body,
        createdBy: req.user.id, // Will be set by auth middleware
      });
      void res.status(201).json({ interview });
    } catch (error) {
      console.error("Create interview error:", error);
      void res.status(500).json({ error: "Failed to create interview" });
    }
  }) as RequestHandler,

  getForthcomingInterviews: (async (req, res) => {
    try {
      const interviews = await Interview.find({
        createdBy: req.user.id,
        date: { $gte: new Date() },
        status: "scheduled",
      })
        .sort({ date: 1, startTime: 1 })
        .populate("createdBy", "name email");

      void res.status(200).json({ interviews });
    } catch (error) {
      console.error("Get interviews error:", error);
      void res.status(500).json({ error: "Failed to fetch interviews" });
    }
  }) as RequestHandler,

  updateInterview: (async (req, res) => {
    try {
      const interview = await Interview.findOneAndUpdate(
        { _id: req.params.id, createdBy: req.user.id },
        req.body,
        { new: true }
      );
      if (!interview) {
        void res.status(404).json({ error: "Interview not found" });
        return;
      }
      void res.status(200).json({ interview });
    } catch (error) {
      console.error("Update interview error:", error);
      void res.status(500).json({ error: "Failed to update interview" });
    }
  }) as RequestHandler,

  deleteInterview: (async (req, res) => {
    try {
      const interview = await Interview.findOneAndDelete({
        _id: req.params.id,
        createdBy: req.user.id,
      });
      if (!interview) {
        void res.status(404).json({ error: "Interview not found" });
        return;
      }
      void res.status(200).json({ message: "Interview deleted successfully" });
    } catch (error) {
      console.error("Delete interview error:", error);
      void res.status(500).json({ error: "Failed to delete interview" });
    }
  }) as RequestHandler,
}; 