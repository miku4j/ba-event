import { test, expect } from "@playwright/test";

const MOCK_USER = { id: 1, name: "Test User", email: "test@test.com" };
const BASE_HOST = new URL(
  process.env.PLAYWRIGHT_BASE_URL || "http://localhost:8080",
).hostname;

test.describe("Auth UI", () => {
  test("shows login form at /auth/login", async ({ page }) => {
    await page.goto("/auth/login");
    await expect(page.getByRole("heading", { name: "Sign in" })).toBeVisible();
    await expect(page.getByLabel("Email")).toBeVisible();
    await expect(page.getByLabel("Password")).toBeVisible();
    await expect(
      page.getByRole("button", { name: "Sign in with email" }),
    ).toBeVisible();
  });

  test("shows register form at /auth/register", async ({ page }) => {
    await page.goto("/auth/register");
    await expect(
      page.getByRole("heading", { name: "Create account" }),
    ).toBeVisible();
    await expect(page.getByLabel("Name")).toBeVisible();
    await expect(page.getByLabel("Email")).toBeVisible();
    await expect(
      page.getByRole("button", { name: "Create account" }),
    ).toBeVisible();
  });

  test("shows sign in buttons in header when not authenticated", async ({
    page,
  }) => {
    await page.route("**/api/user", (route) => route.fulfill({ status: 401 }));
    await page.goto("/");
    await expect(page.getByRole("link", { name: "Sign in" })).toBeVisible();
    await expect(
      page.getByRole("link", { name: "Get started" }),
    ).toBeVisible();
  });

  test("shows user menu in header when authenticated", async ({ page }) => {
    await page.route("**/api/user", (route) =>
      route.fulfill({
        status: 200,
        contentType: "application/json",
        body: JSON.stringify(MOCK_USER),
      }),
    );
    await page.goto("/");
    await expect(page.getByText("Test User")).toBeVisible();
    await expect(
      page.getByRole("button", { name: "Sign out" }),
    ).toBeVisible();
  });

  test("redirects to / when auth_token cookie is present on auth pages", async ({
    page,
  }) => {
    await page.context().addCookies([
      { name: "auth_token", value: "1|fake", domain: BASE_HOST, path: "/" },
    ]);
    await page.goto("/auth/login");
    await expect(page).toHaveURL("/");
  });
});
