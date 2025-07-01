import { NextFunction, Request, Response } from "express";
import * as UserService from "../services/user.service";

export const getUserData = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const userData = await UserService.getUserData(Number(req.params.id));
    res.status(200).json(userData);
  } catch (e: any) {
    next(e);
  }
};

export const changePassword = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { password } = req.body;
  try {
    const updated = await UserService.changePassword(
      Number(req.params.id),
      password
    );
    res.status(200).json(updated);
  } catch (e: any) {
    next(e);
  }
};

export const changeUsername = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { username } = req.body;
  try {
    const updated = await UserService.changeUsername(
      Number(req.params.id),
      username
    );
    res.status(200).json(updated);
  } catch (e: any) {
    next(e);
  }
};

export const changeAvatar = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { avatar } = req.body;
  try {
    const updated = await UserService.changeAvatar(
      Number(req.params.id),
      avatar
    );
    res.status(200).json(updated);
  } catch (e: any) {
    next(e);
  }
};

export const changeCoins = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { coins } = req.body;
  try {
    const updated = await UserService.changeCoins(Number(req.params.id), coins);
    res.status(200).json(updated);
  } catch (e: any) {
    next(e);
  }
};

export const addItemToUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const item = await UserService.addItemToUser(
      Number(req.params.id),
      req.body
    );
    res.status(201).json(item);
  } catch (e: any) {
    next(e);
  }
};

export const updateUserItem = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { itemId } = req.params;
  try {
    const updated = await UserService.updateUserItem(Number(itemId), req.body);
    res.status(200).json(updated);
  } catch (e: any) {
    next(e);
  }
};

export const deleteUserItem = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { itemId } = req.params;
  try {
    await UserService.deleteUserItem(Number(itemId));
    res.status(204).send();
  } catch (e: any) {
    next(e);
  }
};

export const deleteUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    await UserService.deleteUser(Number(req.params.id));
    res.status(204).send();
  } catch (e: any) {
    next(e);
  }
};

export const getMe = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const userId = req.user?.userId;
    if (!userId) {
      res.status(401).json({ message: "Unauthorized" });
      return;
    }

    const user = await UserService.getMe(Number(userId));

    if (!user) {
      res.status(404).json({ message: "User not found" });
      return;
    }

    res.status(200).json({
      id: user.id,
      username: user.username,
      avatar: user.avatar,
      coins: user.coins,
      items: user.items,
    });
  } catch (e: any) {
    next(e);
  }
};
