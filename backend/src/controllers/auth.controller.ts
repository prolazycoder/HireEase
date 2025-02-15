import { Request, Response } from "express";
import { RequestHandler } from "express";

export const authController = {
  getUser: (async (req: Request, res: Response) => {
    try {
      res.json({ user: req.user });
    } catch (error) {
      res.status(500).json({ message: "Server error" });
    }
  }) as RequestHandler,
};
