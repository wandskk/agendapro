import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

const secret = process.env.JWT_SECRET;
if (!secret) {
  throw new Error("JWT_SECRET is not defined in environment variables");
}

export const generateToken = (payload: object): string => {
  return jwt.sign(payload, secret, {
    expiresIn: process.env.JWT_EXPIRES_IN || "1d",
  });
};

export const verifyToken = (token: string): any => {
  return jwt.verify(token, secret);
};
