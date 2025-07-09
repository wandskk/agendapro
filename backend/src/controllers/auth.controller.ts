import { Request, Response } from "express";
import { registerUser } from "../services/auth.service";
import { Role } from "@prisma/client";

export const register = async (req: Request, res: Response) => {
  try {
    const { name, email, password, role } = req.body;

    if (!name || !email || !password || !role) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    if (!Object.values(Role).includes(role)) {
      return res.status(400).json({ error: "Invalid role" });
    }

    const user = await registerUser(name, email, password, role);
    res.status(201).json(user);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};
