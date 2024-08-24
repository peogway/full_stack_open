const { test, expect, describe, beforeEach } = require("@playwright/test");
const { loginWith, createBlog } = require("./helper");

describe("Blog app", () => {
  beforeEach(async ({ page, request }) => {
    await request.post("/api/testing/reset");
    await request.post("/api/users", {
      data: {
        name: "peogway",
        username: "peogway",
        password: "peogway",
      },
    });

    await request.post("/api/users", {
      data: {
        name: "another",
        username: "another",
        password: "another",
      },
    });

    await page.goto("/");
  });

  test("front page can be opened", async ({ page }) => {
    const locator = page.getByText("Blog App");
    await expect(locator).toBeVisible();
  });
  test("Login form is shown", async ({ page }) => {
    await expect(page.getByRole("heading", { name: "Login" })).toBeVisible();
    await expect(page.getByText("username")).toBeVisible();
    await expect(page.getByText("password")).toBeVisible();
  });

  describe("Login", () => {
    test("fails with wrong credentials", async ({ page }) => {
      await loginWith(page, "peogway", "wrong");

      const errorDiv = page.locator(".error");
      await expect(errorDiv).toContainText("Wrong Credentials");
      await expect(errorDiv).toHaveCSS("border-style", "solid");
      await expect(errorDiv).toHaveCSS("color", "rgb(255, 0, 0)");
      await expect(page.getByText("peogway logged in")).not.toBeVisible();
    });

    test("succeeds with correct credentials", async ({ page }) => {
      await loginWith(page, "peogway", "peogway");
      await expect(page.getByText("peogway logged in")).toBeVisible();
    });
  });

  describe("When logged in", () => {
    beforeEach(async ({ page }) => {
      await loginWith(page, "peogway", "peogway");
    });

    test("a new blog can be created", async ({ page }) => {
      await page.getByRole("button", { name: "Create new blog" }).click();

      await expect(page.getByRole("heading", { name: "create new blog" }))
        .toBeVisible();

      const title = "This is my test";
      const author = "testor";
      await createBlog(
        page,
        title,
        author,
        "https://peogway.com/url",
      );

      const blogList = page.locator(".blog-list");
      await expect(blogList.getByText(`${title} ${author}`)).toBeVisible();
      await expect(page.getByRole("button", { name: "Create new blog" }))
        .toBeVisible();
    });

    describe("the user", () => {
      const title = "This is my test";
      const author = "testor";

      beforeEach(async ({ page, request }) => {
        await request.post("/api/testing/reset-blog");

        await page.getByRole("button", { name: "Create new blog" }).click();

        await createBlog(
          page,
          title,
          author,
          "https://peogway.com/url",
        );
      });

      test("can like blogs", async ({ page }) => {
        const blog = page.locator("div").filter({ hasText: title });
        await blog.locator(".visibility-btn").click();

        await blog.locator(".like-btn").click();
        await expect(blog.getByText("likes 1")).toBeVisible();
      });

      test("who added the blog can delete the blog", async ({ page }) => {
        const blogElement = page.locator("div").filter({ hasText: title });
        await blogElement.getByRole(
          "button",
          { name: "view" },
        ).click();

        page.on("dialog", (dialog) => dialog.accept());
        await blogElement.getByRole(
          "button",
          { name: "remove" },
        ).click();

        const blogList = page.locator(".blog-list");
        await expect(blogList.getByText(`${title} ${author}`)).not
          .toBeVisible();
      });
    });
  });

  test("blogs are arranged in the order according to the likes", async ({ page }) => {
    await loginWith(page, "peogway", "peogway");

    await page.getByRole("button", { name: "Create new blog" }).click();

    const title1 = "This is my test";
    const author1 = "testor";
    await createBlog(
      page,
      title1,
      author1,
      "https://peogway.com/url",
    );

    await page.getByRole("button", { name: "Create new blog" }).click();
    const title2 = "another test";
    const author2 = "another";
    await createBlog(
      page,
      title2,
      author2,
      "https://peogway.com/another",
    );

    await page.getByRole("button", { name: "Create new blog" }).click();
    const title3 = "Blog 3";
    const author3 = "Author 3";
    await createBlog(page, title3, author3, "https://example.com/3");

    const blog1 = page.locator(".blog-list > div").filter({
      hasText: `${title1} ${author1}`,
    });
    const blog2 = page.locator(".blog-list > div").filter({
      hasText: `${title2} ${author2}`,
    });
    const blog3 = page.locator(".blog-list > div").filter({
      hasText: `${title3} ${author3}`,
    });

    await blog1.locator(".visibility-btn").click();
    await blog1.locator(".like-btn").click();

    await blog2.locator(".visibility-btn").click();
    await blog2.locator(".like-btn").click();
    await blog2.locator(".like-btn").click();

    await blog3.locator(".visibility-btn").click();
    await blog3.locator(".like-btn").click();

    const blogs = page.locator(".blog-list > div");

    const likesArray = await blogs.evaluateAll((blogElements) =>
      blogElements.map((blog) => {
        const detail = blog.querySelector(".detail");
        if (detail) {
          const likesText = detail.innerText.match(/likes (\d+)/);
          return likesText ? parseInt(likesText[1]) : 0;
        }

        return null;
      }).filter((likes) => likes !== null)
    );

    for (let i = 0; i < likesArray.length - 1; i++) {
      expect(likesArray[i]).toBeGreaterThanOrEqual(likesArray[i + 1]);
    }
  });

  test("only the user who added the blog sees the blog's delete button", async ({ page }) => {
    await loginWith(page, "peogway", "peogway");

    await page.getByRole("button", { name: "Create new blog" }).click();

    await expect(page.getByRole("heading", { name: "create new blog" }))
      .toBeVisible();

    const title = "This is my test";
    const author = "testor";
    await createBlog(
      page,
      title,
      author,
      "https://peogway.com/url",
    );

    await page.getByRole("button", { name: "logout" }).click();

    await loginWith(page, "another", "another");

    const blogList = page.locator(".blog-list");
    await expect(blogList.getByText(`${title} ${author}`)).toBeVisible();

    await blogList.getByRole("button", { name: "view" }).click();
    expect(blogList.getByRole("button", { name: "remove" })).not.toBeVisible();
  });
});
