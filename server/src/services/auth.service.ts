import prisma from "../db/prisma";
import bcrypt from "bcryptjs";
import { generateToken } from "../utils/generateToken";
import { ApiError } from "../utils/ApiError";

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
    throw new ApiError("User already exists", 400);
  }

  try {
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

    const token = generateToken(user.id, user.role);
    return token;
  } catch (err) {
    throw new ApiError("Signup failed", 500);
  }
};

export const loginUser = async (email: string, password: string) => {
  const user = await prisma.user.findUnique({ where: { email: email } });
  if (!user) throw new ApiError("Invalid credentials", 401);

  const match = await bcrypt.compare(password, user.password);
  if (!match) throw new ApiError("Invalid credentials", 401);

  try {
    const token = generateToken(user.id, user.role);
    return token;
  } catch (err) {
    throw new ApiError("Login failed", 500);
  }
};
