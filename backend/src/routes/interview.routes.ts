import { Router } from "express";
import { interviewController } from "../controllers/interview.controller";
import { authMiddleware } from "../middleware/auth.middleware";
import { RequestHandler } from "express";

const router = Router();

router.use(authMiddleware as RequestHandler); 

router.post("/", interviewController.createInterview);
router.get("/forthcoming", interviewController.getForthcomingInterviews);
router.put("/:id", interviewController.updateInterview);
router.delete("/:id", interviewController.deleteInterview);

export const interviewRoutes = router;
