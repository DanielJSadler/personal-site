import { defineConfig } from "@playwright/test";

export default defineConfig({
  testDir: "./tests",
  fullyParallel: false,
  // WebGL scenes share the local graphics device, including software rendering in CI.
  workers: 2,
  use: { baseURL: "http://127.0.0.1:3000", reducedMotion: "reduce", trace: "retain-on-failure" },
  webServer: { command: "npm run dev -- --hostname 127.0.0.1", url: "http://127.0.0.1:3000", reuseExistingServer: !process.env.CI },
});
