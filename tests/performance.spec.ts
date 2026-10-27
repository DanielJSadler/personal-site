import { test, expect } from "@playwright/test";

declare global {
  interface Window { __cubeDraws: number; }
}

test.beforeEach(async ({ page }) => {
  await page.addInitScript(() => {
    window.__cubeDraws = 0;
    const original = WebGL2RenderingContext.prototype.drawElements;
    WebGL2RenderingContext.prototype.drawElements = function (...args) {
      window.__cubeDraws++;
      return original.apply(this, args);
    };
  });
});

test("idle cube stops drawing; rotation reuses the glow; mobile has no hidden scene", async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 1000 });
  await page.goto("/");
  await page.getByRole("button", { name: "Enter portfolio" }).click();
  await expect(page.locator(".landing-page")).toBeHidden();
  await expect(page.locator(".three-stage")).toHaveAttribute("data-active-side", "front");
  await expect.poll(() => page.evaluate(() => window.__cubeDraws)).toBeGreaterThan(0);
  await page.evaluate(() => new Promise(resolve => requestAnimationFrame(() => requestAnimationFrame(resolve))));
  const idle = await page.evaluate(async () => {
    const draws = window.__cubeDraws;
    let mutations = 0;
    const observer = new MutationObserver(records => { mutations += records.length; });
    observer.observe(document.querySelector(".three-stage")!, { attributes: true, subtree: true });
    await new Promise(resolve => setTimeout(resolve, 300));
    observer.disconnect();
    return { draws: window.__cubeDraws - draws, mutations };
  });
  expect(idle).toEqual({ draws: 0, mutations: 0 });

  const before = await page.evaluate(() => window.__cubeDraws);
  const transform = await page.locator(".three-cube").evaluate(element => element.style.transform);
  await page.mouse.move(750, 500);
  await page.mouse.down();
  await page.mouse.move(780, 500, { steps: 8 });
  await expect.poll(() => page.locator(".three-cube").evaluate(element => element.style.transform)).not.toBe(transform);
  expect(await page.evaluate(() => window.__cubeDraws)).toBe(before);
  await page.mouse.up();
  await page.getByRole("button", { name: "Zoom in", exact: true }).click();
  await expect.poll(() => page.evaluate(() => window.__cubeDraws)).toBeGreaterThan(before);
  expect(await page.locator("img").count()).toBeLessThanOrEqual(7);

  await page.setViewportSize({ width: 390, height: 844 });
  await expect(page.locator(".mobile-world")).toBeVisible();
  await expect(page.locator(".three-canvas")).toHaveCount(0);
  await expect(page.locator(".desktop-world")).toHaveCount(0);
  await page.setViewportSize({ width: 1440, height: 1000 });
  await expect(page.locator(".three-stage")).toHaveAttribute("data-active-side", "front");
  await expect(page.locator(".mobile-world")).toHaveCount(0);
});

test("animated navigation finishes its colour transition and stops drawing", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "no-preference" });
  await page.setViewportSize({ width: 1440, height: 1000 });
  await page.goto("/");
  await page.getByRole("button", { name: "Enter portfolio" }).click();
  await expect(page.locator(".landing-page")).toBeHidden();
  const before = await page.evaluate(() => window.__cubeDraws);
  await page.getByRole("button", { name: /^skills$/i }).filter({ visible: true }).click();
  await expect(page.locator(".three-stage")).toHaveAttribute("data-active-side", "right");
  await expect.poll(() => page.evaluate(() => window.__cubeDraws)).toBeGreaterThan(before);
  await expect.poll(() => page.evaluate(async () => {
    const draws = window.__cubeDraws;
    await new Promise(resolve => setTimeout(resolve, 150));
    return window.__cubeDraws - draws;
  }), { timeout: 5000 }).toBe(0);
});
