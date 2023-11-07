import express, { Request, Response } from "express";
import axios from "axios";

const app = express();
app.use(express.json());

app.post("/events", (req: Request, res: Response) => {});

app.listen(4003, () => {
  console.log("Listening on 4003");
});
