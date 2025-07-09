import { Request, Response } from 'express';
import {
  getAppointments,
  createAppointment,
  updateAppointment,
  deleteAppointment,
} from '../services/appointment.service';

export const listAppointments = async (req: Request, res: Response) => {
  try {
    const userId = req.user!.userId;
    const appointments = await getAppointments(userId);
    res.json(appointments);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const addAppointment = async (req: Request, res: Response) => {
  try {
    const userId = req.user!.userId;
    const { professionalId, date, notes } = req.body;

    if (!professionalId || !date) {
      return res.status(400).json({ error: 'professionalId and date are required' });
    }

    const newAppointment = await createAppointment(
      userId,
      professionalId,
      new Date(date),
      notes
    );

    res.status(201).json(newAppointment);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};

export const editAppointment = async (req: Request, res: Response) => {
  try {
    const userId = req.user!.userId;
    const { date, notes } = req.body;
    const { id } = req.params;

    const updated = await updateAppointment(id, userId, new Date(date), notes);
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
