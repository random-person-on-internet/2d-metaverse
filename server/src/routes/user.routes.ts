import { Router } from "express";
import { verifyToken } from "../middleware/auth.middleware";
import { ensureSelf } from "../middleware/ensureSelf.middleware";
import {
  addItemToUser,
  changeAvatar,
  changeCoins,
  changePassword,
  changeUsername,
  deleteUser,
  deleteUserItem,
  updateUserItem,
  getUserData,
  getMe,
} from "../controllers/user.controller";

const router = Router();
router.use(verifyToken);

router.get("/me", ensureSelf, getMe);
router.get("/:id", ensureSelf, getUserData);
router.patch("/:id/password", ensureSelf, changePassword);
router.patch("/:id/username", ensureSelf, changeUsername);
router.patch("/:id/avatar", ensureSelf, changeAvatar);
router.patch("/:id/coins", ensureSelf, changeCoins);

router.post("/:id/items", ensureSelf, addItemToUser);
router.patch("/:id/items/:itemId", ensureSelf, updateUserItem);
router.delete("/:id/items/:itemId", ensureSelf, deleteUserItem);

router.delete("/:id", ensureSelf, deleteUser);

export default router;
