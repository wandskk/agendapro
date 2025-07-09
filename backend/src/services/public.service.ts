import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

function timeStringToMinutes(time: string): number {
  const [hour, min] = time.split(":").map(Number);
  return hour * 60 + min;
}

function dateWithMinutes(date: string, minutes: number): Date {
  const d = new Date(`${date}T00:00:00Z`);
  d.setUTCMinutes(minutes);
  return d;
}

export const getAvailableTimes = async (
  professionalId: string,
  date: string,
  intervalMinutes: number = 60
) => {
  const targetDate = new Date(`${date}T00:00:00Z`);
  const dayOfWeek = targetDate.getUTCDay();

  const schedules = await prisma.schedule.findMany({
    where: {
      professionalId,
      dayOfWeek,
    },
    select: {
      startTime: true,
      endTime: true,
    },
  });

  if (schedules.length === 0) {
    return [];
  }

  const appointments = await prisma.appointment.findMany({
    where: {
      professionalId,
      date: {
        gte: new Date(`${date}T00:00:00Z`),
        lte: new Date(`${date}T23:59:59Z`),
      },
    },
    select: { date: true },
  });

  const takenMinutes = new Set(
    appointments.map((a) => {
      const d = new Date(a.date);
      return d.getUTCHours() * 60 + d.getUTCMinutes();
    })
  );

  const available: string[] = [];

  for (const schedule of schedules) {
    const startMin = timeStringToMinutes(schedule.startTime);
    const endMin = timeStringToMinutes(schedule.endTime);

    for (let min = startMin; min + intervalMinutes <= endMin; min += intervalMinutes) {
      if (!takenMinutes.has(min)) {
        const slot = dateWithMinutes(date, min);
        available.push(slot.toISOString());
      }
    }
  }

  return available;
};
