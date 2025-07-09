import { PrismaClient } from '@prisma/client';

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
