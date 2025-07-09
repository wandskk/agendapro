import { Router } from 'express';
import scheduleController from '../controllers/schedule.controller';
import { authenticateToken } from '../middlewares/auth.middleware';

const router = Router();

router.post('/', authenticateToken, scheduleController.updateSchedule);
router.get('/:id', scheduleController.fetchSchedule);

export default router;
