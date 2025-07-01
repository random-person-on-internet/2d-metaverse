import express, { ErrorRequestHandler, Request, Response } from "express";
import cors from "cors";
import authRoutes from "./routes/auth.routes";
import itemRoutes from "./routes/item.routes";
import userRoutes from "./routes/user.routes";
import roomRoutes from "./routes/room.routes";
import { errorHandler } from "./middleware/error.middleware";

const app = express();

app.use(cors());
app.use(express.json());
app.use("/api/auth", authRoutes);
app.use("/api/items", itemRoutes);
app.use("/api/user", userRoutes);
app.use("/api/room", roomRoutes);

// error middleware
app.use(errorHandler as ErrorRequestHandler);

app.get("/", (_: Request, res: Response) => {
  res.send("API Running");
});

export default app;
