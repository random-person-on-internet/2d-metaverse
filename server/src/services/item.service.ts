import prisma from "../db/prisma";

export const createItem = async (data: any) => {
  return await prisma.itemDefinition.create({ data: data });
};

export const getAllItems = async () => {
  return await prisma.itemDefinition.findMany();
};

export const getItemById = async (id: number) => {
  return await prisma.itemDefinition.findUnique({ where: { id: Number(id) } });
};

export const updateItem = async (id: number, data: any) => {
  return await prisma.itemDefinition.update({
    where: { id: Number(id) },
    data: data,
  });
};

export const deleteItem = async (id: number) => {
  return await prisma.itemDefinition.delete({ where: { id: Number(id) } });
};
