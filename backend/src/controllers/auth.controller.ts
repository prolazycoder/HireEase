import { Request, Response } from 'express';
import { User } from '../models/User';

export const authController = {
  async googleCallback(req: Request, res: Response) {
    try {
      const { email, name, image, googleId } = req.body;

      let user = await User.findOne({ email });

      if (!user) {
        user = await User.create({
          email,
          name,
          image,
          googleId,
        });
      }

      return res.status(200).json({ user });
    } catch (error) {
      console.error('Google auth error:', error);
      return res.status(500).json({ error: 'Authentication failed' });
    }
  },
}; 