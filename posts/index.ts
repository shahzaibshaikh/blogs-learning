import express, { Request, Response } from "express";
import { v4 as uuidv4 } from "uuid";
import cors from "cors";

const app = express();
app.use(express.json());

app.use(cors());
interface Post {
  [key: string]: {
    id: string;
    title: string;
  };
}

const posts: Post = {};

app.get("/posts", (req: Request, res: Response) => {
  res.send(posts);
});

app.post("/posts", (req: Request, res: Response) => {
  const id = uuidv4();
  const title = req.body.title;

  posts[id] = {
    id,
    title
  };

  res.status(201).send(posts[id]);
});

app.listen(4000, () => {
  console.log("Listening on 4000");
});
