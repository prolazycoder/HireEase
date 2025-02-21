import nodemailer from "nodemailer";
import { IInterview } from "../models/Interview";

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASSWORD,
  },
});

export const emailService = {
  async sendInterviewScheduled(interview: IInterview) {
    const emailContent = `
      <h2>Interview Scheduled</h2>
      <p>Dear ${interview.candidateName},</p>
      <p>Your interview has been scheduled:</p>
      <ul>
        <li><strong>Title:</strong> ${interview.title}</li>
        <li><strong>Date:</strong> ${interview.date} <strong>(UTC)</strong></li>
        <li><strong>Time:</strong> ${interview.startTime} - ${
      interview.endTime
    } <strong>(UTC)</strong></li>
      </ul>
      <p>${interview.description || ""}</p>
      <p>Best regards,<br>HireEase Team</p>
    `;

    await transporter.sendMail({
      from: process.env.SMTP_USER,
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
        <li><strong>Title:</strong> ${interview.title}</li>
        <li><strong>Date:</strong> ${interview.date} <strong>(UTC)</strong></li>
        <li><strong>Time:</strong> ${interview.startTime} - ${
      interview.endTime
    } <strong>(UTC)</strong></li>
      </ul>
      <p>${interview.description || ""}</p>
      <p>Best regards,<br>HireEase Team</p>
    `;

    await transporter.sendMail({
      from: process.env.SMTP_USER,
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
        <li><strong>Title:</strong> ${interview.title}</li>
        <li><strong>Date:</strong> ${interview.date} <strong>(UTC)</strong></li>
        <li><strong>Time:</strong> ${interview.startTime} - ${interview.endTime} <strong>(UTC)</strong></li>
      </ul>
      <p>Best regards,<br>HireEase Team</p>
    `;

    await transporter.sendMail({
      from: process.env.SMTP_USER,
      to: interview.candidateEmail,
      subject: `Interview Cancelled: ${interview.title}`,
      html: emailContent,
    });
  },
};
