import { test, expect, type Page } from "@playwright/test";

const sections = ["Home", "About", "Skills", "Bio", "Portfolio", "Pictures"];
const sideNames = ["front", "bottom", "right", "top", "left", "back"];
const looks = ["Original", "Play studio", "Off the clock", "Coffee break", "Contact sheet", "Workshop"];
const sectionButton = (page: Page, name: string) => page.getByRole("button", { name: new RegExp(`^${name}$`, "i") }).filter({ visible: true });

for (const viewport of [{ width: 1440, height: 1000 }, { width: 768, height: 1024 }, { width: 390, height: 844 }, { width: 320, height: 568 }]) {
  test(`sections and design choices at ${viewport.width}px`, async ({ page }) => {
    await page.setViewportSize(viewport);
    const errors: string[] = [];
    page.on("pageerror", error => errors.push(error.message));
    await page.goto("/");
    await page.getByRole("button", { name: "Enter portfolio" }).click();
    await expect(page.locator(".landing-page")).toBeHidden();
    for (const [index, section] of sections.entries()) {
      await sectionButton(page, section).click();
      await expect(sectionButton(page, section)).toHaveAttribute("aria-current", "page");
      if (viewport.width >= 768) {
        await expect(page.locator('.three-face[aria-hidden="false"]')).toHaveAttribute("data-side", sideNames[index]!);
        await expect(page.locator('.three-face:not([inert])')).toHaveCount(1);
      } else {
        await expect(page.locator(".mobile-content:not([hidden])")).toHaveCount(1);
      }
    }
    await page.getByRole("button", { name: "Next photo" }).filter({ visible: true }).click();
    await expect(page.getByText("2 / 29", { exact: true }).filter({ visible: true })).toBeVisible();
    const newPhoto = page.getByAltText("Riverside buildings with mountains in the distance").filter({ visible: true });
    await expect(newPhoto).toBeVisible();
    await expect.poll(() => newPhoto.evaluate((image: HTMLImageElement) => image.complete && image.naturalWidth > 0)).toBe(true);
    await sectionButton(page, "Portfolio").click();
    const projectLinks = page.locator(viewport.width >= 768 ? '.three-face[data-side="left"] .projects-grid a' : '.mobile-content:not([hidden]) .projects-grid a');
    await expect(projectLinks).toHaveCount(4);
    await expect(projectLinks.first()).toHaveAttribute("href", "https://www.everyonesinvited.uk/");
    await sectionButton(page, "Home").click();
    for (const look of looks) {
      await page.locator(".design-picker").evaluate((element: HTMLDetailsElement) => { element.open = true; });
      await page.getByRole("radio", { name: new RegExp(`^${look}`) }).check();
      await page.locator(".design-picker").evaluate((element: HTMLDetailsElement) => { element.open = false; });
      const home = page.locator(viewport.width >= 768 ? '.three-face[data-side="front"]' : '.mobile-content:not([hidden])');
      await expect(home.locator(look === "Original" ? ".original-home" : ".design-home")).toBeVisible();
      expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
    }
    await page.reload();
    await expect(page.locator(".design-root")).toHaveAttribute("data-design", "workshop");
    await page.getByRole("button", { name: "Enter portfolio" }).click();
    await expect(page.locator(".landing-page")).toBeHidden();
    await sectionButton(page, "Contact").click();
    await expect(page.getByRole("dialog")).toBeVisible();
    await page.keyboard.press("Escape");
    await expect(page.getByRole("dialog")).toBeHidden();
    expect(errors).toEqual([]);
  });
}
