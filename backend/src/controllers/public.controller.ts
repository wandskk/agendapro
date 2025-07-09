import { Request, Response, NextFunction } from 'express';
import { getAvailableTimes } from '../services/public.service';

export const availableTimes = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const { date } = req.query;

    if (!date) {
      throw { status: 400, message: 'Date is required in query (YYYY-MM-DD)' };
    }

    const available = await getAvailableTimes(id, date.toString());
    res.json({ available });
  } catch (error) {
    next(error);
  }
};
