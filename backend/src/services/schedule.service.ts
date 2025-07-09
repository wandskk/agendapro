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

export const createSchedule = async (data: { professionalId: string; dayOfWeek: number; startTime: string; endTime: string }) => {
  return prisma.schedule.create({ data });
};

export const getScheduleById = async (id: string) => {
  return prisma.schedule.findUnique({ where: { id } });
};

export const updateScheduleById = async (
  id: string,
  data: { dayOfWeek?: number; startTime?: string; endTime?: string }
) => {
  return prisma.schedule.update({
    where: { id },
    data,
  });
};

export const deleteScheduleById = async (id: string) => {
  return prisma.schedule.delete({ where: { id } });
};

export const listAllSchedules = async () => {
  return prisma.schedule.findMany({
    include: {
      professional: {
        select: { id: true, name: true, email: true }
      }
    },
    orderBy: [{ professionalId: 'asc' }, { dayOfWeek: 'asc' }, { startTime: 'asc' }]
  });
};
