import { Request, Response } from "express";
import prisma from "../db/prisma";

export const createItem = async (req: Request, res: Response) => {
  try {
    const item = await prisma.itemDefinition.create({ data: req.body });
    res.status(201).json(item);
  } catch (e) {
    res.status(400).json({ error: "Failer to create item", details: e });
  }
};

export const getAllItems = async (req: Request, res: Response) => {
  const items = await prisma.itemDefinition.findMany();
  res.json(items);
};

export const getItemById = async (req: Request, res: Response) => {
  const { id } = req.params;
  const item = await prisma.itemDefinition.findUnique({
    where: { id: Number(id) },
  });
  if (!item) {
    res.status(404).json({ error: "Item not found" });
    return;
  }
  res.json(item);
};

export const updateItem = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const updated = await prisma.itemDefinition.update({
      where: { id: Number(id) },
      data: req.body,
    });
    res.status(200).json(updated);
  } catch (e) {
    res.status(400).json({ error: "Failed to update item", details: e });
  }
};

export const deleteItem = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    await prisma.itemDefinition.delete({ where: { id: Number(id) } });
    res.status(204).send();
  } catch (e) {
    res.status(400).json({ error: "Failed to delete item", details: e });
  }
};
