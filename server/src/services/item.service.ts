import prisma from "../db/prisma";
import { ApiError } from "../utils/ApiError";

export const createItem = async (data: any) => {
  try {
    const item = await prisma.itemDefinition.create({ data: data });
    return item;
  } catch (e) {
    throw new ApiError(`Failed to create item`, 500);
  }
};

export const getAllItems = async () => {
  try {
    const items = await prisma.itemDefinition.findMany({
      where: { isDeleted: false },
    });
    return items;
  } catch (e) {
    throw new ApiError(`Failed to get all items`, 500);
  }
};

export const getItemById = async (id: number) => {
  try {
    const item = await prisma.itemDefinition.findUnique({
      where: { id: Number(id) },
    });

    if (!item || item.isDeleted) {
      throw new ApiError(`Item with ID ${id} not found`, 404);
    }

    return item;
  } catch (e) {
    throw new ApiError(`Failed to get item with ID ${id}`, 500);
  }
};

export const updateItem = async (id: number, data: any) => {
  const existingItem = await prisma.itemDefinition.findUnique({
    where: { id: Number(id) },
  });

  if (!existingItem || existingItem.isDeleted) {
    throw new ApiError(`Item with ID ${id} not found`, 404);
  }

  try {
    const updated = await prisma.itemDefinition.update({
      where: { id: Number(id) },
      data: data,
    });

    return updated;
  } catch (e) {
    throw new ApiError(`Failed to update item with ID ${id}`, 500);
  }
};

export const deleteItem = async (id: number) => {
  const existingItem = await prisma.itemDefinition.findUnique({
    where: { id: Number(id) },
  });

  if (!existingItem || existingItem.isDeleted) {
    throw new ApiError(`Item with ID ${id} not found`, 404);
  }

  try {
    return await prisma.itemDefinition.update({
      where: { id: Number(id) },
      data: { isDeleted: true },
    });
  } catch (e) {
    throw new ApiError(`Failed to delete item with ID ${id}`, 500);
  }
};
