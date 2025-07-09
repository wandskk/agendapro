import { z } from 'zod';

export const appointmentCreateSchema = z.object({
  professionalId: z.string().uuid(),
  date: z.string().datetime(),
  notes: z.string().optional()
});

export const appointmentUpdateSchema = z.object({
  date: z.string().datetime(),
  notes: z.string().optional()
});
