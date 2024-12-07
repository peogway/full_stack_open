import jsonServer from "json-server";

const server = jsonServer.create();
const router = jsonServer.router("db.json");
const middlewares = jsonServer.defaults();

server.use(middlewares);
server.use(jsonServer.bodyParser);
server.get("/api/blogs/:id/comments", (req, res) => {
  const blogId = req.params.id;
  const db = router.db; // Get the lowdb instance

  // Find the blog by id
  const blog = db.get("blogs").find({ id: blogId }).value();

  if (blog) {
    // Return the comments for the blog
    res.jsonp(blog.comments);
  } else {
    res.status(404).jsonp({ error: "Blog not found" });
  }
});

// Custom route for posting a comment to a blog
server.post("/api/blogs/:id/comments", (req, res) => {
  const blogId = req.params.id;
  const db = router.db; // Get the lowdb instance

  // Find the blog by id
  const blog = db.get("blogs").find({ id: blogId }).value();

  if (blog) {
    // Add the new comment from the request body
    const newComment = req.body.comment;

    if (!newComment) {
      return res.status(400).jsonp({ error: "Comment content missing" });
    }

    // Push the new comment into the blog's comments array
    blog.comments.push(newComment);

    // Save the updated blog back to the database
    db.get("blogs").find({ id: blogId }).assign(blog).write();

    res.status(201).jsonp(newComment); // Return the updated comments
  } else {
    res.status(404).jsonp({ error: "Blog not found" });
  }
});
server.use("/api", router);

server.listen(3001, () => {
  console.log("JSON Server is running");
});
