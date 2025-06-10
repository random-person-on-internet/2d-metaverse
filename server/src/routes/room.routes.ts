import { Router } from "express";
import { verifyToken } from "../middleware/auth.middleware";
import {
  createRoom,
  deleteRoom,
  getAllRooms,
  getRoomById,
  updateRoom,
} from "../controllers/room.controller";

const router = Router();
router.use(verifyToken);

router.post("/", createRoom);
router.get("/", getAllRooms);
router.get("/:id", getRoomById);
router.patch("/:id", updateRoom);
router.delete("/:id", deleteRoom);

export default router;
