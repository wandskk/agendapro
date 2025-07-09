import { Router } from "express";
import userController from "../controllers/user.controller";
import { authenticateToken } from "../middlewares/auth.middleware";

const router = Router();

router.get("/professionals", userController.getProfessionals);
router.get("/me", authenticateToken, userController.getMe);

export default router;
