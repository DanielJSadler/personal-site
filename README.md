# Daniel Sadler's portfolio

Next.js 16, React 19, Tailwind CSS 4 and Three.js. Use Node.js 22 or newer (Node 24 recommended), with Yarn 1.22.22 as recorded in `package.json`.

```sh
npx yarn@1.22.22 install --frozen-lockfile
npx yarn@1.22.22 dev
```

Open http://localhost:3000 and click anywhere on the intro (or press Enter while focused). The original signature, translucent cube and colour-changing glow are retained. Drag to turn the cube; right-drag or Shift-drag to pan; scroll or pinch to zoom. Two-finger gestures combine pan and zoom, and Reset view restores the default framing. Releasing a turn settles on the nearest section, and the section buttons remain available. [DESIGN.md](./DESIGN.md) explains the scene.

Desktop and tablet use a perspective cube with six glass-like HTML faces and a diffused WebGL orb. Mobile presents one scrolling section at a time. Reduced-motion preferences are respected; navigation also works without WebGL.

## Validation

```sh
npx yarn@1.22.22 lint
npx yarn@1.22.22 typecheck
npx yarn@1.22.22 build
npx playwright install chromium
npx yarn@1.22.22 test:e2e
```

Browser checks cover all sections at desktop, tablet and two phone widths, cube rotation, continuous face rendering, panning, zoom, touch gestures, the custom intro cursor, photo navigation, project links, the contact dialog, and navigation without WebGL. The test runner starts a local development server when one is not already running.

## Environment

The portfolio needs no secrets to render. The existing `/api/slack-webhook` endpoint requires `SLACK_SIGNING_SECRET` when used. Keep secrets in `.env.local` or your host's environment settings.

Use `yarn start` after a production build. Each feature from [features.md](./features.md) is committed separately on `feature/modernize-cube-designs`.

Performance notes and the repeatable production benchmark are in [PERFORMANCE.md](./PERFORMANCE.md).
