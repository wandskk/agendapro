import { Request, Response } from 'express';
import { registerUser, loginUser } from '../services/auth.service';
import { registerSchema, loginSchema } from '../validations/auth.schema';
import { wrap } from '../utils/wrap';

const register = async (req: Request, res: Response) => {
  const data = registerSchema.parse(req.body);
  const user = await registerUser(data.name, data.email, data.password, data.role);
  res.status(201).json(user);
};

const login = async (req: Request, res: Response) => {
  const data = loginSchema.parse(req.body);
  const result = await loginUser(data.email, data.password);
  res.status(200).json(result);
};

export default {
  register: wrap(register),
  login: wrap(login)
};
