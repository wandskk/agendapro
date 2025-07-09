import { Router } from "express";
import appointmentController from "../controllers/appointment.controller";
import { authenticateToken } from "../middlewares/auth.middleware";
import { requireRole } from "../middlewares/role.middleware";

const router = Router();

router.use(authenticateToken);

router.get(
  "/professional",
  requireRole("PROFESSIONAL"),
  appointmentController.listProfessionalAppointments
);
router.get("/", appointmentController.listAppointments);
router.post("/", appointmentController.addAppointment);
router.put("/:id", appointmentController.editAppointment);
router.delete("/:id", appointmentController.removeAppointment);

export default router;
