import { Request, Response } from 'express';
import { getAvailableTimes } from '../services/public.service';
import { wrap } from '../utils/wrap';

const availableTimes = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { date } = req.query;

  if (!date) {
    throw { status: 400, message: 'Date is required in query (YYYY-MM-DD)' };
  }

  const available = await getAvailableTimes(id, date.toString());
  res.json({ available });
};

export default {
  availableTimes: wrap(availableTimes)
};
