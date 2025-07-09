import { Request, Response } from 'express';
import { listProfessionals, listUsers } from '../services/user.service';
import { wrap } from '../utils/wrap';
import { Role } from '@prisma/client';

const getProfessionals = async (req: Request, res: Response) => {
  const professionals = await listProfessionals();
  res.json(professionals);
};

const getMe = async (req: Request, res: Response) => {
  const user = req.user!;
  res.json(user);
};

const listUsersHandler = async (req: Request, res: Response) => {
  const { role } = req.query;
  let roleFilter: Role | undefined = undefined;
  if (role && (role === 'PATIENT' || role === 'PROFESSIONAL')) {
    roleFilter = role as Role;
  }
  const users = await listUsers(roleFilter);
  res.json(users);
};

export default {
  getProfessionals: wrap(getProfessionals),
  getMe: wrap(getMe),
  listUsers: listUsersHandler
};
