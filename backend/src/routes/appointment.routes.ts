import { Router } from 'express';
import {
  listAppointments,
  listProfessionalAppointments,
  addAppointment,
  editAppointment,
  removeAppointment
} from '../controllers/appointment.controller';
import { authenticateToken } from '../middlewares/auth.middleware';

const router = Router();

router.use(authenticateToken);

router.get('/professional', listProfessionalAppointments);
router.get('/', listAppointments);
router.post('/', addAppointment);
router.put('/:id', editAppointment);
router.delete('/:id', removeAppointment);

export default router;
