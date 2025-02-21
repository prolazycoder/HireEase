import { RequestHandler } from "express";
import { Interview } from "../models/Interview";
import { emailService } from "../services/email.service";

export const interviewController = {
  createInterview: (async (req, res) => {
    try {
      const interview = await Interview.create({
        ...req.body,
        userId: req.user.id,
        status: "upcoming",
      });

      res.status(201).json({ interview });

      try {
        await emailService.sendInterviewScheduled(interview);
      } catch (emailError) {
        console.error("Failed to send email:", emailError);
      }
    } catch (error) {
      res.status(500).json({ error: "Failed to create interview" });
    }
  }) as RequestHandler,

  updateInterview: (async (req, res) => {
    try {
      const interview = await Interview.findOneAndUpdate(
        { _id: req.params.id, userId: req.user.id },
        { ...req.body },
        { new: true }
      );

      if (!interview) {
        return res.status(404).json({ error: "Interview not found" });
      }

      res.json({ interview });

      try {
        await emailService.sendInterviewUpdated(interview);
      } catch (emailError) {
        console.error("Failed to send email:", emailError);
      }
    } catch (error) {
      res.status(500).json({ error: "Failed to update interview" });
    }
  }) as RequestHandler,

  deleteInterview: (async (req, res) => {
    try {
      const interview = await Interview.findOne({
        _id: req.params.id,
        userId: req.user.id,
      });

      if (!interview) {
        return res.status(404).json({ error: "Interview not found" });
      }

      await Interview.deleteOne({ _id: req.params.id });

      // Send response first
      res.json({ message: "Interview deleted successfully" });

      // Handle email separately
      try {
        await emailService.sendInterviewCancelled(interview);
      } catch (emailError) {
        console.error("Failed to send email:", emailError);
      }
    } catch (error) {
      res.status(500).json({ error: "Failed to delete interview" });
    }
  }) as RequestHandler,

  getInterviews: (async (req, res) => {
    try {
      const { status, candidateName, currentDate, currentTime } = req.query;
      const query: any = { userId: req.user.id };

      if (candidateName) {
        query.candidateName = { $regex: candidateName, $options: "i" };
      }

      // Use UTC time from request params
      if (status === "upcoming") {
        query.$or = [
          { date: { $gt: currentDate } },
          {
            date: currentDate,
            startTime: { $gt: currentTime },
          },
        ];
      } else if (status === "ongoing") {
        query.$or = [
          {
            $and: [
              { date: currentDate },
              { startTime: { $lte: currentTime } }, // Started before current time
              { endTime: { $gt: currentTime } }, // Ends after current time
            ],
          },

          {
            $and: [
              { date: currentDate }, // Interview started today
              { startTime: { $lte: currentTime } }, // Started before current time
              { $expr: { $lt: ["$endTime", "$startTime"] } },
            ],
          },
          {
            $and: [
              { date: { $lt: currentDate } }, 
              { $expr: { $lt: ["$endTime", "$startTime"] } }, 
              { endTime: { $gt: currentTime } }, // Still ongoing
            ],
          },
        ];
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

      res.json({ interviews });
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch interviews" });
    }
  }) as RequestHandler,
};
