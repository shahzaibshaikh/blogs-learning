import express, { Request, Response } from "express";
import cors from "cors";

const app = express();
app.use(express.json());

app.use(cors());

app.get("/posts", (req: Request, res: Response) => {});

app.post("/posts", (req: Request, res: Response) => {
  const { type, data } = req.body;
});

app.listen(4002, () => {
  console.log("Listening on 4002");
});
