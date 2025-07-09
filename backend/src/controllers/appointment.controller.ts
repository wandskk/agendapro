import { Request, Response } from 'express';
import {
  getAppointments,
  createAppointment,
  updateAppointment,
  deleteAppointment,
  getProfessionalAppointments
} from '../services/appointment.service';
import {
  appointmentCreateSchema,
  appointmentUpdateSchema
} from '../validations/appointment.schema';

export const listAppointments = async (req: Request, res: Response) => {
  try {
    const userId = req.user!.userId;
    const appointments = await getAppointments(userId);
    res.json(appointments);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const listProfessionalAppointments = async (req: Request, res: Response) => {
  try {
    const user = req.user!;
    if (user.role !== 'PROFESSIONAL') {
      return res.status(403).json({ error: 'Access denied: Only professionals can access this route.' });
    }

    const appointments = await getProfessionalAppointments(user.userId);
    res.json(appointments);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const addAppointment = async (req: Request, res: Response) => {
  try {
    const userId = req.user!.userId;
    const data = appointmentCreateSchema.parse(req.body);
    const newAppointment = await createAppointment(userId, data.professionalId, new Date(data.date), data.notes);
    res.status(201).json(newAppointment);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};

export const editAppointment = async (req: Request, res: Response) => {
  try {
    const userId = req.user!.userId;
    const { id } = req.params;
    const data = appointmentUpdateSchema.parse(req.body);
    const updated = await updateAppointment(id, userId, new Date(data.date), data.notes);
    res.json(updated);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};

export const removeAppointment = async (req: Request, res: Response) => {
  try {
    const userId = req.user!.userId;
    const { id } = req.params;
    const deleted = await deleteAppointment(id, userId);
    res.json(deleted);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};
