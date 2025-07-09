import { Request, Response } from "express";
import { listProfessionals } from "../services/user.service";

export const getProfessionals = async (req: Request, res: Response) => {
  try {
    const professionals = await listProfessionals();
    res.json(professionals);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const getMe = async (req: Request, res: Response) => {
  try {
    const user = req.user!;
    res.json(user);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};
