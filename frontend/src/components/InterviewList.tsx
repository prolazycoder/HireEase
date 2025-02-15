"use client";

import { useState } from "react";
import { 
  Card, 
  CardContent, 
  Typography, 
  Button, 
  Dialog,
  IconButton
} from "@mui/material";
import { Edit, Delete } from "@mui/icons-material";
import InterviewForm, { InterviewFormData } from "./InterviewForm";

interface Interview extends InterviewFormData {
  _id: string;
  status: "scheduled" | "completed" | "cancelled";
}

interface InterviewListProps {
  interviews: Interview[];
  onEdit: (id: string, data: InterviewFormData) => void;
  onDelete: (id: string) => void;
}

export default function InterviewList({ interviews, onEdit, onDelete }: InterviewListProps) {
  const [editInterview, setEditInterview] = useState<Interview | null>(null);

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="space-y-4">
      {interviews.map((interview) => (
        <Card key={interview._id}>
          <CardContent className="flex justify-between">
            <div>
              <Typography variant="h6">{interview.title}</Typography>
              <Typography color="textSecondary">
                {formatDate(interview.date)}
              </Typography>
              <Typography>
                {interview.startTime} - {interview.endTime}
              </Typography>
              <Typography>Candidate: {interview.candidateName}</Typography>
            </div>
            <div className="flex gap-2">
              <IconButton onClick={() => setEditInterview(interview)}>
                <Edit />
              </IconButton>
              <IconButton onClick={() => onDelete(interview._id)}>
                <Delete />
              </IconButton>
            </div>
          </CardContent>
        </Card>
      ))}

      <Dialog 
        open={!!editInterview} 
        onClose={() => setEditInterview(null)}
        maxWidth="sm"
        fullWidth
      >
        {editInterview && (
          <div className="p-4">
            <InterviewForm
              initialData={editInterview}
              onSubmit={(data) => {
                onEdit(editInterview._id, data);
                setEditInterview(null);
              }}
              buttonText="Update Interview"
            />
          </div>
        )}
      </Dialog>
    </div>
  );
} 