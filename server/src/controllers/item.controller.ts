import { NextFunction, Request, Response } from "express";
import * as ItemService from "../services/item.service";

export const createItem = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const item = await ItemService.createItem({ data: req.body });
    res.status(201).json(item);
  } catch (e: any) {
    next(e);
  }
};

export const getAllItems = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const items = await ItemService.getAllItems();
    res.status(200).json(items);
  } catch (e: any) {
    next(e);
  }
};

export const getItemById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { id } = req.params;
  try {
    const item = await ItemService.getItemById(Number(id));
    res.status(200).json(item);
  } catch (e: any) {
    next(e);
  }
};

export const updateItem = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { id } = req.params;
  try {
    const updated = await ItemService.updateItem(Number(id), req.body);
    res.status(200).json(updated);
  } catch (e: any) {
    next(e);
  }
};

export const deleteItem = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { id } = req.params;
  try {
    await ItemService.deleteItem(Number(id));
    res.status(204).send();
  } catch (e: any) {
    next(e);
  }
};
