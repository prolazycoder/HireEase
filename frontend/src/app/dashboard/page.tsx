"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import axios from "axios";
import { 
  Button, 
  Dialog, 
  Container, 
  Typography,
  Paper,
  Box
} from "@mui/material";
import { Add as AddIcon } from '@mui/icons-material';
import InterviewForm, { InterviewFormData } from "@/components/InterviewForm";
import InterviewList from "@/components/InterviewList";

interface Interview extends InterviewFormData {
  _id: string;
  status: "scheduled" | "completed" | "cancelled";
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

  useEffect(() => {
    fetchInterviews();
  }, []);

  const fetchInterviews = async () => {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/api/interviews/forthcoming`,
        {
          headers: {
            Authorization: `Bearer ${session?.user?.token}`,
          },
        }
      );
      setInterviews(response.data.interviews);
    } catch (error) {
      console.error("Failed to fetch interviews:", error);
    }
  };

  const handleCreateInterview = async (data: InterviewFormData) => {
    try {
      await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/api/interviews`,
        data,
        {
          headers: {
            Authorization: `Bearer ${session?.user?.token}`,
          },
        }
      );
      setIsFormOpen(false);
      fetchInterviews();
    } catch (error) {
      console.error("Failed to create interview:", error);
    }
  };

  const handleEditInterview = async (id: string, data: InterviewFormData) => {
    try {
      await axios.put(
        `${process.env.NEXT_PUBLIC_API_URL}/api/interviews/${id}`,
        data,
        {
          headers: {
            Authorization: `Bearer ${session?.user?.token}`,
          },
        }
      );
      fetchInterviews();
    } catch (error) {
      console.error("Failed to update interview:", error);
    }
  };

  const handleDeleteInterview = async (id: string) => {
    try {
      await axios.delete(
        `${process.env.NEXT_PUBLIC_API_URL}/api/interviews/${id}`,
        {
          headers: {
            Authorization: `Bearer ${session?.user?.token}`,
          },
        }
      );
      fetchInterviews();
    } catch (error) {
      console.error("Failed to delete interview:", error);
    }
  };

  if (status === "loading") {
    return <div>Loading...</div>;
  }

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Paper elevation={0} sx={{ p: 3, bgcolor: 'background.default' }}>
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={4}>
          <Typography variant="h4" component="h1" color="primary">
            Upcoming Interviews
          </Typography>
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={() => setIsFormOpen(true)}
            sx={{ 
              bgcolor: 'primary.main',
              '&:hover': {
                bgcolor: 'primary.dark',
              }
            }}
          >
            Schedule Interview
          </Button>
        </Box>

        {interviews.length === 0 ? (
          <Paper sx={{ p: 4, textAlign: 'center', bgcolor: 'background.paper' }}>
            <Typography variant="h6" color="text.secondary" gutterBottom>
              No upcoming interviews
            </Typography>
            <Typography color="text.secondary">
              Click the button above to schedule your first interview
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
            bgcolor: 'background.paper',
            boxShadow: 24,
            p: 4,
          }
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