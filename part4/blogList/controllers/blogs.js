const blogsRouter = require("express").Router();
const Blog = require("../models/blog");
const User = require("../models/user");

blogsRouter.get("/", async (request, response) => {
  const blogs = await Blog
    .find({})
    .populate("user", { id: 1, name: 1, username: 1 });
  response.json(blogs);
});

blogsRouter.post("/", async (request, response) => {
  const body = request.body;

  if (!("title" in body) || !("url" in body)) {
    response.status(400).end();
    return;
  }

  if (!("likes" in body)) body.likes = 0;

  const userRequest = request.user;
  if (!userRequest) {
    return response.status(401).json({ error: "token invalid" });
  }

  const user = await User.findById(userRequest.id);

  const blog = new Blog(
    {
      ...body,
      user: user.id,
    },
  );

  const savedBlog = await blog.save();
  user.blogs = user.blogs.concat(savedBlog.id);
  await user.save();

  const populatedBlog = await Blog.findById(savedBlog.id).populate("user", {
    id: 1,
    name: 1,
    username: 1,
  });

  response.status(201).json(populatedBlog);
});

blogsRouter.get("/:id", async (request, response) => {
  const blog = await Blog
    .findById(request.params.id)
    .populate("user", { id: 1, name: 1, username: 1 });
  response.json(blog);
});

blogsRouter.delete("/:id", async (request, response) => {
  const user = request.user;
  if (!user) {
    return response.status(401).json({ error: "token invalid" });
  }

  const blog = await Blog.findById(request.params.id);
  if (!(blog.user.toString() === user.id.toString())) {
    return response.status(403).json({ error: "Only creator can delete blog" });
  }

  const deletedBlog = await Blog.findByIdAndDelete(request.params.id);
  response.status(204).end();
  // response.json(deletedBlog).status(204).end();
});

blogsRouter.put("/:id", async (request, response) => {
  const userRequest = request.user;
  if (!userRequest) {
    return response.status(401).json({ error: "token invalid" });
  }

  const body = request.body;
  const blog = {
    likes: body.likes,
  };

  const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, blog, {
    new: true,
  });
  response.status(204).end();
  // response.json(updatedBlog).status(204).end();
});

module.exports = blogsRouter;
