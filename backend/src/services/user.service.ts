import { PrismaClient } from '@prisma/client';
import { Role } from '@prisma/client';

const prisma = new PrismaClient();

export const listProfessionals = async () => {
  return await prisma.user.findMany({
    where: { role: 'PROFESSIONAL' },
    select: {
      id: true,
      name: true,
      email: true
    }
  });
};

export const listUsers = async (role?: Role) => {
  return await prisma.user.findMany({
    where: role ? { role } : {},
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
      createdAt: true,
      updatedAt: true,
    },
    orderBy: { name: 'asc' },
  });
};
