import { Router } from 'express';
import { availableTimes } from '../controllers/public.controller';

const router = Router();

router.get('/professionals/:id/available-times', availableTimes);

export default router;
