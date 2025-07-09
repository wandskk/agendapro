import { Request, Response, NextFunction } from "express";
import { ZodError } from "zod";
import jwt from "jsonwebtoken";

export const errorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (err instanceof ZodError) {
    return res.status(400).json({
      error: "Validation failed",
      details: err.errors.map((e) => ({
        field: e.path.join("."),
        message: e.message,
      })),
    });
  }

  if (err instanceof jwt.JsonWebTokenError) {
    return res.status(401).json({ error: "Invalid or expired token" });
  }

  if (err.status && err.message) {
    return res.status(err.status).json({ error: err.message });
  }

  return res.status(500).json({ error: "Internal server error" });
};
