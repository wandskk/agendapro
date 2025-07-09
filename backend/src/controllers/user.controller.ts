import { Request, Response } from 'express';
import { listProfessionals } from '../services/user.service';
import { wrap } from '../utils/wrap';

const getProfessionals = async (req: Request, res: Response) => {
  const professionals = await listProfessionals();
  res.json(professionals);
};

const getMe = async (req: Request, res: Response) => {
  const user = req.user!;
  res.json(user);
};

export default {
  getProfessionals: wrap(getProfessionals),
  getMe: wrap(getMe)
};
