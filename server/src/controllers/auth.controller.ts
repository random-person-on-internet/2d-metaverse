import { Request, Response } from "express";
import * as AuthService from "../services/auth.service";

export const signup = async (req: Request, res: Response) => {
  const { email, password, username, avatar } = req.body;
  try {
    const token = await AuthService.signupUser(
      email,
      password,
      username,
      avatar
    );
    res.status(200).json({ Token: token });
  } catch (e) {
    res.status(400).json({ message: "Signup failed", details: e });
  }
};

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  try {
    const token = await AuthService.loginUser(email, password);
    res.status(200).json({ Token: token });
  } catch (e) {
    res.status(401).json({ message: "Signin failed", details: e });
  }
};

export const protectedRoute = (req: Request, res: Response) => {
  res.json({ message: `Hello User ${req.user?.userId}` });
  console.log(req.user);
};
