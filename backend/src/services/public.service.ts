import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const getAvailableTimes = async (professionalId: string, date: string) => {
  const startOfDay = new Date(`${date}T00:00:00Z`);
  const endOfDay = new Date(`${date}T23:59:59Z`);

  const appointments = await prisma.appointment.findMany({
    where: {
      professionalId,
      date: {
        gte: startOfDay,
        lte: endOfDay
      }
    }
  });

  const takenTimes = appointments.map(a => new Date(a.date).toISOString());

  const available: string[] = [];

  for (let hour = 8; hour <= 17; hour++) {
    const time = new Date(`${date}T${hour.toString().padStart(2, '0')}:00:00Z`);
    const iso = time.toISOString();
    if (!takenTimes.includes(iso)) {
      available.push(iso);
    }
  }

  return available;
};
