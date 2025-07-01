import { NextFunction, Request, Response } from "express";
import * as RoomService from "../services/room.service";

export const createRoom = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const room = await RoomService.createRoom(req.body);
    res.status(201).json(room);
  } catch (e: any) {
    next(e);
  }
};

export const getAllRooms = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const roomData = await RoomService.getAllRooms();
    res.status(200).json(roomData);
    return;
  } catch (e: any) {
    next(e);
  }
};

export const getRoomById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const roomId = Number(req.params.id);
  try {
    const roomData = await RoomService.getRoomById(roomId);
    res.status(200).json(roomData);
  } catch (e: any) {
    next(e);
  }
};

export const updateRoom = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const roomId = Number(req.params.id);
  const data = req.body;
  try {
    const updated = await RoomService.updateRoom(roomId, data);
    res.status(200).json(updated);
  } catch (e: any) {
    next(e);
  }
};

export const deleteRoom = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const roomId = Number(req.params.id);
  try {
    await RoomService.deleteRoom(roomId);
    res.status(204).send();
  } catch (e: any) {
    next(e);
  }
};

export const joinRoom = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { userId, x = 0, y = 0, team = null } = req.body;
  const roomId = Number(req.params.id);

  try {
    const entry = await RoomService.joinRoom(userId, roomId, x, y, team);

    res.status(201).json(entry);
  } catch (e: any) {
    next(e);
  }
};

export const leaveRoom = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { userId } = req.body;
  const roomId = Number(req.params.id);

  try {
    await RoomService.leaveRoom(userId, roomId);

    res.status(200).send();
  } catch (e: any) {
    next(e);
  }
};

export const getUsersInRoom = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const roomId = Number(req.params.id);

  try {
    const users = await RoomService.getUsersInRoom(roomId);

    res.status(200).json(users);
  } catch (e: any) {
    next(e);
  }
};

export const updateUserInRoom = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { userId } = req.body;
  const roomId = Number(req.params.id);
  const data = req.body;

  try {
    const updated = await RoomService.updateUserInRoom(userId, roomId, data);

    res.status(200).json(updated);
  } catch (e: any) {
    next(e);
  }
};

export const getRoomMap = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const rooms = await RoomService.getRoomMap();

    res.status(200).json(rooms);
  } catch (e: any) {
    next(e);
  }
};

export const getRoomDoors = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const roomId = Number(req.params.id);
    const doors = await RoomService.getRoomDoors(roomId);

    if (!doors) {
      res.status(400).json({ message: "No doors available for given room" });
      return;
    }
    res.status(200).json(doors);
  } catch (e: any) {
    next(e);
  }
};

export const createRoomDoor = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { fromRoomId, toRoomId, x, y } = req.body;
    const door = await RoomService.createRoomDoor(fromRoomId, toRoomId, x, y);

    res.status(200).json(door);
  } catch (e: any) {
    next(e);
  }
};

export const deleteRoomDoor = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const doorId = Number(req.params.doorId);
    await RoomService.deleteRoomDoor(doorId);
    res.status(200).json({ message: "Door deleted" });
  } catch (e: any) {
    next(e);
  }
};
