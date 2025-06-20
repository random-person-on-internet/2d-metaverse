import prisma from "../db/prisma";

// room operations

export const createRoom = async (data: any) => {
  return await prisma.room.create({ data });
};

export const getAllRooms = async () => {
  return await prisma.room.findMany({
    where: { isDeleted: false },
  });
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

export const getRoomMap = async () => {
  return await prisma.room.findMany({
    where: {
      isPublic: true,
      isDeleted: false,
    },
    select: {
      id: true,
      name: true,
      type: true,
      x: true,
      y: true,
      xlen: true,
      ylen: true,
    },
  });
};

export const getRoomDoors = async (id: number) => {
  return await prisma.room.findFirst({
    where: {
      id: id,
      isDeleted: false,
    },
    select: {
      id: true,
      fromDoors: {
        select: {
          id: true,
          x: true,
          y: true,
          toRoomId: true,
          toRoom: {
            select: {
              id: true,
              name: true,
              type: true,
            },
          },
        },
      },
    },
  });
};

export const createRoomDoor = async (
  fromRoomId: number,
  toRoomId: number,
  x: number,
  y: number
) => {
  return await prisma.roomDoor.create({
    data: {
      x: x,
      y: y,
      fromRoomId: fromRoomId,
      toRoomId: toRoomId,
    },
  });
};

export const deleteRoomDoor = async (doorId: number) => {
  return await prisma.roomDoor.delete({
    where: {
      id: doorId,
    },
  });
};
