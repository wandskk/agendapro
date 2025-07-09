import { Router } from "express";

import authRoutes from "./auth.routes";
import userRoutes from "./user.routes";
import appointmentRoutes from "./appointment.routes";
import publicRoutes from "./public.routes";

const router = Router();

router.use("/auth", authRoutes);
router.use("/users", userRoutes);
router.use("/appointments", appointmentRoutes);
router.use("/public", publicRoutes);

export default router;
