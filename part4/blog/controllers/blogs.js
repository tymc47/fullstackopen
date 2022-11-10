const blogsRouter = require("express").Router();
const Blog = require("../model/blog");
const Comment = require("../model/comment");

blogsRouter.get("/", async (request, response) => {
  const blogs = await Blog.find({})
    .populate("user", { username: 1, name: 1 })
    .populate("comments", { content: 1 });

  response.json(blogs);
});

blogsRouter.post("/", async (request, response) => {
  const body = request.body;

  const user = request.user;

  if (!user) return response.status(401).json({ error: "Unauthorized" });

  if (!body.title || !body.url) return response.status(400).end();

  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes === undefined ? 0 : body.likes,
    user: user._id,
  });

  const results = await blog.save();

  user.blogs = user.blogs.concat(results._id);
  await user.save();

  response.status(201).json(results);
});

blogsRouter.delete("/:id", async (request, response) => {
  const blogToDelete = await Blog.findById(request.params.id);

  const user = request.user;

  if (blogToDelete.user.toString() !== user._id.toString()) {
    return response.status(401).json({ error: "token invalid" });
  }

  await Blog.findByIdAndDelete(request.params.id);

  response.status(204).end();
});

blogsRouter.put("/:id", async (request, response) => {
  const body = request.body;
  const id = request.params.id;

  const blog = {
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes,
    user: body.user,
  };

  const result = await Blog.findByIdAndUpdate(id, blog, {
    new: true,
    context: "query",
  });

  response.json(result);
});

blogsRouter.get("/:id/comments", async (request, response) => {
  const id = request.params.id;

  const result = await Comment.find({ blog: id });

  response.json(result);
});

blogsRouter.post("/:id/comments", async (request, response) => {
  const blogId = request.params.id;
  const newCm = new Comment({
    content: request.body.content,
    blog: blogId,
  });

  const result = await newCm.save();

  const blog = await Blog.findById(blogId);
  blog.comments = blog.comments.concat(result.id);
  await blog.save();

  response.status(201).json(result);
});

module.exports = blogsRouter;
