import { Request, Response, NextFunction } from 'express';
import { listProfessionals } from '../services/user.service';

export const getProfessionals = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const professionals = await listProfessionals();
    res.json(professionals);
  } catch (error) {
    next(error);
  }
};

export const getMe = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = req.user!;
    res.json(user);
  } catch (error) {
    next(error);
  }
};
