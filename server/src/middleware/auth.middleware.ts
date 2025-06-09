import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

interface AuthRequest extends Request {
  user?: {
    userId: number;
    role: string;
  };
}

export const verifyToken = (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer")) {
    res.status(401).json({ message: "Unauthorized" });
    return;
  }

  const token = authHeader.split(" ")[1];

  try {
    const decode = jwt.verify(token, process.env.JWT_SECRET!) as {
      userId: number;
      role: string;
    };
    req.user = {
      userId: decode.userId,
      role: decode.role,
    };
    next();
  } catch (e) {
    res.status(403).json({ message: "Invalid token" });
    return;
  }
};
