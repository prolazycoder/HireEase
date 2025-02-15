import { RequestHandler } from "express";
import { Interview } from "../models/Interview";

export const interviewController = {
  createInterview: (async (req, res) => {
    try {
      const interview = await Interview.create({
        ...req.body,
        userId: req.user.id,
        status: "upcoming",
      });
      void res.status(201).json({ interview });
    } catch (error) {
      void res.status(500).json({ error: "Failed to create interview" });
    }
  }) as RequestHandler,

  getForthcomingInterviews: (async (req, res) => {
    try {
      const interviews = await Interview.find({
        userId: req.user.id,
        date: { $gte: new Date().toISOString().split("T")[0] },
        status: "scheduled",
      }).sort({ date: 1, startTime: 1 });

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
          userId: req.user.id,
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
        userId: req.user.id,
      });
      if (!interview) {
        void res.status(404).json({ error: "Interview not found" });
        return;
      }
      void res.json({ message: "Interview deleted successfully" });
    } catch (error) {
      void res.status(500).json({ error: "Failed to delete interview" });
    }
  }) as RequestHandler,

  getInterviews: (async (req, res) => {
    try {
      const { status, candidateName } = req.query;
      const query: any = { userId: req.user.id };

      // Filter by candidate name if provided
      if (candidateName) {
        query.candidateName = { $regex: candidateName, $options: "i" };
      }

      // Get current date and time
      const now = new Date();
      const currentDate = now.toISOString().split("T")[0];
      const currentTime = now.toTimeString().split(" ")[0];

      // Filter by status
      if (status === "upcoming") {
        query.$or = [
          { date: { $gt: currentDate } },
          {
            date: currentDate,
            startTime: { $gt: currentTime },
          },
        ];
      } else if (status === "ongoing") {
        query.date = currentDate;
        query.startTime = { $lte: currentTime };
        query.endTime = { $gt: currentTime };
      } else if (status === "completed") {
        query.$or = [
          { date: { $lt: currentDate } },
          {
            date: currentDate,
            endTime: { $lte: currentTime },
          },
        ];
      }

      const interviews = await Interview.find(query)
        .sort({ date: 1, startTime: 1 })
        .exec();

      // Add dynamic status to each interview
      const interviewsWithStatus = interviews.map((interview) => {
        const doc = interview.toObject();
        if (
          doc.date < currentDate ||
          (doc.date === currentDate && doc.endTime <= currentTime)
        ) {
          doc.status = "completed";
        } else if (
          doc.date > currentDate ||
          (doc.date === currentDate && doc.startTime > currentTime)
        ) {
          doc.status = "upcoming";
        } else {
          doc.status = "ongoing";
        }
        return doc;
      });

      res.json({ interviews: interviewsWithStatus });
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch interviews" });
    }
  }) as RequestHandler,
};
