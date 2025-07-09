import { PrismaClient, Role } from '@prisma/client';
import { hashPassword, comparePasswords } from '../utils/hash';
import { generateToken } from '../utils/jwt';

const prisma = new PrismaClient();

export const registerUser = async (name: string, email: string, password: string, role: Role) => {
  const existingUser = await prisma.user.findUnique({ where: { email } });
  if (existingUser) throw new Error('Email already in use');

  const hashedPassword = await hashPassword(password);

  const user = await prisma.user.create({
    data: {
      name,
      email,
      password: hashedPassword,
      role
    }
  });

  const { password: _, ...safeUser } = user;
  return safeUser;
};

export const loginUser = async (email: string, password: string) => {
  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) throw new Error('Invalid credentials');

  const isMatch = await comparePasswords(password, user.password);
  if (!isMatch) throw new Error('Invalid credentials');

  const token = generateToken({ userId: user.id, role: user.role });

  return {
    token,
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role
    }
  };
};
