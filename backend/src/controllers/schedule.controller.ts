import { Request, Response } from "express";
import { setSchedule, getSchedule, createSchedule, getScheduleById, updateScheduleById, deleteScheduleById, listAllSchedules } from "../services/schedule.service";
import { wrap } from "../utils/wrap";
import { scheduleCreateSchema, scheduleUpdateSchema } from '../validations/schedule.schema';
import { Prisma } from '@prisma/client';
import type { User } from '@prisma/client';

const updateSchedule = async (req: Request, res: Response) => {
  const user = req.user!;
  if (user.role !== "PROFESSIONAL") {
    throw { status: 403, message: "Only professionals can update schedule" };
  }

  const schedule = req.body;
  await setSchedule(user.userId, schedule);
  res.status(200).json({ message: "Schedule updated" });
};

const fetchSchedule = async (req: Request, res: Response) => {
  const { id } = req.params;
  const schedule = await getSchedule(id);
  res.json(schedule);
};

const createScheduleHandler = async (req: Request, res: Response) => {
  const user = req.user as unknown as User;
  
  if (user.role !== "PROFESSIONAL") {
    throw { status: 403, message: "Only professionals can create schedule" };
  }
  const data = scheduleCreateSchema.parse(req.body);
  try {
    const schedule = await createSchedule({
      professionalId: user.id,
      ...data,
    });
    res.status(201).json(schedule);
  } catch (err: any) {
    if (err instanceof Prisma.PrismaClientKnownRequestError && err.code === 'P2002') {
      return res.status(409).json({ error: 'Horário já cadastrado para este profissional.' });
    }
    throw err;
  }
};

const getScheduleByIdHandler = async (req: Request, res: Response) => {
  const { id } = req.params;
  const schedule = await getScheduleById(id);
  if (!schedule) {
    return res.status(404).json({ message: "Schedule not found" });
  }
  res.json(schedule);
};

const updateScheduleByIdHandler = async (req: Request, res: Response) => {
  const user = req.user!;
  if (user.role !== "PROFESSIONAL") {
    throw { status: 403, message: "Only professionals can update schedule" };
  }
  const { id } = req.params;
  const data = scheduleUpdateSchema.parse(req.body);
  try {
    const updated = await updateScheduleById(id, data);
    res.json(updated);
  } catch (err: any) {
    if (err instanceof Prisma.PrismaClientKnownRequestError && err.code === 'P2002') {
      return res.status(409).json({ error: 'Horário já cadastrado para este profissional.' });
    }
    throw err;
  }
};

const deleteScheduleByIdHandler = async (req: Request, res: Response) => {
  const user = req.user!;
  if (user.role !== "PROFESSIONAL") {
    throw { status: 403, message: "Only professionals can delete schedule" };
  }
  const { id } = req.params;
  await deleteScheduleById(id);
  res.status(204).send();
};

const listSchedulesHandler = async (_req: Request, res: Response) => {
  const schedules = await listAllSchedules();
  res.json(schedules);
};

export default {
  updateSchedule: wrap(updateSchedule),
  fetchSchedule: wrap(fetchSchedule),
  createSchedule: wrap(createScheduleHandler),
  getScheduleById: wrap(getScheduleByIdHandler),
  updateScheduleById: wrap(updateScheduleByIdHandler),
  deleteScheduleById: wrap(deleteScheduleByIdHandler),
  listSchedules: wrap(listSchedulesHandler),
};
