import { Router } from 'express';
import publicController from '../controllers/public.controller';

const router = Router();

router.get('/professionals/:id/available-times', publicController.availableTimes);

export default router;
