import prisma from "../db/prisma";
import { Request, Response } from "express";
import * as UserService from "../services/user.service";

export const getUserData = async (req: Request, res: Response) => {
  try {
    const userData = await UserService.getUserData(Number(req.params.id));
    res.status(200).json(userData);
  } catch (e) {
    res.status(400).json({ error: "Failed to get user data", details: e });
  }
};

export const changePassword = async (req: Request, res: Response) => {
  const { password } = req.body;
  try {
    const updated = await UserService.changePassword(
      Number(req.params.id),
      password
    );
    res.status(200).json(updated);
  } catch (e) {
    res.status(400).json({ error: "Failed to change password", details: e });
  }
};

export const changeUsername = async (req: Request, res: Response) => {
  const { username } = req.body;
  try {
    const updated = await UserService.changeUsername(
      Number(req.params.id),
      username
    );
    res.status(200).json(updated);
  } catch (e) {
    res.status(400).json({ error: "Failed to change username", details: e });
  }
};

export const changeAvatar = async (req: Request, res: Response) => {
  const { avatar } = req.body;
  try {
    const updated = await UserService.changeAvatar(
      Number(req.params.id),
      avatar
    );
    res.status(200).json(updated);
  } catch (e) {
    res.status(400).json({ error: "Failed to change avatar", details: e });
  }
};

export const changeCoins = async (req: Request, res: Response) => {
  const { coins } = req.body;
  try {
    const updated = await UserService.changeCoins(Number(req.params.id), coins);
    res.status(200).json(updated);
  } catch (e) {
    res.status(400).json({ error: "Failed to update coins", details: e });
  }
};

export const addItemToUser = async (req: Request, res: Response) => {
  try {
    const item = await UserService.addItemToUser(
      Number(req.params.id),
      req.body
    );
    res.status(201).json(item);
  } catch (e) {
    res.status(400).json({ error: "Failed to add item to user", details: e });
  }
};

export const updateUserItem = async (req: Request, res: Response) => {
  const { itemId } = req.params;
  try {
    const updated = await UserService.updateUserItem(Number(itemId), req.body);
    res.status(200).json(updated);
  } catch (e) {
    res.status(400).json({ error: "Failed to update user item", details: e });
  }
};

export const deleteUserItem = async (req: Request, res: Response) => {
  const { itemId } = req.params;
  try {
    await UserService.deleteUserItem(Number(itemId));
    res.status(204).send();
  } catch (e) {
    res.status(400).json({ error: "Failed to delete user item", details: e });
  }
};

export const deleteUser = async (req: Request, res: Response) => {
  try {
    await UserService.deleteUser(Number(req.params.id));
    res.status(204).send();
  } catch (e) {
    res.status(400).json({ error: "Failed to delete user", details: e });
  }
};
