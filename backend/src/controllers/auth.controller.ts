import { Request, Response, NextFunction, RequestHandler } from "express";
import { User } from "../models/User";
import jwt from "jsonwebtoken";

export const authController = {
  googleCallback: (async (req, res) => {
    try {
      const { email, name, image, googleId } = req.body;
      let user = await User.findOne({ email });

      if (!user) {
        user = await User.create({ email, name, image, googleId });
      }

      const token = jwt.sign(
        { sub: user._id, email: user.email },
        process.env.JWT_SECRET!,
        { expiresIn: "7d" }
      );

      void res.json({ user, token });
    } catch (error) {
      void res.status(500).json({ error: "Authentication failed" });
    }
  }) as RequestHandler,

  getUser: (async (req, res) => {
    try {
      const user = await User.findById(req.params.id).select("-googleId");
      if (!user) {
        void res.status(404).json({ error: "User not found" });
        return;
      }
      void res.json({ user });
    } catch (error) {
      void res.status(500).json({ error: "Failed to fetch user" });
    }
  }) as RequestHandler,
};
