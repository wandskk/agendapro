import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const getAppointments = async (userId: string) => {
  return await prisma.appointment.findMany({
    where: { patientId: userId },
    orderBy: { date: "asc" },
  });
};

export const createAppointment = async (
  userId: string,
  professionalId: string,
  date: Date,
  notes?: string
) => {
  const conflict = await prisma.appointment.findFirst({
    where: {
      professionalId,
      date,
    },
  });

  if (conflict) throw new Error("This time slot is already taken.");

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
    throw new Error("Appointment not found or access denied.");
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
    throw new Error("Appointment not found or access denied.");
  }

  return await prisma.appointment.delete({
    where: { id },
  });
};
