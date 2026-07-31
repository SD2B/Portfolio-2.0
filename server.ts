import express from "express";
import path from "path";
import fs from "fs";
import { createServer as createViteServer } from "vite";

const DATA_DIR = path.join(process.cwd(), "data");
const BLOGS_FILE = path.join(DATA_DIR, "blogs.json");

const defaultBlogs: any[] = [];

function readBlogsFromFile() {
  try {
    if (!fs.existsSync(DATA_DIR)) {
      fs.mkdirSync(DATA_DIR, { recursive: true });
    }
    if (!fs.existsSync(BLOGS_FILE)) {
      fs.writeFileSync(BLOGS_FILE, JSON.stringify(defaultBlogs, null, 2), "utf-8");
      return defaultBlogs;
    }
    const data = fs.readFileSync(BLOGS_FILE, "utf-8");
    return JSON.parse(data);
  } catch (err) {
    console.error("Error reading blogs file:", err);
    return defaultBlogs;
  }
}

function writeBlogsToFile(blogs: any[]) {
  try {
    if (!fs.existsSync(DATA_DIR)) {
      fs.mkdirSync(DATA_DIR, { recursive: true });
    }
    fs.writeFileSync(BLOGS_FILE, JSON.stringify(blogs, null, 2), "utf-8");
  } catch (err) {
    console.error("Error writing blogs file:", err);
  }
}

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // API Routes
  app.get("/api/blogs", (req, res) => {
    const blogs = readBlogsFromFile();
    res.json(blogs);
  });

  app.post("/api/blogs", (req, res) => {
    const newBlog = req.body;
    if (!newBlog || !newBlog.title || !newBlog.url) {
      return res.status(400).json({ error: "Title and URL are required" });
    }
    const blogs = readBlogsFromFile();
    const blogToAdd = {
      ...newBlog,
      id: newBlog.id || `blog-${Date.now()}`
    };
    blogs.push(blogToAdd);
    writeBlogsToFile(blogs);
    res.json(blogs);
  });

  app.put("/api/blogs/reorder", (req, res) => {
    const { blogs } = req.body;
    if (!Array.isArray(blogs)) {
      return res.status(400).json({ error: "Blogs array required" });
    }
    writeBlogsToFile(blogs);
    res.json(blogs);
  });

  app.put("/api/blogs/:id", (req, res) => {
    const { id } = req.params;
    const updatedData = req.body;
    const blogs = readBlogsFromFile();
    const index = blogs.findIndex((b: any) => b.id === id);
    if (index === -1) {
      return res.status(404).json({ error: "Blog not found" });
    }
    blogs[index] = { ...blogs[index], ...updatedData, id };
    writeBlogsToFile(blogs);
    res.json(blogs);
  });

  app.delete("/api/blogs/:id", (req, res) => {
    const { id } = req.params;
    let blogs = readBlogsFromFile();
    blogs = blogs.filter((b: any) => b.id !== id);
    writeBlogsToFile(blogs);
    res.json(blogs);
  });

  // Vite middleware for dev or production static serving
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
