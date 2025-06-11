import prisma from "../db/prisma";
import bcrypt from "bcryptjs";
import { generateToken } from "../utils/generateToken";

export const signupUser = async (
  email: string,
  password: string,
  username: string,
  avatar?: string
) => {
  const existingUser = await prisma.user.findUnique({
    where: { email: email },
  });
  if (existingUser) {
    throw new Error("User already exists");
  }

  const hashed = await bcrypt.hash(password, 10);
  const user = await prisma.user.create({
    data: {
      email: email,
      password: hashed,
      username: username,
      avatar: avatar || undefined,
      role: "USER",
    },
  });

  return generateToken(user.id, user.role);
};

export const loginUser = async (email: string, password: string) => {
  const user = await prisma.user.findUnique({ where: { email: email } });
  if (!user) throw new Error("Invalid credentials");

  const match = await bcrypt.compare(password, user.password);
  if (!match) throw new Error("Invalid credentials");
  return generateToken(user.id, user.role);
};
