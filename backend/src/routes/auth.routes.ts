import { Router } from "express";
import { authController } from "../controllers/auth.controller";
import { authMiddleware } from "../middleware/auth.middleware";
import { RequestHandler } from "express";

const router = Router();

router.use(authMiddleware as RequestHandler); 

router.post("/google/callback", authController.googleCallback);
router.get("/user/:id", authController.getUser);

export const authRoutes = router;
