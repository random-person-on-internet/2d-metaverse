import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import { generateToken } from "../utils/generateToken";
import prisma from "../db/prisma";

export const signup = async (req: Request, res: Response) => {
  const { email, password, username, avatar } = req.body;

  const existingUser = await prisma.user.findUnique({ where: { email } });

  if (existingUser) {
    res.status(400).json({ message: "User already exists" });
    return;
  }

  const hashed = await bcrypt.hash(password, 10);
  const user = await prisma.user.create({
    data: {
      email: email,
      password: hashed,
      username: username,
      role: "USER",
      avatar: avatar || undefined,
    },
  });

  res.json({ token: generateToken(user.id, user.role) });
};

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  const user = await prisma.user.findUnique({ where: { email } });

  if (!user) {
    res.status(401).json({ message: "Invalid credentials" });
    return;
  }

  const match = await bcrypt.compare(password, user.password);
  if (!match) {
    res.status(401).json({ message: "Invalid password" });
    return;
  }
  res.json({ token: generateToken(user.id, user.role) });
};

export const protectedRoute = (req: Request, res: Response) => {
  res.json({ message: `Hello User ${req.user?.userId}` });
  console.log(req.user);
};
