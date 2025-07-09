import { Request, Response } from 'express';
import { getAvailableTimes } from '../services/public.service';

export const availableTimes = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { date } = req.query;

    if (!date) {
      return res.status(400).json({ error: 'Date is required in query (YYYY-MM-DD)' });
    }

    const available = await getAvailableTimes(id, date.toString());
    res.json({ available });
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};
