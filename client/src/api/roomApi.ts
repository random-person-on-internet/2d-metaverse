import { api } from "../lib/api";
import type {
  CreateRoomDto,
  JoinRoomDto,
  LeaveRoomDto,
  Room,
  UpdateRoomDto,
  UserInRoom,
  UpdateUserInRoomDto,
} from "../types/roomApi.types";

export const createRoom = (data: CreateRoomDto, token: string) =>
  api.post<Room>("/room", data, token);

export const getAllRooms = (token: string) => api.get<Room[]>("/room", token);

export const getRoomById = (id: number, token: string) =>
  api.get<Room>(`/room/${id}`, token);

export const updateRoom = (id: number, token: string, data: UpdateRoomDto) =>
  api.patch<Room>(`/room/${id}`, data, token);

export const deleteRoom = (id: number, token: string) =>
  api.delete(`/room/${id}`, token);

export const joinRoom = (id: number, token: string, data: JoinRoomDto) =>
  api.post(`/room/${id}/join`, data, token);

export const leaveRoom = (id: number, token: string, data: LeaveRoomDto) =>
  api.post(`/room/${id}/leave`, data, token);

export const getUsersInRoom = (id: number, token: string) =>
  api.get<UserInRoom[]>(`/room/${id}/users`, token);

export const updateUserInRoom = (
  id: number,
  data: UpdateUserInRoomDto,
  token: string
) => api.patch(`/room/${id}/user`, data, token);
