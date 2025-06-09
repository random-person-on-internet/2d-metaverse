import express, { Request, Response } from "express";
import cors from "cors";
import authRoutes from "./routes/auth.routes";
import itemRoutes from "./routes/item.routes";
import userRoutes from "./routes/user.routes";

const app = express();

app.use(cors());
app.use(express.json());
app.use("/api/auth", authRoutes);
app.use("/api/items", itemRoutes);
app.use("/api/user", userRoutes);

app.get("/", (_: Request, res: Response) => {
  res.send("API Running");
});

export default app;
