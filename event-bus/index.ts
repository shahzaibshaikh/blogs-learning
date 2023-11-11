import express, { Request, Response } from "express";
import cors from "cors";
import axios from "axios";

const app = express();
app.use(express.json());
app.use(cors());

const events: any = [];

app.post("/events", (req: Request, res: Response) => {
  const event = req.body;
  events.push(event);
  axios.post("http://localhost:4000/events", event);
  axios.post("http://localhost:4001/events", event);
  axios.post("http://localhost:4002/events", event);

  res.send({ status: "OK" });
});

app.get("/events", (req: Request, res: Response) => {
  res.send(events);
});

app.listen(4005, () => {
  console.log("Listening on 4005");
});
