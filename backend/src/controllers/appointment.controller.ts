import { Request, Response, NextFunction } from 'express';
import {
  getAppointments,
  getProfessionalAppointments,
  createAppointment,
  updateAppointment,
  deleteAppointment
} from '../services/appointment.service';
import {
  appointmentCreateSchema,
  appointmentUpdateSchema
} from '../validations/appointment.schema';

export const listAppointments = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userId = req.user!.userId;
    const { start, end } = req.query;

    const appointments = await getAppointments(
      userId,
      start?.toString(),
      end?.toString()
    );

    res.json(appointments);
  } catch (error) {
    next(error);
  }
};

export const listProfessionalAppointments = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = req.user!;
    if (user.role !== 'PROFESSIONAL') {
      throw { status: 403, message: 'Access denied: Only professionals can access this route.' };
    }

    const { start, end } = req.query;

    const appointments = await getProfessionalAppointments(
      user.userId,
      start?.toString(),
      end?.toString()
    );

    res.json(appointments);
  } catch (error) {
    next(error);
  }
};

export const addAppointment = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userId = req.user!.userId;
    const data = appointmentCreateSchema.parse(req.body);
    const newAppointment = await createAppointment(userId, data.professionalId, new Date(data.date), data.notes);
    res.status(201).json(newAppointment);
  } catch (error) {
    next(error);
  }
};

export const editAppointment = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userId = req.user!.userId;
    const { id } = req.params;
    const data = appointmentUpdateSchema.parse(req.body);
    const updated = await updateAppointment(id, userId, new Date(data.date), data.notes);
    res.json(updated);
  } catch (error) {
    next(error);
  }
};

export const removeAppointment = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userId = req.user!.userId;
    const { id } = req.params;
    const deleted = await deleteAppointment(id, userId);
    res.json(deleted);
  } catch (error) {
    next(error);
  }
};
