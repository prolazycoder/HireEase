import { RequestHandler } from "express";
import { Interview } from "../models/Interview";
import {
  getCurrentDateTime,
  convertToUTC,
  convertToLocal,
} from "../utils/dateTime";
import { emailService } from "../services/email.service";

export const interviewController = {
  createInterview: (async (req, res) => {
    try {
      // Convert input time to UTC
      const startTime = convertToUTC(req.body.date, req.body.startTime);
      const endTime = convertToUTC(req.body.date, req.body.endTime);

      const interview = await Interview.create({
        ...req.body,
        date: startTime.date,
        startTime: startTime.time,
        endTime: endTime.time,
        userId: req.user.id,
      });

      // Convert times back to local for response
      const localInterview = {
        ...interview.toObject(),
        date: convertToLocal(interview.date, interview.startTime).date,
        startTime: convertToLocal(interview.date, interview.startTime).time,
        endTime: convertToLocal(interview.date, interview.endTime).time,
      };

      res.status(201).json({ interview: localInterview });

      // Handle email separately
      try {
        await emailService.sendInterviewCreated(interview);
      } catch (emailError) {
        console.error("Failed to send email:", emailError);
      }
    } catch (error) {
      res.status(500).json({ error: "Failed to create interview" });
    }
  }) as RequestHandler,

  updateInterview: (async (req, res) => {
    try {
      // Convert input times to UTC
      const startTime = convertToUTC(req.body.date, req.body.startTime);
      const endTime = convertToUTC(req.body.date, req.body.endTime);

      const interview = await Interview.findOneAndUpdate(
        { _id: req.params.id, userId: req.user.id },
        {
          ...req.body,
          date: startTime.date,
          startTime: startTime.time,
          endTime: endTime.time,
        },
        { new: true }
      );

      if (!interview) {
        return res.status(404).json({ error: "Interview not found" });
      }

      // Convert times back to local for response
      const localInterview = {
        ...interview.toObject(),
        date: convertToLocal(interview.date, interview.startTime).date,
        startTime: convertToLocal(interview.date, interview.startTime).time,
        endTime: convertToLocal(interview.date, interview.endTime).time,
      };

      res.json({ interview: localInterview });

      // Handle email separately
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
      const { status, candidateName } = req.query;
      const query: any = { userId: req.user.id };

      if (candidateName) {
        query.candidateName = { $regex: candidateName, $options: "i" };
      }

      const { currentDate, currentTime } = getCurrentDateTime();

      // Filter by status using UTC times
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

      // Convert times to local for response
      const localInterviews = interviews.map((interview) => {
        const doc = interview.toObject();
        const local = {
          ...doc,
          date: convertToLocal(doc.date, doc.startTime).date,
          startTime: convertToLocal(doc.date, doc.startTime).time,
          endTime: convertToLocal(doc.date, doc.endTime).time,
        };
        return local;
      });

      res.json({ interviews: localInterviews });
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch interviews" });
    }
  }) as RequestHandler,
}; 
