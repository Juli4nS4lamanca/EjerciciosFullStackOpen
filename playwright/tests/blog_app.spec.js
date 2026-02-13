const { test, describe, expect, beforeEach } = require("@playwright/test");
const { loginWith, createBlog } = require("./helper");

describe("Blog App", () => {
  beforeEach(async ({ page, request }) => {
    /*     Para que esto funcione en el fronten vite.config debe estar configurado
    el proxy a la url del backend y adicional en playwright.config se define
    la baseUrl del frontend
 */
    await request.post("/api/testing/reset");
    await request.post("/api/users", {
      data: {
        name: "Julian",
        username: "Atem99",
        password: "Secret",
      },
    });
    await request.post("api/users", {
      data: {
        name: "Daniel",
        username: "Atem11",
        password: "54321",
      },
    });

    await page.goto("/");
  });

  describe("Section Test Only", () => {
    // Con test.only se ejecuta unicamente esa prueba y ninguna otra más
    /* test.only("login fail with wrong password", async ({ page }) => {
      await page.getByRole("button", { name: "Log in" }).click();
      await page.getByTestId("username").fill("Atem99");
      await page.getByTestId("password").fill("12345");
      await page.getByRole("button", { name: "Login" }).click();
      // await expect(page.getByText("Credentials Error")).toBeVisible();
      const errorDiv = await page.locator(".error");
      await expect(errorDiv).toContainText("Credentials Error");
      await expect(errorDiv).toHaveCSS("color", "rgb(255, 255, 255)");
      await expect(errorDiv).toHaveCSS(
        "background-color",
        "rgb(222, 141, 142)",
      );

      await expect(page.getByText("Julian logged in")).not.toBeVisible();
    }); */
  });

  test("front page can be opened", async ({ page }) => {
    /*Como mi app tiene dos partes que dicen Blog entonces el test no sabe diferenciar
    a cual hace referencia
    const locator = await page.getByText("Blog");
    Esta es una posible solución
    const locator = page.getByText("Blog", { exact: true });
    */

    const locator = page.getByRole("heading", { name: "Blog", exact: true });

    await expect(locator).toBeVisible();
    await expect(page.getByText("Blog App, Julian")).toBeVisible();
  });

  test("login fail with wrong password", async ({ page }) => {
    await page.getByRole("button", { name: "Log in" }).click();
    await page.getByTestId("username").fill("Atem99");
    await page.getByTestId("password").fill("12345");
    await page.getByRole("button", { name: "Login" }).click();
    // await expect(page.getByText("Credentials Error")).toBeVisible();
    const errorDiv = await page.locator(".error");
    await expect(errorDiv).toContainText("Credentials Error");
    await expect(errorDiv).toHaveCSS("color", "rgb(255, 255, 255)");
    await expect(errorDiv).toHaveCSS("background-color", "rgb(222, 141, 142)");

    await expect(page.getByText("Julian logged in")).not.toBeVisible();
  });

  test("user can log in", async ({ page }) => {
    await loginWith(page, "Atem99", "Secret");
    await expect(page.getByText("Julian logged in")).toBeVisible();
  });

  describe("when logged in", () => {
    beforeEach(async ({ page }) => {
      await loginWith(page, "Atem99", "Secret");
    });

    test("a new blog can be created", async ({ page }) => {
      await page.getByRole("button", { name: "New Blog" }).click();
      await page
        .getByTestId("title")
        .fill("Nuevo blog de prueba por playwright");
      await page.getByTestId("url").fill("www.NuevoBlogPrueba.com");
      await page.getByTestId("author").fill("Autor de prueba");
      await page.getByRole("button", { name: "Create" }).click();

      await expect(
        page.getByText("Nuevo blog de prueba por playwright - Autor de prueba"),
      ).toBeVisible();
    });

    describe("and a blog exists", () => {
      beforeEach(async ({ page }) => {
        await page.getByRole("button", { name: "New Blog" }).click();
        await createBlog(
          page,
          "Blog de prueba por playwright",
          "www.NuevoBlogPrueba.com",
          "Prueba",
        );
        await createBlog(
          page,
          "Blog 2 de prueba por playwright",
          "www.NuevoBlogPrueba2.com",
          "Prueba2",
        );
        await createBlog(
          page,
          "Blog 3 de prueba por playwright",
          "www.NuevoBlogPrueba3.com",
          "Prueba3",
        );
      });

      test("blog info can be seen", async ({ page }) => {
        const otherBlogElement = page
          .locator(".blog")
          .filter({ hasText: "Blog de prueba por playwright - Prueba" });
        await expect(
          page.getByText("URL: www.NuevoBlogPrueba.com"),
        ).not.toBeVisible();
        await otherBlogElement.getByRole("button", { name: "View" }).click();
        await expect(
          page.getByText("URL: www.NuevoBlogPrueba.com"),
        ).toBeVisible();
      });

      test("like can be changed", async ({ page }) => {
        const otherBlogElement = page
          .locator(".blog")
          .filter({ hasText: "Blog 2 de prueba por playwright - Prueba2" });
        await otherBlogElement.getByRole("button", { name: "View" }).click();
        await otherBlogElement.getByRole("button", { name: "Like" }).click();
        await expect(otherBlogElement.getByText("Likes: 1")).toBeVisible();
      });

      test("blogs are ordered by likes", async ({ page }) => {
        test.setTimeout(10000);
        const blog1 = page
          .locator(".blog")
          .filter({ hasText: "Blog de prueba por playwright" });
        const blog2 = page
          .locator(".blog")
          .filter({ hasText: "Blog 2 de prueba por playwright" });

        await blog1.getByRole("button", { name: "View" }).click();
        await blog2.getByRole("button", { name: "View" }).click();

        const likeButton2 = blog2.getByRole("button", { name: "Like" });
        await likeButton2.click();
        await expect(blog2.getByText("Likes: 1")).toBeVisible();
        await likeButton2.click();
        await expect(blog2.getByText("Likes: 2")).toBeVisible();

        await expect(page.locator(".blog").first()).toContainText(
          "Blog 2 de prueba por playwright",
        );

        /* const blogElements = await page.locator(".blog").all();
        await expect(blogElements[0]).toContainText(
          "Blog 2 de prueba por playwright",
        ); */
      });

      test("remove the blog", async ({ page }) => {
        const otherBlogElement = page
          .locator(".blog")
          .filter({ hasText: "Blog de prueba por playwright - Prueba" });

        page.on("dialog", async (dialog) => {
          await dialog.accept();
        });
        await otherBlogElement.getByRole("button", { name: "Delete" }).click();
        await expect(
          page.getByText("Blog de prueba por playwright - Prueba"),
        ).not.toBeVisible();
      });
      describe("change user", () => {
        beforeEach(async ({ page }) => {
          await page.getByRole("button", { name: "Logout" }).click();
          await loginWith(page, "Atem11", "54321");
        });

        test("delete button is never visible to non-creators", async ({
          page,
        }) => {
          const blogToInteract = page
            .locator(".blog")
            .filter({ hasText: "Blog 2" });

          await expect(
            blogToInteract.getByRole("button", { name: "Delete" }),
          ).not.toBeVisible();

          await blogToInteract.getByRole("button", { name: "View" }).click();
          await blogToInteract.getByRole("button", { name: "Like" }).click();

          await expect(
            blogToInteract.getByRole("button", { name: "Delete" }),
          ).not.toBeVisible();
        });
      });
    });
  });
});
