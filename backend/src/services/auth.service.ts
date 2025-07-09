import { PrismaClient, Role } from "@prisma/client";
import { hashPassword } from "../utils/hash";

const prisma = new PrismaClient();

export const registerUser = async (
  name: string,
  email: string,
  password: string,
  role: Role
) => {
  const existingUser = await prisma.user.findUnique({ where: { email } });
  if (existingUser) throw new Error("Email already in use");

  const hashedPassword = await hashPassword(password);

  const user = await prisma.user.create({
    data: {
      name,
      email,
      password: hashedPassword,
      role,
    },
  });

  const { password: _, ...safeUser } = user;
  return safeUser;
};
