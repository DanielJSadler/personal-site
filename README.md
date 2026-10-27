# Daniel Sadler's portfolio

Next.js 16, React 19, Tailwind CSS 4 and Three.js. Use Node.js 22 or newer (Node 24 recommended), with Yarn 1.22.22 as recorded in `package.json`.

```sh
npx yarn@1.22.22 install --frozen-lockfile
npx yarn@1.22.22 dev
```

Open http://localhost:3000 and choose **Enter portfolio**. The **Design** picker at the top right offers the original appearance plus five alternatives, remembering your selection locally. [DESIGN.md](./DESIGN.md) explains each direction and the hybrid Three.js scene.

Desktop and tablet use a perspective cube with six HTML faces and a lit WebGL body. Mobile presents one scrolling section at a time. Reduced-motion preferences are respected; navigation also works without WebGL.

## Validation

```sh
npx yarn@1.22.22 lint
npx yarn@1.22.22 typecheck
npx yarn@1.22.22 build
npx playwright install chromium
npx yarn@1.22.22 test:e2e
```

Browser checks cover all sections and design choices at desktop, tablet and two phone widths, photo navigation, project links, design persistence, and opening/closing the contact dialog. The test runner starts a local development server when one is not already running.

## Environment

The portfolio needs no secrets to render. The existing `/api/slack-webhook` endpoint requires `SLACK_SIGNING_SECRET` when used. Keep secrets in `.env.local` or your host's environment settings.

Use `yarn start` after a production build. Each feature from [features.md](./features.md) is committed separately on `feature/modernize-cube-designs`.
