import { test, expect } from "@playwright/test";

test("intro restores the circular cursor and supports clicking anywhere or keyboard entry", async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 1000 });
  await page.goto("/");
  const entry = page.getByRole("button", { name: "Enter portfolio" });
  await expect(entry).toHaveCSS("border-top-width", "0px");
  const bounds = await entry.boundingBox();
  expect(bounds!.width).toBe(1440);
  expect(bounds!.height).toBe(1000);
  await page.mouse.move(320, 280);
  const cursor = page.locator(".intro-cursor");
  await expect(cursor).toHaveCSS("opacity", "1");
  await expect(cursor).toHaveCSS("left", "320px");
  await expect(cursor).toHaveCSS("top", "280px");
  await expect(cursor).toContainText("Enter");
  await page.mouse.click(320, 280);
  await expect(cursor).toContainText("Loading");
  await expect(cursor).toHaveClass(/is-loading/);
  await expect(page.locator(".landing-page")).toBeHidden();

  await page.reload();
  await entry.focus();
  await expect(page.locator(".intro-hint")).toBeVisible();
  await page.keyboard.press("Enter");
  await expect(page.locator(".landing-page")).toBeHidden();
});
