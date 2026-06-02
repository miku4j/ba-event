import { test, expect } from "@playwright/test";

const TEST_EMAIL = `e2e-${Date.now()}@test.com`;
const TEST_PASSWORD = "E2ePassword123!";

test.describe("Auth flow", () => {
  test("registers and redirects authenticated user", async ({ page }) => {
    await page.goto("/auth/register");

    await page.getByLabel("Name").fill("E2E User");
    await page.getByLabel("Email").fill(TEST_EMAIL);
    await page.getByLabel("Password", { exact: true }).fill(TEST_PASSWORD);
    await page.getByLabel("Confirm password").fill(TEST_PASSWORD);
    await page.getByRole("button", { name: "Create account" }).click();

    await expect(page).toHaveURL("/", { timeout: 10000 });
    await expect(page.getByText("E2E User")).toBeVisible();
    await expect(
      page.getByRole("button", { name: "Sign out" }),
    ).toBeVisible();
  });

  test("logs in with existing credentials", async ({ page }) => {
    await page.goto("/auth/login");

    await page.getByLabel("Email").fill(TEST_EMAIL);
    await page.getByLabel("Password", { exact: true }).fill(TEST_PASSWORD);
    await page.getByRole("button", { name: "Sign in with email" }).click();

    await expect(page).toHaveURL("/", { timeout: 10000 });
    await expect(page.getByText("E2E User")).toBeVisible();
  });

  test("signs out and clears auth state", async ({ page }) => {
    await page.goto("/auth/login");
    await page.getByLabel("Email").fill(TEST_EMAIL);
    await page.getByLabel("Password", { exact: true }).fill(TEST_PASSWORD);
    await page.getByRole("button", { name: "Sign in with email" }).click();

    await expect(page).toHaveURL("/", { timeout: 10000 });

    await page.getByRole("button", { name: "Sign out" }).click();
    await expect(
      page.getByRole("link", { name: "Sign in" }),
    ).toBeVisible();
    await expect(
      page.getByRole("link", { name: "Get started" }),
    ).toBeVisible();
  });

  test("shows error on invalid login", async ({ page }) => {
    await page.goto("/auth/login");
    await page.getByLabel("Email").fill("nonexistent@test.com");
    await page.getByLabel("Password", { exact: true }).fill("WrongPassword1!");
    await page.getByRole("button", { name: "Sign in with email" }).click();

    await expect(
      page.getByText("The provided credentials are incorrect."),
    ).toBeVisible();
  });
});
