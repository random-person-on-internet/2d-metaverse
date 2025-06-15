// core room types
export interface Room {
  id: number;
  name: string;
  description?: string;
  x: number;
  y: number;
  xlen: number;
  ylen: number;
  isPublic: boolean;
  createdAt: string;
}

export interface CreateRoomDto {
  name: string;
  description?: string;
  x: number;
  y: number;
  xlen: number;
  ylen: number;
  isPublic?: boolean;
}

export type UpdateRoomDto = Partial<CreateRoomDto>;

// UserInRoom

export interface UserInRoom {
  id: number;
  userId: number;
  roomId: number;
  x: number;
  y: number;
  team?: string;
  isMuted: boolean;
  joinedAt: string;

  // relation
  user?: {
    id: number;
    username: string;
    avatar?: string;
  };
}

export interface JoinRoomDto {
  userId: number;
  x?: number;
  y?: number;
  team?: string | null;
}

export interface LeaveRoomDto {
  userId: number;
}

export interface UpdateUserInRoomDto {
  userId: number;
  x?: number;
  y?: number;
  team?: string | null;
  isMuted?: boolean;
}
