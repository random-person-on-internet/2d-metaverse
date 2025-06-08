import { Router } from "express";
import {
  createItem,
  deleteItem,
  getAllItems,
  getItemById,
  updateItem,
} from "../controllers/item.controller";
import { verifyToken } from "../middleware/auth.middleware";
import { isAdmin } from "../middleware/adminVerification.middleware";

const router = Router();
router.use(verifyToken);

router.post("/", isAdmin, createItem);
router.get("/", getAllItems);
router.get("/:id", getItemById);
router.patch("/:id", isAdmin, updateItem);
router.delete("/:id", isAdmin, deleteItem);

export default router;
