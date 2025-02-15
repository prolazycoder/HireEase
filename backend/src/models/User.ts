import mongoose, { Document } from 'mongoose';

export interface IUser {
  email: string;
  name: string;
  image?: string;
  googleId: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface IUserDocument extends IUser, Document {
  _id: mongoose.Types.ObjectId;
}

const userSchema = new mongoose.Schema<IUserDocument>({
  email: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  image: { type: String },
  googleId: { type: String, unique: true },
}, {
  timestamps: true,
});

export const User = mongoose.model<IUserDocument>('User', userSchema); 