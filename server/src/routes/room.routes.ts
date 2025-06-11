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
} from "../controllers/room.controller";

const router = Router();
router.use(verifyToken);

router.post("/", createRoom);
router.get("/", getAllRooms);
router.get("/:id", getRoomById);
router.patch("/:id", updateRoom);
router.delete("/:id", deleteRoom);
router.post("/:id/join", joinRoom);
router.delete("/:id/leave", leaveRoom);
router.get("/:id/users", getUsersInRoom);
router.patch("/:id/user", updateUserInRoom);

export default router;
