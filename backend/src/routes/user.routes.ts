import { Router } from 'express';
import { getProfessionals } from '../controllers/user.controller';

const router = Router();

router.get('/professionals', getProfessionals);

export default router;
