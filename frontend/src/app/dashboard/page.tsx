"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import { interviewApi } from "@/services/interview.service";
import {
  Button,
  Dialog,
  Container,
  Typography,
  Paper,
  Box,
} from "@mui/material";
import { Add as AddIcon } from "@mui/icons-material";
import InterviewForm, { InterviewFormData } from "@/components/InterviewForm";
import InterviewList from "@/components/InterviewList";
import { InterviewFilters } from "@/components/InterviewFilters";

interface Interview extends InterviewFormData {
  _id: string;
  status: "upcoming" | "ongoing" | "completed";
}

export default function Dashboard() {
  const { data: session, status } = useSession({
    required: true,
    onUnauthenticated() {
      redirect("/");
    },
  });

  const [interviews, setInterviews] = useState<Interview[]>([]);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [selectedStatus, setSelectedStatus] = useState("upcoming");

  const fetchInterviews = async (filters = {}) => {
    try {
      setLoading(true);
      const { interviews } = await interviewApi.getInterviews(filters);
      setInterviews(interviews);
    } catch (error) {
      console.error("Failed to fetch interviews:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleFilterChange = (filters: any) => {
    setSelectedStatus(filters.status);
    fetchInterviews(filters);
  };

  useEffect(() => {
    fetchInterviews();
  }, []);

  const handleCreateInterview = async (data: InterviewFormData) => {
    try {
      await interviewApi.create(data);
      setIsFormOpen(false);
      fetchInterviews();
    } catch (error) {
      console.error("Failed to create interview:", error);
    }
  };

  const handleEditInterview = async (id: string, data: InterviewFormData) => {
    try {
      await interviewApi.update(id, data);
      fetchInterviews();
    } catch (error) {
      console.error("Failed to update interview:", error);
    }
  };

  const handleDeleteInterview = async (id: string) => {
    try {
      await interviewApi.delete(id);
      fetchInterviews();
    } catch (error) {
      console.error("Failed to delete interview:", error);
    }
  };

  const getStatusHeading = () => {
    switch (selectedStatus) {
      case "ongoing":
        return "Ongoing Interviews";
      case "completed":
        return "Completed Interviews";
      case "all":
        return "All Interviews";
      default:
        return "Upcoming Interviews";
    }
  };

  if (status === "loading") {
    return <div>Loading...</div>;
  }

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Paper elevation={0} sx={{ p: 3, bgcolor: "background.default" }}>
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          mb={4}
        >
          <Typography variant="h4" component="h1" color="primary">
            {getStatusHeading()}
          </Typography>
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={() => setIsFormOpen(true)}
            sx={{
              bgcolor: "primary.main",
              "&:hover": {
                bgcolor: "primary.dark",
              },
            }}
          >
            Schedule Interview
          </Button>
        </Box>

        <InterviewFilters onFilterChange={handleFilterChange} />

        {loading ? (
          <Paper
            sx={{ p: 4, textAlign: "center", bgcolor: "background.paper" }}
          >
            <Typography variant="h6" color="text.secondary" gutterBottom>
              Loading interviews...
            </Typography>
          </Paper>
        ) : interviews.length === 0 ? (
          <Paper
            sx={{ p: 4, textAlign: "center", bgcolor: "background.paper" }}
          >
            <Typography variant="h6" color="text.secondary" gutterBottom>
              No {selectedStatus === "all" ? "" : selectedStatus} interviews
              found
            </Typography>
            <Typography color="text.secondary">
              Click the button above to schedule a new interview
            </Typography>
          </Paper>
        ) : (
          <InterviewList
            interviews={interviews}
            onEdit={handleEditInterview}
            onDelete={handleDeleteInterview}
          />
        )}
      </Paper>

      <Dialog
        open={isFormOpen}
        onClose={() => setIsFormOpen(false)}
        maxWidth="sm"
        fullWidth
        PaperProps={{
          sx: {
            bgcolor: "background.paper",
            boxShadow: 24,
            p: 4,
          },
        }}
      >
        <Typography variant="h5" component="h2" color="primary" gutterBottom>
          Schedule New Interview
        </Typography>
        <InterviewForm onSubmit={handleCreateInterview} />
      </Dialog>
    </Container>
  );
}
