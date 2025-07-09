import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const getAppointments = async (
  userId: string,
  start?: string,
  end?: string
) => {
  const where: any = { patientId: userId };

  if (start && end) {
    where.date = {
      gte: new Date(start),
      lte: new Date(end)
    };
  }

  return await prisma.appointment.findMany({
    where,
    orderBy: { date: 'asc' }
  });
};

export const getProfessionalAppointments = async (
  professionalId: string,
  start?: string,
  end?: string
) => {
  const where: any = { professionalId };

  if (start && end) {
    where.date = {
      gte: new Date(start),
      lte: new Date(end)
    };
  }

  return await prisma.appointment.findMany({
    where,
    orderBy: { date: 'asc' },
    include: {
      patient: {
        select: {
          id: true,
          name: true,
          email: true
        }
      }
    }
  });
};

export const createAppointment = async (
  userId: string,
  professionalId: string,
  date: Date,
  notes?: string
) => {
  const hasConflict = await prisma.appointment.findFirst({
    where: {
      professionalId,
      date: {
        equals: date,
      },
    },
  });

  if (hasConflict) {
    throw new Error('This time slot is already booked for this professional.');
  }

  return await prisma.appointment.create({
    data: {
      patientId: userId,
      professionalId,
      date,
      notes,
    },
  });
};

export const updateAppointment = async (
  id: string,
  userId: string,
  date: Date,
  notes?: string
) => {
  const appointment = await prisma.appointment.findUnique({
    where: { id },
  });

  if (!appointment || appointment.patientId !== userId) {
    throw new Error('Appointment not found or access denied.');
  }

  const conflict = await prisma.appointment.findFirst({
    where: {
      id: { not: id },
      professionalId: appointment.professionalId,
      date: {
        equals: date,
      },
    },
  });

  if (conflict) {
    throw new Error('This time slot is already booked for this professional.');
  }

  return await prisma.appointment.update({
    where: { id },
    data: {
      date,
      notes,
    },
  });
};

export const deleteAppointment = async (id: string, userId: string) => {
  const appointment = await prisma.appointment.findUnique({
    where: { id },
  });

  if (!appointment || appointment.patientId !== userId) {
    throw new Error('Appointment not found or access denied.');
  }

  return await prisma.appointment.delete({
    where: { id },
  });
};
