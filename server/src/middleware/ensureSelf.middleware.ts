import { NextFunction, Request, Response } from "express";

export const ensureSelf = (req: Request, res: Response, next: NextFunction) => {
  const userIdFromToken = req.user?.userId;
  const userIdFromParams = Number(req.params.id);

  if (!userIdFromToken || userIdFromParams !== userIdFromToken) {
    res
      .status(403)
      .json({ message: "Access denied, can only be accessed by self" });
    return;
  }

  next();
};
