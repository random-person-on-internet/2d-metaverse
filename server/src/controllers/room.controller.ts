import { Request, Response } from "express";
import prisma from "../db/prisma";
import * as RoomService from "../services/room.service";

export const createRoom = async (req: Request, res: Response) => {
  try {
    const room = await RoomService.createRoom({ data: req.body });
    res.status(201).json(room);
  } catch (e) {
    res.status(400).json({ error: "Failed to create room", details: e });
  }
};

export const getAllRooms = async (req: Request, res: Response) => {
  try {
    const roomData = await RoomService.getAllRooms();
    res.status(200).json(roomData);
    return;
  } catch (e) {
    res.status(400).json({ error: "Failed to get all rooms", details: e });
  }
};

export const getRoomById = async (req: Request, res: Response) => {
  const roomId = Number(req.params.id);
  try {
    const roomData = await RoomService.getRoomById(roomId);
    res.status(200).json(roomData);
  } catch (e) {
    res
      .status(400)
      .json({ error: `Failed to get room with ID ${roomId}`, details: e });
  }
};

export const updateRoom = async (req: Request, res: Response) => {
  const roomId = Number(req.params.id);
  const data = req.body;
  try {
    const updated = await RoomService.updateRoom(roomId, data);
    res.status(200).json(updated);
  } catch (e) {
    res
      .status(400)
      .json({ error: `Failed to update room with ID ${roomId}`, details: e });
  }
};

export const deleteRoom = async (req: Request, res: Response) => {
  const roomId = Number(req.params.id);
  try {
    await RoomService.deleteRoom(roomId);
    res.status(204).send();
  } catch (e) {
    res
      .status(400)
      .json({ error: `Failed to room with ID ${roomId}`, details: e });
  }
};

export const joinRoom = async (req: Request, res: Response) => {
  const { userId, x = 0, y = 0, team = null } = req.body;
  const roomId = Number(req.params.id);

  try {
    const entry = await RoomService.joinRoom(userId, roomId, x, y, team);

    res.status(201).json(entry);
  } catch (e) {
    res.status(400).json({ error: "Failed to join room", details: e });
  }
};

export const leaveRoom = async (req: Request, res: Response) => {
  const { userId } = req.body;
  const roomId = Number(req.params.id);

  try {
    await RoomService.leaveRoom(userId, roomId);

    res.status(200).send();
  } catch (e) {
    res.status(400).json({ error: "Failed to leave room", details: e });
  }
};

export const getUsersInRoom = async (req: Request, res: Response) => {
  const roomId = Number(req.params.id);

  try {
    const users = await RoomService.getUsersInRoom(roomId);

    res.status(200).json(users);
  } catch (e) {
    res.status(400).json({ error: "Failed to get users", details: e });
  }
};

export const updateUserInRoom = async (req: Request, res: Response) => {
  const { userId } = req.body;
  const roomId = Number(req.params.id);
  const data = req.body;

  try {
    const updated = await RoomService.updateUserInRoom(userId, roomId, data);

    res.status(200).json(updated);
  } catch (e) {
    res.status(400).json({ error: "Failed to update user state", details: e });
  }
};
