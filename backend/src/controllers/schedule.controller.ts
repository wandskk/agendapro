import { Request, Response } from "express";
import { setSchedule, getSchedule } from "../services/schedule.service";
import { wrap } from "../utils/wrap";

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

export default {
  updateSchedule: wrap(updateSchedule),
  fetchSchedule: wrap(fetchSchedule),
};
