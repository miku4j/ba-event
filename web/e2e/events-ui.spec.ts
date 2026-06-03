import { test, expect } from "@playwright/test";

test("homepage shows events from API", async ({ page }) => {
  await page.goto("/");
  await page.waitForLoadState("networkidle");

  await page.waitForSelector("text=Featured Event", { timeout: 15000 });
  await page.waitForSelector("text=Upcoming Events", { timeout: 5000 });

  await expect(page.locator("text=Featured Event")).toBeVisible();
  await expect(page.locator("text=Upcoming Events")).toBeVisible();
});

test("events page lists events", async ({ page }) => {
  await page.goto("/events");
  await page.waitForLoadState("networkidle");

  // Wait for loading to finish and events to appear
  await page.waitForTimeout(5000);

  const body = page.locator("body");
  const text = await body.textContent();

  // Should show event content (not loading skeleton)
  expect(text.length).toBeGreaterThan(500);
});
