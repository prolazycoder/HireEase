import nodemailer from 'nodemailer';
import { IInterviewDocument } from '../models/Interview';

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD,
  },
});

export const emailService = {
  async sendInterviewCreated(interview: IInterviewDocument) {
    const emailContent = `
      Dear ${interview.candidateName},
      
      Your interview has been scheduled for ${interview.date} at ${interview.startTime}.
      
      Interview Details:
      - Title: ${interview.title}
      - Date: ${interview.date}
      - Time: ${interview.startTime} - ${interview.endTime}
      ${interview.description ? `- Description: ${interview.description}` : ''}
      
      Best regards,
      Interview Scheduler
    `;

    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: interview.candidateEmail,
      subject: 'Interview Scheduled',
      text: emailContent,
    });
  },

  async sendInterviewUpdated(interview: IInterviewDocument) {
    const emailContent = `
      Dear ${interview.candidateName},
      
      Your interview has been updated.
      
      New Interview Details:
      - Title: ${interview.title}
      - Date: ${interview.date}
      - Time: ${interview.startTime} - ${interview.endTime}
      ${interview.description ? `- Description: ${interview.description}` : ''}
      
      Best regards,
      Interview Scheduler
    `;

    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: interview.candidateEmail,
      subject: 'Interview Updated',
      text: emailContent,
    });
  },

  async sendInterviewCancelled(interview: IInterviewDocument) {
    const emailContent = `
      Dear ${interview.candidateName},
      
      Your interview scheduled for ${interview.date} at ${interview.startTime} has been cancelled.
      
      Best regards,
      Interview Scheduler
    `;

    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: interview.candidateEmail,
      subject: 'Interview Cancelled',
      text: emailContent,
    });
  },
}; 