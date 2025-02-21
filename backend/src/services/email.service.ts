import nodemailer from "nodemailer";
import { IInterview } from "../models/Interview";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    type: "OAuth2",
    user: process.env.EMAIL_USER,
    clientId: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    refreshToken: process.env.GMAIL_REFRESH_TOKEN,
  },
});

export const emailService = {
  async sendInterviewScheduled(interview: IInterview) {
    const emailContent = `
      <h2>Interview Scheduled</h2>
      <p>Dear ${interview.candidateName},</p>
      <p>Your interview has been scheduled:</p>
      <ul>
        <li>Title: ${interview.title}</li>
        <li>Date: ${interview.date}</li>
        <li>Time: ${interview.startTime} - ${interview.endTime}</li>
      </ul>
      <p>${interview.description || ""}</p>
      <p>Best regards,<br>HireEase Team</p>
    `;

    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: interview.candidateEmail,
      subject: `Interview Scheduled: ${interview.title}`,
      html: emailContent,
    });
  },

  async sendInterviewUpdated(interview: IInterview) {
    const emailContent = `
      <h2>Interview Updated</h2>
      <p>Dear ${interview.candidateName},</p>
      <p>Your interview has been updated:</p>
      <ul>
        <li>Title: ${interview.title}</li>
        <li>Date: ${interview.date}</li>
        <li>Time: ${interview.startTime} - ${interview.endTime}</li>
      </ul>
      <p>${interview.description || ""}</p>
      <p>Best regards,<br>HireEase Team</p>
    `;

    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: interview.candidateEmail,
      subject: `Interview Updated: ${interview.title}`,
      html: emailContent,
    });
  },

  async sendInterviewCancelled(interview: IInterview) {
    const emailContent = `
      <h2>Interview Cancelled</h2>
      <p>Dear ${interview.candidateName},</p>
      <p>Your interview has been cancelled:</p>
      <ul>
        <li>Title: ${interview.title}</li>
        <li>Date: ${interview.date}</li>
        <li>Time: ${interview.startTime} - ${interview.endTime}</li>
      </ul>
      <p>Best regards,<br>HireEase Team</p>
    `;

    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: interview.candidateEmail,
      subject: `Interview Cancelled: ${interview.title}`,
      html: emailContent,
    });
  },
};
