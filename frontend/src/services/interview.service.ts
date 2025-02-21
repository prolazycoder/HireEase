import axios from "axios";
import { getSession, signOut } from "next-auth/react";

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

interface FilterParams {
  status?: string;
  candidateName?: string;
}

export const interviewApi = {
  create: async (data: any) => {
    const response = await api.post("/api/interviews", data);
    return response.data;
  },

  getInterviews: async (filters: FilterParams = {}) => {
    const params = new URLSearchParams();

    // Set default status to 'upcoming' if not provided
    const status = filters.status || "upcoming";
    params.append("status", status);

    // Add other filters if present
    if (filters.candidateName) {
      params.append("candidateName", filters.candidateName);
    }

    const response = await api.get(`/api/interviews?${params.toString()}`);
    return response.data;
  },

  update: async (id: string, data: any) => {
    const response = await api.put(`/api/interviews/${id}`, data);
    return response.data;
  },

  delete: async (id: string) => {
    const response = await api.delete(`/api/interviews/${id}`);
    return response.data;
  },
};
