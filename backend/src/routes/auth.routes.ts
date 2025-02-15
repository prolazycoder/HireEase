import { Router } from "express";
import { authController } from "../controllers/auth.controller";
import { authMiddleware } from "../middleware/auth.middleware";
import { RequestHandler } from "express";

const router = Router();

router.use(authMiddleware as RequestHandler);

router.get("/user", authController.getUser);

export default router;
