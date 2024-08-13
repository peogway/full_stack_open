const { describe, test, after, beforeEach } = require("node:test");
const Blog = require("../models/blog");
const User = require("../models/user");
const mongoose = require("mongoose");
const helper = require("./test_helper");
const supertest = require("supertest");
const app = require("../app");
const assert = require("node:assert");
const bcrypt = require("bcrypt");

const api = supertest(app);

describe("testing blogs", () => {
  beforeEach(async () => {
    await User.deleteMany({});

    const passwordHash = await bcrypt.hash("peogway", 10);
    const user = new User({ username: "peogway", passwordHash });

    await user.save();
    const userId = user.id;
    await Blog.deleteMany({});

    const blogObjects = helper.initialBlogs
      .map((blog) => new Blog({ ...blog, user: userId }));

    const promiseArray = blogObjects.map((blog) => blog.save());
    await Promise.all(promiseArray);
  });

  test("all blogs are returned as json", async () => {
    const response = await api
      .get("/api/blogs")
      .expect(200)
      .expect("Content-Type", /application\/json/);

    assert.strictEqual(response.body.length, helper.initialBlogs.length);
  });

  test("unique identifier property of the blog posts is named id", async () => {
    const response = await api
      .get("/api/blogs");

    assert.strictEqual("id" in response.body[0], true);
  });

  test("a new blog post can be created", async () => {
    const newBlog = {
      title: "Test blog",
      author: "Peogway",
      url: "http://blog.peogway.oncoder.com/peogway/test",
      likes: 2310,
    };

    const res = await api
      .post("/login")
      .send({ username: "peogway", password: "peogway" });

    await api
      .post("/api/blogs")
      .send(newBlog)
      .set("Authorization", `Bearer ${res._body.token}`)
      .expect(201)
      .expect("Content-Type", /application\/json/);

    const blogsAtEnd = await helper.blogsInDb();
    assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length + 1);

    const titles = blogsAtEnd.map((blog) => blog.title);
    assert(titles.includes(newBlog.title));
  });

  test("likes will default to 0 if missing", async () => {
    const newBlog = {
      title: "Test blog",
      author: "Peogway",
      url: "http://blog.peogway.oncoder.com/peogway/test",
    };

    const res = await api
      .post("/login")
      .send({ username: "peogway", password: "peogway" });

    await api
      .post("/api/blogs")
      .send(newBlog)
      .set("Authorization", `Bearer ${res._body.token}`)
      .expect(201)
      .expect("Content-Type", /application\/json/);

    const blogsAtEnd = await helper.blogsInDb();

    assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length + 1);

    const likesOfCreatedBlog = blogsAtEnd[blogsAtEnd.length - 1].likes;

    const titles = blogsAtEnd.map((blog) => blog.title);
    assert(titles.includes(newBlog.title));

    assert.strictEqual(likesOfCreatedBlog, 0);
  });

  describe("create new blog missing", () => {
    test("title returns status code 400 Bad Request", async () => {
      const newBlog = {
        author: "Peogway",
        url: "http://blog.peogway.oncoder.com/peogway/test",
        likes: 2310,
      };

      await api
        .post("/api/blogs")
        .send(newBlog)
        .expect(400);

      const blogsAtEnd = await helper.blogsInDb();
      assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length);
    });

    test("url returns status code 400 Bad Request", async () => {
      const newBlog = {
        title: "Test blog",
        author: "Peogway",
        likes: 2310,
      };

      await api
        .post("/api/blogs")
        .send(newBlog)
        .expect(400);

      const blogsAtEnd = await helper.blogsInDb();
      assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length);
    });

    test("both title and url returns status code 400 Bad Request", async () => {
      const newBlog = {
        author: "Peogway",
        likes: 2310,
      };

      await api
        .post("/api/blogs")
        .send(newBlog)
        .expect(400);

      const blogsAtEnd = await helper.blogsInDb();
      assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length);
    });
  });

  test("a blog can be deleted", async () => {
    const blogsAtStart = await helper.blogsInDb();

    const blogToDelete = blogsAtStart[0];

    const res = await api
      .post("/login")
      .send({ username: "peogway", password: "peogway" });

    const token = res._body.token;

    await api
      .delete(`/api/blogs/${blogToDelete.id}`)
      .set("Authorization", `Bearer ${token}`)
      .expect(204);

    const blogsAtEnd = await helper.blogsInDb();
    const titles = blogsAtEnd.map((blog) => blog.title);

    assert(!titles.includes(blogToDelete.title));
    assert.strictEqual(blogsAtEnd.length, blogsAtStart.length - 1);
  });

  test("a blog can be updated", async () => {
    const blogsAtStart = await helper.blogsInDb();
    const blogToUpdate = blogsAtStart[0];
    const updateBlog = {
      likes: 2403,
    };

    const res = await api
      .post("/login")
      .send({ username: "peogway", password: "peogway" });

    const token = res._body.token;

    await api
      .put(`/api/blogs/${blogToUpdate.id}`)
      .send(updateBlog)
      .set("Authorization", `Bearer ${token}`)
      .expect(204);

    const blogsAtEnd = await helper.blogsInDb();
    assert.strictEqual(blogsAtEnd[0].likes, updateBlog.likes);
  });

  test("adding a blog fails with the proper status code 401 Unauthorized if a token is not provided", async () => {
    const newBlog = {
      title: "Test blog",
      author: "Peogway",
      url: "http://blog.peogway.oncoder.com/peogway/test",
      likes: 2310,
    };

    await api
      .post("/api/blogs")
      .send(newBlog)
      .expect(401);

    const blogsAtEnd = await helper.blogsInDb();
    assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length);

    const titles = blogsAtEnd.map((blog) => blog.title);
    assert(!titles.includes(newBlog.title));
  });
});

describe("testing users", () => {
  beforeEach(async () => {
    await User.deleteMany({});

    const passwordHash = await bcrypt.hash("sekret", 10);
    const user = new User({ username: "root", passwordHash });

    await user.save();
  });

  test("creation succeeds with a fresh username", async () => {
    const usersAtStart = await helper.usersInDb();

    const newUser = {
      username: "mluukkai",
      name: "Matti Luukkainen",
      password: "salainen",
    };

    await api
      .post("/api/users")
      .send(newUser)
      .expect(201)
      .expect("Content-Type", /application\/json/);

    const usersAtEnd = await helper.usersInDb();
    assert.strictEqual(usersAtEnd.length, usersAtStart.length + 1);

    const usernames = usersAtEnd.map((u) => u.username);
    assert(usernames.includes(newUser.username));
  });

  test("creation fails with proper statuscode and message if username already taken", async () => {
    const usersAtStart = await helper.usersInDb();

    const newUser = {
      username: "root",
      name: "Superuser",
      password: "salainen",
    };

    const result = await api
      .post("/api/users")
      .send(newUser)
      .expect(400)
      .expect("Content-Type", /application\/json/);

    const usersAtEnd = await helper.usersInDb();

    assert(result.body.error.includes("expected `username` to be unique"));

    assert.strictEqual(usersAtEnd.length, usersAtStart.length);
  });

  test("creation fails with proper statuscode and message if username has less than 3 characters", async () => {
    const usersAtStart = await helper.usersInDb();

    const newUser = {
      name: "third",
      username: "th",
      password: "third",
    };

    const result = await api
      .post("/api/users")
      .send(newUser)
      .expect(400)
      .expect("Content-Type", /application\/json/);

    const usersAtEnd = await helper.usersInDb();

    assert(
      result.body.error.includes("shorter than the minimum allowed length (3)"),
    );
    assert.strictEqual(usersAtStart.length, usersAtEnd.length);
  });
  test("creation fails with proper statuscode and message if password is missing", async () => {
    const usersAtStart = await helper.usersInDb();

    const newUser = {
      name: "third",
      username: "third",
      password: "",
    };

    const result = await api
      .post("/api/users")
      .send(newUser)
      .expect(400)
      .expect("Content-Type", /application\/json/);

    const usersAtEnd = await helper.usersInDb();

    assert(
      result.body.error.includes("password missing"),
    );
    assert.strictEqual(usersAtStart.length, usersAtEnd.length);
  });
  test("creation fails with proper statuscode and message if password has less than 3 characters", async () => {
    const usersAtStart = await helper.usersInDb();

    const newUser = {
      name: "third",
      username: "third",
      password: "th",
    };

    const result = await api
      .post("/api/users")
      .send(newUser)
      .expect(400)
      .expect("Content-Type", /application\/json/);

    const usersAtEnd = await helper.usersInDb();

    assert(
      result.body.error.includes("password must be at least 3 characters long"),
    );
    assert.strictEqual(usersAtStart.length, usersAtEnd.length);
  });
});

after(async () => {
  await mongoose.connection.close();
});
