import { NextFunction, Request, Response } from "express";
import * as AuthService from "../services/auth.service";

export const signup = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { email, password, username, avatar } = req.body;
  try {
    const token = await AuthService.signupUser(
      email,
      password,
      username,
      avatar
    );
    res.status(200).json({ token: token });
  } catch (e: any) {
    next(e);
  }
};

export const login = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { email, password } = req.body;
  try {
    const token = await AuthService.loginUser(email, password);
    res.status(200).json({ token: token });
  } catch (e: any) {
    next(e);
  }
};

export const protectedRoute = (req: Request, res: Response) => {
  res.json({ message: `Hello User ${req.user?.userId}` });
  // console.log(req.user);
};
