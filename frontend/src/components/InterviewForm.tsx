"use client";

import { useState } from "react";
import { TextField, Button } from "@mui/material";

interface InterviewFormProps {
  onSubmit: (data: InterviewFormData) => void;
  initialData?: InterviewFormData;
  buttonText?: string;
}

export interface InterviewFormData {
  title: string;
  candidateName: string;
  candidateEmail: string;
  date: string;
  startTime: string;
  endTime: string;
  description?: string;
}

export default function InterviewForm({ onSubmit, initialData, buttonText = "Schedule Interview" }: InterviewFormProps) {
  const [formData, setFormData] = useState<InterviewFormData>(
    initialData || {
      title: "",
      candidateName: "",
      candidateEmail: "",
      date: new Date().toISOString().split('T')[0],
      startTime: "09:00",
      endTime: "10:00",
      description: "",
    }
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <TextField
        fullWidth
        label="Interview Title"
        value={formData.title}
        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
        required
      />
      <TextField
        fullWidth
        label="Candidate Name"
        value={formData.candidateName}
        onChange={(e) => setFormData({ ...formData, candidateName: e.target.value })}
        required
      />
      <TextField
        fullWidth
        type="email"
        label="Candidate Email"
        value={formData.candidateEmail}
        onChange={(e) => setFormData({ ...formData, candidateEmail: e.target.value })}
        required
      />
      <TextField
        fullWidth
        type="date"
        label="Interview Date"
        value={formData.date}
        onChange={(e) => setFormData({ ...formData, date: e.target.value })}
        required
      />
      <div className="flex gap-4">
        <TextField
          type="time"
          label="Start Time"
          value={formData.startTime}
          onChange={(e) => setFormData({ ...formData, startTime: e.target.value })}
          required
        />
        <TextField
          type="time"
          label="End Time"
          value={formData.endTime}
          onChange={(e) => setFormData({ ...formData, endTime: e.target.value })}
          required
        />
      </div>
      <TextField
        fullWidth
        multiline
        rows={4}
        label="Description"
        value={formData.description}
        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
      />
      <Button type="submit" variant="contained" fullWidth>
        {buttonText}
      </Button>
    </form>
  );
} 