import express from "express";
import cors from "cors";
import helmet from "helmet";

const app = express();
const allowedOrigin = process.env.ALLOWED_ORIGIN || "http://localhost:3000";
app.use(helmet());
app.use(
  cors({
    origin: allowedOrigin,
  })
);
app.use(express.json());

interface IPost {
  id: number;
  title: string;
  content: string;
}

const posts: IPost[] = [
  {
    id: 1,
    title: "Build a REST API with Express and TypeScript",
    content:
      "TypeScript provides type safety, and contributes to making your code more reliable.",
  },
  {
    id: 2,
    title: "Testing your REST API with Jest and supertest",
    content:
      "Today we're going to cover how you can request your REST endpoints with supertest.",
  },
];

let nextId = 3;

app.get("/api/posts", (req, res) => {
  res.send(posts);
});

app.get("/api/posts/:id", (req, res) => {
  const postId = Number(req.params.id);
  if (Number.isNaN(postId)) {
    return res.status(400).send({
      error: "Post id is not a number",
    });
  }
  const post = posts.find((p) => p.id === postId);
  if (!post) {
    return res.status(404).send({
      error: "Post not found",
    });
  }
  res.send(post);
});

app.post("/api/posts", (req, res) => {
  const { title, content } = req.body;

  // Poor developer's input validation
  if (!title || !content) {
    return res.status(400).send({
      error: "Missing required field(s)",
    });
  }

  const id = nextId;
  nextId += 1;
  const newPost = { id, title, content };
  posts.push(newPost);
  return res.status(201).send(newPost);
});

export default app;
