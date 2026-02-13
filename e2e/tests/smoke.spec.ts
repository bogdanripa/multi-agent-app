import { test, expect } from "@playwright/test";

test("loads app and shows health payload", async ({ page }) => {
  await page.goto("/");
  await expect(page.getByRole("heading", { name: "My App" })).toBeVisible();
  await expect(page.getByText('"ok": true')).toBeVisible();
});
