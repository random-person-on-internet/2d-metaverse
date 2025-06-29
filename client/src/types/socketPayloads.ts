// client -> server
export interface RoomPayload {
  roomId: string;
  userId: number;
}

export interface MovePayload {
  x: number;
  y: number;
  direction: string;
  userId: number;
}

// server -> client
export interface RoomJoinedPayload {
  userId: number;
  socketId: string;
}

export interface RoomLeftPayload {
  userId: number;
  socketId: string;
}

export interface PlayerData {
  socketId: string;
  userId: number;
  x: number;
  y: number;
}

export interface PlayerMovedPayload extends MovePayload {
  socketId: string;
}

export interface PlayerActedPayload {
  action: string;
  socketId: string;
}

export interface PlayerLeftPayload {
  userId: number;
  socketId: string;
}
