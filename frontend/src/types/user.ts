export interface User {
  id: string;
  email: string;
  name: string;
  image?: string;
  googleId: string;
  createdAt: Date;
  updatedAt: Date;
}

// For API responses
export interface UserResponse {
  user: User;
} 