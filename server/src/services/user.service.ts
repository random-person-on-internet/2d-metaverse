import prisma from "../db/prisma";
import bcrypt from "bcryptjs";
import { ApiError } from "../utils/ApiError";

export const getUserData = async (id: number) => {
  const user = await prisma.user.findUnique({ where: { id: id } });
  if (!user) {
    throw new ApiError("User not found", 404);
  }
  return user;
};

export const changePassword = async (id: number, password: string) => {
  const hashed = await bcrypt.hash(password, 10);

  const user = await prisma.user.findUnique({ where: { id: id } });
  if (!user) {
    throw new ApiError("User not found", 404);
  }

  try {
    const updated = await prisma.user.update({
      where: { id: id },
      data: { password: hashed },
    });

    return updated;
  } catch (err) {
    throw new ApiError("Failed to update password", 500);
  }
};

export const changeUsername = async (id: number, username: string) => {
  const user = await prisma.user.findUnique({ where: { id: id } });
  if (!user) {
    throw new ApiError("User not found", 404);
  }

  try {
    const updated = await prisma.user.update({
      where: { id: id },
      data: { username: username },
    });

    return updated;
  } catch (err) {
    throw new ApiError("Failed to update username", 500);
  }
};

export const changeAvatar = async (id: number, avatar: string) => {
  const user = await prisma.user.findUnique({ where: { id: id } });
  if (!user) {
    throw new ApiError("User not found", 404);
  }

  try {
    const updated = await prisma.user.update({
      where: { id: id },
      data: { avatar: avatar },
    });

    return updated;
  } catch (err) {
    throw new ApiError("Failed to update avatar", 500);
  }
};

export const changeCoins = async (id: number, coins: number) => {
  const user = await prisma.user.findUnique({ where: { id: id } });
  if (!user) {
    throw new ApiError("User not found", 404);
  }

  try {
    const updated = await prisma.user.update({
      where: { id: id },
      data: { coins: coins },
    });

    return updated;
  } catch (err) {
    throw new ApiError("Failed to update coins", 500);
  }
};

export const addItemToUser = async (id: number, data: any) => {
  const { definitionId, x, y, stackCount, isEquipped, isPlaced } = data;

  try {
    const item = await prisma.itemInstance.create({
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

    return item;
  } catch (err) {
    throw new ApiError("Failed to add item to user", 500);
  }
};

export const updateUserItem = async (id: number, data: any) => {
  const item = await prisma.itemInstance.findUnique({ where: { id: id } });
  if (!item) {
    throw new ApiError("Item not found", 404);
  }

  try {
    const updated = await prisma.itemInstance.update({
      where: { id: id },
      data: data,
    });

    return updated;
  } catch (err) {
    throw new ApiError("Failed to update user item", 500);
  }
};

export const deleteUserItem = async (itemId: number) => {
  const item = await prisma.itemInstance.findUnique({ where: { id: itemId } });
  if (!item) {
    throw new ApiError("Item not found", 404);
  }

  try {
    return await prisma.itemInstance.delete({ where: { id: itemId } });
  } catch (err) {
    throw new ApiError("Failed to delete user item", 500);
  }
};

export const deleteUser = async (id: number) => {
  const user = await prisma.user.findUnique({ where: { id: id } });
  if (!user) {
    throw new ApiError("User not found", 404);
  }

  try {
    return await prisma.user.update({
      where: { id: id },
      data: { isDeleted: true },
    });
  } catch (err) {
    throw new ApiError("Failed to delete user", 500);
  }
};

export const getMe = async (id: number) => {
  const me = await prisma.user.findUnique({
    where: { id: id },
    include: { items: true },
  });

  if (!me) {
    throw new ApiError("User not found", 404);
  }
  return me;
};
