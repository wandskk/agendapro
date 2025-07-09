import { Router } from 'express';
import scheduleController from '../controllers/schedule.controller';
import { authenticateToken } from '../middlewares/auth.middleware';

const router = Router();

router.post('/', authenticateToken, scheduleController.createSchedule);
router.get('/', scheduleController.listSchedules);
router.get('/:id', scheduleController.getScheduleById);
router.put('/:id', authenticateToken, scheduleController.updateScheduleById);
router.delete('/:id', authenticateToken, scheduleController.deleteScheduleById);

export default router;
