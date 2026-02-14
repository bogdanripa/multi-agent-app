import { test, expect } from "@playwright/test";

test("shows loading while fetching health and then renders payload", async ({ page }) => {
  let releaseResponse = () => {};
  const responseGate = new Promise<void>((resolve) => {
    releaseResponse = resolve;
  });

  await page.route("**/api/health", async (route) => {
    await responseGate;
    await route.fulfill({
      status: 200,
      contentType: "application/json",
      body: JSON.stringify({
        ok: true,
        service: "api",
        time: "2026-02-14T12:34:56.000Z"
      })
    });
  });

  await page.goto("/");
  await expect(page.getByRole("heading", { name: "Task Organizer" })).toBeVisible();
  await expect(page.getByText("Loading…")).toBeVisible();

  releaseResponse();
  await expect(page.getByText("Loading…")).toBeHidden();
  await expect(page.locator("pre")).toContainText('"ok": true');
});

test("renders /api/health payload matching contract fields", async ({ page }) => {
  await page.route("**/api/health", async (route) => {
    await route.fulfill({
      status: 200,
      contentType: "application/json",
      body: JSON.stringify({
        ok: true,
        service: "api",
        time: "2026-02-14T12:34:56.000Z"
      })
    });
  });

  await page.goto("/");

  const payloadText = await page.locator("pre").innerText();
  const payload = JSON.parse(payloadText) as { ok: boolean; service: string; time: string };

  expect(payload.ok).toBe(true);
  expect(payload.service).toBe("api");
  expect(payload.time).toMatch(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/);
});

test("shows clear error when health endpoint fails", async ({ page }) => {
  await page.route("**/api/health", async (route) => {
    await route.fulfill({
      status: 500,
      contentType: "application/json",
      body: JSON.stringify({
        error: { code: "INTERNAL", message: "Internal Server Error" }
      })
    });
  });

  await page.goto("/");
  await expect(page.getByRole("alert")).toContainText("Error: HTTP 500");
});
