import prisma from "../db/prisma";
import bcrypt from "bcryptjs";

export const getUserData = async (id: number) => {
  return await prisma.user.findUnique({ where: { id: id } });
};

export const changePassword = async (id: number, password: string) => {
  const hashed = await bcrypt.hash(password, 10);
  return await prisma.user.update({
    where: { id: id },
    data: { password: hashed },
  });
};

export const changeUsername = async (id: number, username: string) => {
  return await prisma.user.update({
    where: { id: id },
    data: { username: username },
  });
};

export const changeAvatar = async (id: number, avatar: string) => {
  return await prisma.user.update({
    where: { id: id },
    data: { avatar: avatar },
  });
};

export const changeCoins = async (id: number, coins: number) => {
  return await prisma.user.update({
    where: { id: id },
    data: { coins: coins },
  });
};

export const addItemToUser = async (id: number, data: any) => {
  const { definitionId, x, y, stackCount, isEquipped, isPlaced } = data;

  return await prisma.itemInstance.create({
    data: {
      userId: id,
      definitionId: definitionId,
      x,
      y,
      stackCount,
      isEquipped,
      isPlaced,
    },
  });
};

export const updateUserItem = async (id: number, data: any) => {
  return await prisma.itemInstance.update({
    where: { id: id },
    data: data,
  });
};

export const deleteUserItem = async (itemId: number) => {
  return await prisma.itemInstance.delete({ where: { id: itemId } });
};

export const deleteUser = async (id: number) => {
  return await prisma.user.update({
    where: { id: id },
    data: { isDeleted: true },
  });
};

export const getMe = async (id: number) => {
  return await prisma.user.findUnique({
    where: { id: id },
    include: { items: true },
  });
};
