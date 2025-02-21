import axios from "axios";
import { getSession, signOut } from "next-auth/react";
import { toUTC, toLocal } from "../utils/dateTime";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

// Add request interceptor to add token
api.interceptors.request.use(async (config) => {
  const session = await getSession();

  if (session?.accessToken) {
    config.headers.Authorization = `Bearer ${session.accessToken}`;
  }
  // Don't sign out here, let NextAuth handle it
  return config;
});

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 401) {
      // Sign out and redirect to home page
      await signOut({ callbackUrl: "/" });
      return Promise.reject(
        new Error("Session expired. Please sign in again.")
      );
    }
    return Promise.reject(error);
  }
);

interface FilterParams {
  status?: string;
  candidateName?: string;
}

export const interviewApi = {
  create: async (data: any) => {
    // Convert to UTC before sending
    const utcTime = toUTC(data.date, data.startTime);
    const utcEndTime = toUTC(data.date, data.endTime);

    const response = await api.post("/api/interviews", {
      ...data,
      date: utcTime.date,
      startTime: utcTime.time,
      endTime: utcEndTime.time,
    });
    return response.data;
  },

  getInterviews: async (filters: FilterParams = {}) => {
    const params = new URLSearchParams();
    const status = filters.status || "upcoming";
    params.append("status", status);

    if (filters.candidateName) {
      params.append("candidateName", filters.candidateName);
    }

    // Add current UTC time to params
    const now = new Date();
    const utcDate = now.toISOString().split('T')[0];
    const utcTime = now.toISOString().split('T')[1].substring(0, 5);
    
    params.append("currentDate", utcDate);
    params.append("currentTime", utcTime);

    const response = await api.get(`/api/interviews?${params.toString()}`);

    // Convert UTC to local for display
    const interviews = response.data.interviews.map((interview: any) => ({
      ...interview,
      ...toLocal(interview.date, interview.startTime),
      endTime: toLocal(interview.date, interview.endTime).time,
    }));

    return { interviews };
  },

  update: async (id: string, data: any) => {
    // Convert to UTC before sending
    const utcTime = toUTC(data.date, data.startTime);
    const utcEndTime = toUTC(data.date, data.endTime);

    const response = await api.put(`/api/interviews/${id}`, {
      ...data,
      date: utcTime.date,
      startTime: utcTime.time,
      endTime: utcEndTime.time,
    });
    return response.data;
  },

  delete: async (id: string) => {
    const response = await api.delete(`/api/interviews/${id}`);
    return response.data;
  },
};
