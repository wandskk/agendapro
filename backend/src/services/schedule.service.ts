import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const setSchedule = async (
  professionalId: string,
  schedule: { dayOfWeek: number; startTime: string; endTime: string }[]
) => {
  await prisma.schedule.deleteMany({ where: { professionalId } });

  const data = schedule.map(item => ({
    ...item,
    professionalId
  }));

  return prisma.schedule.createMany({ data });
};

export const getSchedule = async (professionalId: string) => {
  return prisma.schedule.findMany({
    where: { professionalId },
    orderBy: [{ dayOfWeek: 'asc' }, { startTime: 'asc' }]
  });
};
