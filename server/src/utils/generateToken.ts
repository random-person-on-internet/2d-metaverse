import jwt from "jsonwebtoken";

export const generateToken = (userId: number, role: string): string => {
  return jwt.sign({ userId, role }, process.env.JWT_SECRET!, {
    expiresIn: "1d",
  });
};
