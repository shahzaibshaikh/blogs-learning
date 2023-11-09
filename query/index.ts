import express, { Request, Response } from "express";
import cors from "cors";

const app = express();
app.use(express.json());

app.use(cors());

interface Posts {
  [postId: string]: {
    id: string;
    title: string;
    comments: Comment[];
  };
}

interface Comment {
  id: string;
  content: string;
  status: string;
}

const posts: Posts = {};

const handleEvent = (type, data) => {
  if (type === "PostCreated") {
    const { id, title } = data;
    posts[id] = { id, title, comments: [] };
  }

  if (type === "CommentCreated") {
    const { id, content, postId, status } = data;
    if (posts[postId]) {
      if (!posts[postId].comments) {
        posts[postId].comments = []; // Initialize the comments array if it doesn't exist
      }
      posts[postId].comments.push({ id, content, status });
    }
  }

  if (type === "CommentUpdated") {
    const { id, status, postId, content } = data;
    const post = posts[postId];
    const comment = post.comments.find(comment => {
      return comment.id === id;
    });
    if (comment) {
      comment.status = status;
      comment.content = content;
    }
  }
};

app.get("/posts", (req: Request, res: Response) => {
  res.send(posts);
});

app.post("/events", (req: Request, res: Response) => {
  const { type, data } = req.body;

  handleEvent(type, data);

  res.send({});
});

app.listen(4002, () => {
  console.log("Listening on 4002");
});
