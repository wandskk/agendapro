import { Request, Response, NextFunction } from 'express';
import { registerUser, loginUser } from '../services/auth.service';
import { registerSchema, loginSchema } from '../validations/auth.schema';

export const register = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const data = registerSchema.parse(req.body);
    const user = await registerUser(data.name, data.email, data.password, data.role);
    res.status(201).json(user);
  } catch (error) {
    next(error);
  }
};

export const login = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const data = loginSchema.parse(req.body);
    const result = await loginUser(data.email, data.password);
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};
