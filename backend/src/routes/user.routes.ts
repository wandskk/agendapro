import { Router } from "express";
import { getProfessionals, getMe } from "../controllers/user.controller";
import { authenticateToken } from "../middlewares/auth.middleware";

const router = Router();

router.get("/professionals", getProfessionals);
router.get("/me", authenticateToken, getMe);

export default router;
