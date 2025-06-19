import prisma from "../db/prisma";

// room operations

export const createRoom = async (data: any) => {
  return await prisma.room.create({ data });
};

export const getAllRooms = async () => {
  return await prisma.room.findMany();
};

export const getRoomById = async (id: number) => {
  return await prisma.room.findUnique({ where: { id: id } });
};

export const updateRoom = async (id: number, data: any) => {
  return await prisma.room.update({ where: { id: id }, data });
};

export const deleteRoom = async (id: number) => {
  return await prisma.room.update({
    where: { id: id },
    data: { isDeleted: true },
  });
};

// users in room

export const joinRoom = async (
  userId: number,
  roomId: number,
  x: number = 0,
  y: number = 0,
  team: string | null = null
) => {
  return await prisma.userInRoom.create({
    data: { userId, roomId, x, y, team },
  });
};

export const leaveRoom = async (userId: number, roomId: number) => {
  return await prisma.userInRoom.delete({
    where: { userId_roomId: { userId, roomId } },
  });
};

export const getUsersInRoom = async (roomId: number) => {
  return await prisma.userInRoom.findMany({
    where: { roomId },
    include: { user: true },
  });
};

export const updateUserInRoom = async (
  userId: number,
  roomId: number,
  data: any
) => {
  return await prisma.userInRoom.update({
    where: { userId_roomId: { userId, roomId } },
    data,
  });
};
