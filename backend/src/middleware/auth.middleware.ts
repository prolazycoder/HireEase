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

const client = new OAuth2Client();

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

    // Verify token with Google
    const ticket = await client.verifyIdToken({
      idToken: token,
    });

    const payload = ticket.getPayload();
    if (!payload?.sub || !payload?.email) {
      return res.status(401).json({ message: "Invalid token" });
    }

    // Set user info from verified token
    req.user = {
      id: payload.sub,
      email: payload.email,
      name: payload.name || payload.email,
    };

    next();
  } catch (error) {
    console.error("Auth error:", error);
    return res.status(401).json({ message: "Invalid token" });
  }
};
