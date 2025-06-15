// client -> server
export const SocketEmitEvents = {
  ROOM_JOIN: "room:join",
  ROOM_LEAVE: "room:leave",
  PLAYER_JOIN: "player:join",
  PLAYER_MOVE: "player:move",
  PLAYER_ACTION: "player:action",
} as const;

export type SocketEmitEvent =
  (typeof SocketEmitEvents)[keyof typeof SocketEmitEvents];

// server -> client
export const SocketListenEvents = {
  ROOM_JOINED: "room:joined",
  ROOM_LEFT: "room:left",
  PLAYER_ALL: "player:all",
  PLAYER_JOINED: "player:joined",
  PLAYER_MOVED: "player:moved",
  PLAYER_ACTED: "player:acted",
} as const;

export type SocketListenEvents =
  (typeof SocketListenEvents)[keyof typeof SocketListenEvents];
