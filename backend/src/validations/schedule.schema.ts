import { z } from 'zod';

export const scheduleCreateSchema = z.object({
  dayOfWeek: z.number().int().min(0).max(6),
  startTime: z.string().regex(/^\d{2}:\d{2}$/, 'Formato deve ser HH:mm'),
  endTime: z.string().regex(/^\d{2}:\d{2}$/, 'Formato deve ser HH:mm'),
});

export const scheduleUpdateSchema = z.object({
  dayOfWeek: z.number().int().min(0).max(6).optional(),
  startTime: z.string().regex(/^\d{2}:\d{2}$/, 'Formato deve ser HH:mm').optional(),
  endTime: z.string().regex(/^\d{2}:\d{2}$/, 'Formato deve ser HH:mm').optional(),
}); 