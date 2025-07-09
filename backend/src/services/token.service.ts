import jwt from 'jsonwebtoken';
import { PrismaClient } from '@prisma/client';
import { v4 as uuidv4 } from 'uuid';

const prisma = new PrismaClient();
const ACCESS_SECRET = process.env.JWT_SECRET!;
const REFRESH_EXPIRATION_DAYS = 7;

export const generateAccessToken = (user: any) => {
  return jwt.sign(user, ACCESS_SECRET, { expiresIn: '15m' });
};

export const generateRefreshToken = async (userId: string) => {
  const token = uuidv4();
  const expires = new Date();
  expires.setDate(expires.getDate() + REFRESH_EXPIRATION_DAYS);

  await prisma.refreshToken.create({
    data: {
      token,
      userId,
      expiresAt: expires,
    },
  });

  return { token, expires };
};

export const verifyRefreshToken = async (token: string) => {
  const stored = await prisma.refreshToken.findUnique({ where: { token } });

  if (!stored || stored.expiresAt < new Date()) {
    throw { status: 401, message: 'Invalid or expired refresh token' };
  }

  const user = await prisma.user.findUnique({ where: { id: stored.userId } });

  if (!user) {
    throw { status: 404, message: 'User not found' };
  }

  return {
    id: user.id,
    name: user.name,
    email: user.email,
    role: user.role,
  };
};

export const revokeRefreshToken = async (token: string) => {
  await prisma.refreshToken.deleteMany({ where: { token } });
};
