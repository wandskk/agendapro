import { Request, Response } from "express";
import {
  getAppointments,
  getProfessionalAppointments,
  createAppointment,
  updateAppointment,
  deleteAppointment,
} from "../services/appointment.service";
import {
  appointmentCreateSchema,
  appointmentUpdateSchema,
} from "../validations/appointment.schema";
import { dateRangeQuerySchema } from "../validations/query.schema";
import { wrap } from "../utils/wrap";

const listAppointments = async (req: Request, res: Response) => {
  const userId = req.user!.userId;
  const { start, end } = dateRangeQuerySchema.parse(req.query);
  const appointments = await getAppointments(userId, start, end);
  res.json(appointments);
};

const listProfessionalAppointments = async (req: Request, res: Response) => {
  const user = req.user!;
  if (user.role !== "PROFESSIONAL") {
    throw {
      status: 403,
      message: "Access denied: Only professionals can access this route.",
    };
  }

  const { start, end } = dateRangeQuerySchema.parse(req.query);
  const appointments = await getProfessionalAppointments(
    user.userId,
    start,
    end
  );
  res.json(appointments);
};

const addAppointment = async (req: Request, res: Response) => {
  const userId = req.user!.userId;
  const data = appointmentCreateSchema.parse(req.body);
  const newAppointment = await createAppointment(
    userId,
    data.professionalId,
    new Date(data.date),
    data.notes
  );
  res.status(201).json(newAppointment);
};

const editAppointment = async (req: Request, res: Response) => {
  const userId = req.user!.userId;
  const { id } = req.params;
  const data = appointmentUpdateSchema.parse(req.body);
  const updated = await updateAppointment(
    id,
    userId,
    new Date(data.date),
    data.notes
  );
  res.json(updated);
};

const removeAppointment = async (req: Request, res: Response) => {
  const userId = req.user!.userId;
  const { id } = req.params;
  const deleted = await deleteAppointment(id, userId);
  res.json(deleted);
};

export default {
  listAppointments: wrap(listAppointments),
  listProfessionalAppointments: wrap(listProfessionalAppointments),
  addAppointment: wrap(addAppointment),
  editAppointment: wrap(editAppointment),
  removeAppointment: wrap(removeAppointment),
};
