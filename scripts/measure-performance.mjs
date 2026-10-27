import { chromium } from "@playwright/test";
const browser = await chromium.launch();
try {
  const page = await browser.newPage({
    viewport: { width: 1440, height: 1000 },
    deviceScaleFactor: 2,
    reducedMotion: "reduce",
  });
  const session = await page.context().newCDPSession(page);
  await session.send("Performance.enable");
  await page.goto(process.argv[2] ?? "http://127.0.0.1:3000");
  await page.getByRole("button", { name: "Enter portfolio" }).click();
  await page.locator(".landing-page").waitFor({ state: "hidden" });
  await page.waitForTimeout(1200);
  const metrics = async () =>
    Object.fromEntries(
      (await session.send("Performance.getMetrics")).metrics.map((m) => [
        m.name,
        m.value,
      ]),
    );
  await page.evaluate(() => {
    window.__samples = [];
    window.__mutations = 0;
    window.__running = true;
    const obs = new MutationObserver((ms) => (window.__mutations += ms.length));
    obs.observe(document.querySelector(".three-stage"), {
      attributes: true,
      subtree: true,
    });
    window.__observer = obs;
    let previous = performance.now();
    const sample = (now) => {
      if (!window.__running) return;
      window.__samples.push(now - previous);
      previous = now;
      requestAnimationFrame(sample);
    };
    requestAnimationFrame(sample);
  });
  const before = await metrics();
  await page.waitForTimeout(2000);
  const idle = await metrics();
  const idleMutations = await page.evaluate(() => {
    const n = window.__mutations;
    window.__mutations = 0;
    window.__samples = [];
    return n;
  });
  await page.mouse.move(750, 500);
  await page.mouse.down();
  for (let i = 0; i < 90; i++)
    await page.mouse.move(
      750 + 150 * Math.sin(i / 12),
      500 + 60 * Math.cos(i / 12),
    );
  await page.mouse.up();
  const after = await metrics();
  const interaction = await page.evaluate(() => {
    window.__running = false;
    window.__observer.disconnect();
    return { mutations: window.__mutations, frames: window.__samples };
  });
  const delta = (a, b) => ({
    scriptMs: Math.round((b.ScriptDuration - a.ScriptDuration) * 1000),
    taskMs: Math.round((b.TaskDuration - a.TaskDuration) * 1000),
    styleRecalculations: b.RecalcStyleCount - a.RecalcStyleCount,
    layouts: b.LayoutCount - a.LayoutCount,
  });
  const sorted = interaction.frames.sort((a, b) => a - b);
  console.log(
    JSON.stringify(
      {
        idle: { ...delta(before, idle), domMutations: idleMutations },
        drag: {
          ...delta(idle, after),
          domMutations: interaction.mutations,
          frames: sorted.length,
          medianFrameMs: Math.round(
            sorted[Math.floor(sorted.length * 0.5)] ?? 0,
          ),
          p95FrameMs: Math.round(sorted[Math.floor(sorted.length * 0.95)] ?? 0),
        },
        webgl: await page
          .locator(".three-canvas")
          .evaluate((c) => ({ width: c.width, height: c.height })),
        images: await page.locator("img").count(),
      },
      null,
      2,
    ),
  );
} finally {
  await browser.close();
}
