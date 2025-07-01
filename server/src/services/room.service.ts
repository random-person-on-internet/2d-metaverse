import prisma from "../db/prisma";
import { ApiError } from "../utils/ApiError";

// room operations

export const createRoom = async (data: any) => {
  try {
    const room = await prisma.room.create({ data });
    return room;
  } catch (e) {
    throw new ApiError("Failed to create room", 500);
  }
};

export const getAllRooms = async () => {
  try {
    const rooms = await prisma.room.findMany({
      where: { isDeleted: false },
    });
    return rooms;
  } catch (e) {
    throw new ApiError("Failed to get all rooms", 500);
  }
};

export const getRoomById = async (id: number) => {
  try {
    const room = await prisma.room.findUnique({ where: { id: id } });

    if (!room || room.isDeleted) {
      throw new ApiError(`Room with ID ${id} not found`, 404);
    }

    return room;
  } catch (e) {
    throw new ApiError(`Failed to get room with ID ${id}`, 500);
  }
};

export const updateRoom = async (id: number, data: any) => {
  const room = await prisma.room.findUnique({ where: { id: id } });

  if (!room || room.isDeleted) {
    throw new ApiError(`Room with ID ${id} not found`, 404);
  }

  try {
    const updated = await prisma.room.update({ where: { id: id }, data });
    return updated;
  } catch (e) {
    throw new ApiError(`Failed to update room with ID ${id}`, 500);
  }
};

export const deleteRoom = async (id: number) => {
  const room = await prisma.room.findUnique({ where: { id: id } });

  if (!room || room.isDeleted) {
    throw new ApiError(`Room with ID ${id} not found`, 404);
  }

  try {
    const updated = await prisma.room.update({
      where: { id: id },
      data: { isDeleted: true },
    });

    return updated;
  } catch (e) {
    throw new ApiError(`Failed to delete room with ID ${id}`, 500);
  }
};

// users in room

export const joinRoom = async (
  userId: number,
  roomId: number,
  x: number = 0,
  y: number = 0,
  team: string | null = null
) => {
  const room = await prisma.room.findUnique({
    where: {
      id: roomId,
    },
  });

  if (!room || room.isDeleted) {
    throw new ApiError(`Room with ID ${roomId} not found`, 404);
  }

  try {
    const userInRoom = await prisma.userInRoom.create({
      data: { userId, roomId, x, y, team },
    });

    return userInRoom;
  } catch (e) {
    throw new ApiError(`Failed to join room with ID ${roomId}`, 500);
  }
};

export const leaveRoom = async (userId: number, roomId: number) => {
  const userInRoom = await prisma.userInRoom.findUnique({
    where: { userId_roomId: { userId, roomId } },
  });

  if (!userInRoom) {
    throw new ApiError(
      `User with ID ${userId} is not in room with ID ${roomId}`,
      404
    );
  }

  try {
    return await prisma.userInRoom.delete({
      where: { userId_roomId: { userId, roomId } },
    });
  } catch (e) {
    throw new ApiError(`Failed to leave room with ID ${roomId}`, 500);
  }
};

export const getUsersInRoom = async (roomId: number) => {
  try {
    const users = await prisma.userInRoom.findMany({
      where: { roomId },
      include: { user: true },
    });

    if (!users || users.length === 0) {
      throw new ApiError(`No users found in room with ID ${roomId}`, 404);
    }

    return users;
  } catch (e) {
    throw new ApiError(`Failed to get users in room with ID ${roomId}`, 500);
  }
};

export const updateUserInRoom = async (
  userId: number,
  roomId: number,
  data: any
) => {
  const userInRoom = await prisma.userInRoom.findUnique({
    where: { userId_roomId: { userId, roomId } },
  });

  if (!userInRoom) {
    throw new ApiError(
      `User with ID ${userId} is not in room with ID ${roomId}`,
      404
    );
  }

  try {
    return await prisma.userInRoom.update({
      where: { userId_roomId: { userId, roomId } },
      data,
    });
  } catch (e) {
    throw new ApiError(
      `Failed to update user ${userId} in room with ID ${roomId}`,
      500
    );
  }
};

export const getRoomMap = async () => {
  try {
    const maps = await prisma.room.findMany({
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

    return maps;
  } catch (e) {
    throw new ApiError("Failed to get room map", 500);
  }
};

export const getRoomDoors = async (id: number) => {
  const room = await prisma.room.findUnique({
    where: { id: id },
  });

  if (!room || room.isDeleted) {
    throw new ApiError(`Room with ID ${id} not found`, 404);
  }

  try {
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
  } catch (e) {
    throw new ApiError(`Failed to get doors for room with ID ${id}`, 500);
  }
};

export const createRoomDoor = async (
  fromRoomId: number,
  toRoomId: number,
  x: number,
  y: number
) => {
  const fromRoom = await prisma.room.findUnique({
    where: { id: fromRoomId },
  });

  if (!fromRoom || fromRoom.isDeleted) {
    throw new ApiError(`From room with ID ${fromRoomId} not found`, 404);
  }

  const toRoom = await prisma.room.findUnique({
    where: { id: toRoomId },
  });

  if (!toRoom || toRoom.isDeleted) {
    throw new ApiError(`To room with ID ${toRoomId} not found`, 404);
  }

  try {
    const door = await prisma.roomDoor.create({
      data: {
        x: x,
        y: y,
        fromRoomId: fromRoomId,
        toRoomId: toRoomId,
      },
    });

    return door;
  } catch (e) {
    throw new ApiError(
      `Failed to create door from room ${fromRoomId} to room ${toRoomId}`,
      500
    );
  }
};

export const deleteRoomDoor = async (doorId: number) => {
  const door = await prisma.roomDoor.findUnique({
    where: { id: doorId },
  });

  if (!door) {
    throw new ApiError(`Door with ID ${doorId} not found`, 404);
  }

  try {
    return await prisma.roomDoor.delete({
      where: {
        id: doorId,
      },
    });
  } catch (e) {
    throw new ApiError(`Failed to delete door with ID ${doorId}`, 500);
  }
};
