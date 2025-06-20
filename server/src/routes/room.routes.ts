import { Router } from "express";
import { verifyToken } from "../middleware/auth.middleware";
import {
  createRoom,
  deleteRoom,
  getAllRooms,
  getRoomById,
  updateRoom,
  getUsersInRoom,
  joinRoom,
  leaveRoom,
  updateUserInRoom,
  getRoomMap,
  getRoomDoors,
  createRoomDoor,
  deleteRoomDoor,
} from "../controllers/room.controller";

const router = Router();
router.use(verifyToken);

router.post("/", createRoom);
router.get("/", getAllRooms);
router.get("/:id", getRoomById);
router.patch("/:id", updateRoom);
router.delete("/:id", deleteRoom);
router.post("/:id/join", joinRoom);
router.post("/:id/leave", leaveRoom);
router.get("/:id/users", getUsersInRoom);
router.patch("/:id/user", updateUserInRoom);
router.get("/map", getRoomMap);
router.get("/:id/doors", getRoomDoors);
router.post("/:id/doors", createRoomDoor);
router.delete("/doors/:doorId", deleteRoomDoor);

export default router;
