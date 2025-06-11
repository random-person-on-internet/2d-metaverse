import { Request, Response } from "express";
import prisma from "../db/prisma";
import * as ItemService from "../services/item.service";

export const createItem = async (req: Request, res: Response) => {
  try {
    const item = await ItemService.createItem({ data: req.body });
    res.status(201).json(item);
  } catch (e) {
    res.status(400).json({ error: "Failed to create item", details: e });
  }
};

export const getAllItems = async (req: Request, res: Response) => {
  try {
    const items = await ItemService.getAllItems();
    res.status(200).json(items);
  } catch (e) {
    res.status(400).json({ error: "Failed to get all items", details: e });
  }
};

export const getItemById = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const item = await ItemService.getItemById(Number(id));
    if (!item) {
      res.status(404).json({ error: "Item not found" });
      return;
    }
    res.status(200).json(item);
  } catch (e) {
    res.status(400).json({ error: "Failed to get item by ID", details: e });
  }
};

export const updateItem = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const updated = await ItemService.updateItem(Number(id), req.body);
    res.status(200).json(updated);
  } catch (e) {
    res.status(400).json({ error: "Failed to update item", details: e });
  }
};

export const deleteItem = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    await ItemService.deleteItem(Number(id));
    res.status(204).send();
  } catch (e) {
    res.status(400).json({ error: "Failed to delete item", details: e });
  }
};
