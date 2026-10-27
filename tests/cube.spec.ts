import { test, expect } from "@playwright/test";

test("drag rotates the glass cube, selects a face, and Shift-drag moves it", async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 1000 });
  const errors: string[] = [];
  page.on("pageerror", error => errors.push(error.message));
  await page.goto("/");
  await page.getByRole("button", { name: "Enter portfolio" }).click();
  await expect(page.locator(".landing-page")).toBeHidden();
  const stage = page.locator(".three-stage");
  const face = page.locator('.three-face[data-side="front"]');
  const initialTransform = await face.evaluate(element => element.style.transform);
  const background = await face.evaluate(element => getComputedStyle(element).backgroundColor);
  expect(background).toMatch(/rgba\(255, 255, 255, 0\.09\)/);
  await expect(stage).toHaveAttribute("data-webgl", "true");
  await page.mouse.move(750, 500);
  await page.mouse.down();
  await page.mouse.move(1000, 540, { steps: 20 });
  await expect(stage).toHaveClass(/is-dragging/);
  await expect.poll(() => face.evaluate(element => element.style.transform)).not.toBe(initialTransform);
  await page.mouse.up();
  await expect(stage).not.toHaveClass(/is-dragging/);
  await expect(stage).toHaveAttribute("data-active-side", "left");
  await expect(page.getByRole("button", { name: /^portfolio$/i }).filter({ visible: true })).toHaveAttribute("aria-current", "page");

  // Navigation regains the canonical readable orientation after free rotation.
  await page.getByRole("button", { name: /^home$/i }).filter({ visible: true }).click();
  await expect(stage).toHaveAttribute("data-active-side", "front");
  await expect.poll(() => face.evaluate(element => element.style.transform)).toBe(initialTransform);
  const beforePan = await face.boundingBox();
  await page.keyboard.down("Shift");
  await page.mouse.move(750, 500);
  await page.mouse.down();
  await page.mouse.move(810, 540, { steps: 10 });
  await page.mouse.up();
  await page.keyboard.up("Shift");
  const afterPan = await face.boundingBox();
  expect(afterPan!.x).toBeGreaterThan(beforePan!.x + 20);
  expect(afterPan!.y).toBeGreaterThan(beforePan!.y + 15);
  await expect(stage).toHaveAttribute("data-active-side", "front");

  // Capturing a drag must also release safely outside the stage.
  await page.mouse.move(750, 500);
  await page.mouse.down();
  await page.mouse.move(50, 100, { steps: 20 });
  await page.mouse.up();
  await expect(stage).not.toHaveClass(/is-dragging/);
  await expect(page.locator('.three-face:not([inert])')).toHaveCount(1);
  expect(errors).toEqual([]);
});
