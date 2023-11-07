import express, { Request, Response } from "express";
import { v4 as uuidv4 } from "uuid";
import cors from "cors";
import axios from "axios";

const app = express();
app.use(express.json());
app.use(cors());

interface CommentsPost {
  [postId: string]: Comment[];
}

interface Comment {
  id: string;
  content: string;
  status: string;
}

const commentsByPostId: CommentsPost = {};

app.get("/posts/:id/comments", (req: Request, res: Response) => {
  res.send(commentsByPostId[req.params.id] || []);
});

app.post("/posts/:id/comments", async (req: Request, res: Response) => {
  const commentId = uuidv4();
  const { content } = req.body;
  const comments = commentsByPostId[req.params.id] || [];
  comments.push({ id: commentId, content, status: "pending" });
  commentsByPostId[req.params.id] = comments;

  await axios.post("http://localhost:4005/events", {
    type: "CommentCreated",
    data: {
      id: commentId,
      content,
      postId: req.params.id,
      status: "pending"
    }
  });

  res.status(201).send(comments);
});

app.post("/events", (req: Request, res: Response) => {
  console.log("Received Event", req.body.type);

  const { type, data } = req.body;
  if (type === "CommentModerated") {
    const { postId, status, id } = data;

    const comments = commentsByPostId[postId];

    const comment = comments.find(comment => {
      return comment.id === id;
    });
    if (comment) {
      comment.status = status;
    }
  }

  res.send({});
});

app.listen(4001, () => {
  console.log("Listening on 4001");
});
