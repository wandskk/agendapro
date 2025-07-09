import { Request, Response } from 'express';
import { getAvailableTimes } from '../services/public.service';
import { singleDateQuerySchema } from '../validations/query.schema';
import { wrap } from '../utils/wrap';

const availableTimes = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { date } = singleDateQuerySchema.parse(req.query);
  const available = await getAvailableTimes(id, date);
  res.json({ available });
};

export default {
  availableTimes: wrap(availableTimes)
};
