import { test, expect } from "@playwright/test";

test.use({ launchOptions: { args: ["--disable-webgl"] } });

test("keeps perspective content usable without WebGL", async ({ page }) => {
  await page.setViewportSize({ width: 1280, height: 800 });
  await page.goto("/");
  await page.getByRole("button", { name: "Enter portfolio" }).click();
  await expect(page.locator(".landing-page")).toBeHidden();
  await expect(page.locator(".three-canvas")).toHaveCount(0);
  await page.getByRole("button", { name: /^skills$/i }).filter({ visible: true }).click();
  const face = page.locator('.three-face[data-side="right"]');
  await expect(face).toHaveAttribute("aria-hidden", "false");
  await expect(face.getByRole("link", { name: /^react$/i })).toBeVisible();
});
