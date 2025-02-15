import { Request, Response } from "express";
import { RequestHandler } from "express";
import { User, IUserDocument } from "../models/User";

export const authController = {
  getUser: (async (req: Request, res: Response) => {
    try {
      res.json({ user: req.user });
    } catch (error) {
      res.status(500).json({ message: "Server error" });
    }
  }) as RequestHandler,
};
