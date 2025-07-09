import { Request, Response } from "express";
import { registerUser, loginUser } from "../services/auth.service";
import { registerSchema, loginSchema } from "../validations/auth.schema";
import { wrap } from "../utils/wrap";
import {
  generateAccessToken,
  generateRefreshToken,
  verifyRefreshToken,
} from "../services/token.service";

const register = async (req: Request, res: Response) => {
  const data = registerSchema.parse(req.body);
  const user = await registerUser(
    data.name,
    data.email,
    data.password,
    data.role
  );
  res.status(201).json(user);
};

const login = async (req: Request, res: Response) => {
  const data = loginSchema.parse(req.body);
  const result = await loginUser(data.email, data.password);

  const accessToken = generateAccessToken(result.user);
  const { token: refreshToken, expires } = await generateRefreshToken(
    result.user.id
  );

  res
    .cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      expires,
    })
    .json({ accessToken });
};

const refresh = async (req: Request, res: Response) => {
  const token = req.cookies?.refreshToken;

  if (!token) {
    throw { status: 401, message: "Missing refresh token" };
  }

  const user = await verifyRefreshToken(token);
  const accessToken = generateAccessToken(user);

  res.json({ accessToken });
};

export default {
  register: wrap(register),
  login: wrap(login),
  refresh: wrap(refresh),
};
