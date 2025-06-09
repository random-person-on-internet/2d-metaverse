import bcrypt from "bcryptjs";
import prisma from "../db/prisma";
import { Request, Response } from "express";

export const changePassword = async (req: Request, res: Response) => {
  const { password } = req.body;
  const hashed = await bcrypt.hash(password, 10);
  try {
    await prisma.user.update({
      where: { id: Number(req.params.id) },
      data: { password: hashed },
    });
    res.json({ message: "Password updated" });
  } catch (e) {
    res.status(400).json({ error: "Failed to change password", details: e });
  }
};

export const changeUsername = async (req: Request, res: Response) => {
  const { username } = req.body;
  try {
    await prisma.user.update({
      where: { id: Number(req.params.id) },
      data: { username: username },
    });
    res.json({ message: "Username updated" });
  } catch (e) {
    res.status(400).json({ error: "Failed to change username", details: e });
  }
};

export const changeAvatar = async (req: Request, res: Response) => {
  const { avatar } = req.body;
  try {
    await prisma.user.update({
      where: { id: Number(req.params.id) },
      data: { avatar },
    });
    res.json({ message: "Avatar updated" });
  } catch (e) {
    res.status(400).json({ error: "Failed to change avatar", details: e });
  }
};

export const changeCoins = async (req: Request, res: Response) => {
  const { coins } = req.body;
  try {
    await prisma.user.update({
      where: { id: Number(req.params.id) },
      data: { coins: coins },
    });
    res.json({ message: "Coins updated" });
  } catch (e) {
    res.status(400).json({ error: "Failed to update coins", details: e });
  }
};

export const addItemToUser = async (req: Request, res: Response) => {
  const userId = Number(req.params.id);
  const { definitionId, x, y, stackCount, isEquipped, isPlaced } = req.body;

  try {
    const item = await prisma.itemInstance.create({
      data: {
        userId: userId,
        definitionId: definitionId,
        x,
        y,
        stackCount,
        isEquipped,
        isPlaced,
      },
    });

    res.status(201).json(item);
  } catch (e) {
    res.status(400).json({ error: "Failer to add item to user", details: e });
  }
};

export const updateUserItem = async (req: Request, res: Response) => {
  const { itemId } = req.params;
  const data = req.body;
  try {
    const updated = await prisma.itemInstance.update({
      where: { id: Number(itemId) },
      data: data,
    });

    res.json(updated);
  } catch (e) {
    res.status(400).json({ error: "Failer to update user item", details: e });
  }
};

export const deleteUserItem = async (req: Request, res: Response) => {
  const { itemId } = req.params;

  try {
    await prisma.itemInstance.delete({
      where: { id: Number(itemId) },
    });

    res.status(204).send();
  } catch (e) {
    res.status(400).json({ error: "Failer to delete user item", details: e });
  }
};

export const deleteUser = async (req: Request, res: Response) => {
  try {
    await prisma.user.delete({
      where: { id: Number(req.params.id) },
    });
    res.status(204).send();
  } catch (e) {
    res.status(400).json({ error: "Failer to delete user", details: e });
  }
};
