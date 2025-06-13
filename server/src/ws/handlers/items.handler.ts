import { Server, Socket } from "socket.io";
import { PlacedItem, placedItems } from "../cache/items";

interface ItemActionPayload {
  instanceId: number;
  definitionId: number;
  userId: number;
  x?: number;
  y?: number;
  targetUserId?: number;
  price?: number;
}

export const itemSocketHandler = (io: Server, socket: Socket) => {
  socket.on("item:place", (payload: ItemActionPayload) => {
    const { instanceId, definitionId, userId, x, y } = payload;
    if (x == null || y == null) return;

    const placed: PlacedItem = {
      instanceId: instanceId,
      definitionId: definitionId,
      isPlaced: true,
      isDropped: false,
      userId: userId,
      x: x,
      y: y,
    };

    placedItems.set(instanceId, placed);

    io.emit("item:placed", {
      ...placed,
      socketId: socket.id,
    });
  });

  socket.on("item:remove", (payload: ItemActionPayload) => {
    const { instanceId, userId } = payload;

    const item = placedItems.get(instanceId);
    if (!item || item.userId !== userId) return;

    placedItems.delete(instanceId);

    io.emit("item:removed", {
      instanceId: instanceId,
      socketId: socket.id,
    });
  });

  socket.on("item:use", (payload: ItemActionPayload) => {
    const { instanceId, userId } = payload;
    // stimulate effects here later
    io.emit("item:used", {
      instanceId: instanceId,
      userId: userId,
    });
  });

  socket.on("item:drop", (payload: ItemActionPayload) => {
    const { instanceId, definitionId, userId, x, y } = payload;
    if (x == null || y == null) return;

    placedItems.set(instanceId, {
      definitionId: definitionId,
      instanceId: instanceId,
      isPlaced: false,
      isDropped: true,
      userId: userId,
      x: x,
      y: y,
    });

    io.emit("item:dropped", {
      instanceId: instanceId,
      definitionId: definitionId,
      userId: userId,
      x: x,
      y: y,
      socketId: socket.id,
    });
  });

  socket.on("item:pickup", (payload: ItemActionPayload) => {
    const { instanceId, userId } = payload;

    const item = placedItems.get(instanceId);
    if (!item) return;
    if (!item.isDropped) return;

    placedItems.delete(instanceId);

    io.emit("item:pickedup", {
      instanceId: instanceId,
      userId: userId,
      socketId: socket.id,
    });
  });

  socket.on("item:buy", (payload: ItemActionPayload) => {
    const { instanceId, userId, targetUserId, price } = payload;

    // add logic to verify coins and update DB later

    io.emit("item:bought", {
      instanceId: instanceId,
      buyerId: userId,
      sellerId: targetUserId,
    });
  });

  socket.on("item:sell", (payload: ItemActionPayload) => {
    const { instanceId, userId, price } = payload;

    // add logic to mark items as listed on market later

    io.emit("item:listed", {
      instanceId: instanceId,
      sellerId: userId,
      price: price,
    });
  });
};
