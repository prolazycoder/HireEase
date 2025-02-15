import axios from "axios";
import { getSession, signOut } from "next-auth/react";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
});

// Add request interceptor to add token
api.interceptors.request.use(async (config) => {
  const session = await getSession();

  if (session?.accessToken) {
    config.headers.Authorization = `Bearer ${session.accessToken}`;
  } else {
    // No token found, sign out
    signOut({ callbackUrl: "/" });
  }

  return config;
});

// Add response interceptor to handle token expiration
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 401) {
      // Unauthorized, token might be expired
      await signOut({ callbackUrl: "/" });
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
    const response = await api.post("/api/interviews", data);
    return response.data;
  },

  getInterviews: async (filters: FilterParams = {}) => {
    const params = new URLSearchParams();
    Object.entries(filters).forEach(([key, value]) => {
      if (value) params.append(key, value);
    });

    const response = await api.get(`/api/interviews?${params.toString()}`);
    return response.data;
  },

  getForthcoming: async () => {
    const response = await api.get("/api/interviews/forthcoming");
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
