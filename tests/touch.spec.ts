import { test, expect } from "@playwright/test";

test.use({ hasTouch: true });

test("two-finger pan and pinch zoom work together and release cleanly", async ({ page }) => {
  await page.setViewportSize({ width: 1280, height: 900 });
  await page.goto("/");
  await expect(page.locator(".intro-hint")).toBeVisible();
  await page.getByRole("button", { name: "Enter portfolio" }).tap();
  await expect(page.locator(".landing-page")).toBeHidden();
  const stage = page.locator(".three-stage");
  const face = page.locator('.three-face[data-side="front"]');
  const before = await face.boundingBox();
  const session = await page.context().newCDPSession(page);
  await session.send("Input.dispatchTouchEvent", { type: "touchStart", touchPoints: [{ x: 650, y: 400, id: 1 }, { x: 850, y: 400, id: 2 }] });
  await session.send("Input.dispatchTouchEvent", { type: "touchMove", touchPoints: [{ x: 675, y: 430, id: 1 }, { x: 975, y: 430, id: 2 }] });
  await expect(stage).toHaveAttribute("data-zoom", "1.500");
  await expect.poll(async () => (await face.boundingBox())!.width).toBeGreaterThan(before!.width * 1.4);
  await session.send("Input.dispatchTouchEvent", { type: "touchEnd", touchPoints: [] });
  await expect(stage).not.toHaveClass(/is-dragging/);
  await page.getByRole("button", { name: "Reset view", exact: true }).tap();
  await expect(stage).toHaveAttribute("data-zoom", "1.000");
  await expect.poll(async () => (await face.boundingBox())!.x).toBeCloseTo(before!.x, 0);
});
