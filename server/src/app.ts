import express, { Request, Response } from "express";
import cors from "cors";
import authRoutes from "./routes/auth.routes";

const app = express();

app.use(cors());
app.use(express.json());
app.use("/api/auth", authRoutes);

app.get("/", (_: Request, res: Response) => {
  res.send("API Running");
});

export default app;
