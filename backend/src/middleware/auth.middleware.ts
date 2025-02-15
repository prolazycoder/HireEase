import { Request, Response, NextFunction } from "express";
import { OAuth2Client } from "google-auth-library";

declare global {
  namespace Express {
    interface Request {
      user: {
        id: string;
        email: string;
        name: string;
      };
    }
  }
}

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

export const authMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const token = authHeader.split(" ")[1];

    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: process.env.GOOGLE_CLIENT_ID,
    });

    const payload = ticket.getPayload();
    if (!payload) {
      return res.status(401).json({ message: "Invalid token" });
    }

    if (!payload.sub || !payload.email || !payload.name) {
      return res.status(401).json({ message: "Invalid token payload" });
    }

    req.user = {
      id: payload.sub,
      email: payload.email,
      name: payload.name,
    };

    next();
  } catch (error) {
    return res.status(401).json({ message: "Invalid token" });
  }
};
