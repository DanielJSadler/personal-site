# Original design

Keep Daniel's signature SVG, Roboto Mono typography, grey background and translucent navigation. The design picker and alternative themes have been removed in favour of the original identity.

## Glass and glow

Three.js owns camera projection and quaternion rotation. One CSS3DRenderer object carries six fixed HTML glass faces, retaining semantic content, links and selectable text. The HTML surfaces use a light white tint and a fine glass edge. All six faces stay mounted and painted while rotating. CSS backface culling hides their reverse surfaces without gating content on the selected face. Only the selected face accepts keyboard focus and interaction. Desktop content does not fade in on face changes; the current photograph and project images are loaded eagerly.

A soft, camera-facing shader at the cube's centre blends two colours with a Gaussian falloff. It is deliberately diffused, rather than an opaque sphere. The orb and glass move together while the light fades softly beyond the edges. WebGL draws only the orb; the glass uses HTML surfaces without extra physical materials, lights or shadow passes. These are the original gradient pairs:

| Face | Section | Upper colour | Lower colour |
| --- | --- | --- | --- |
| Front | Home | `#00C2FF` | `#293FFF` |
| Right | Skills | `#00C2FF` | `#FF29C3` |
| Back | Pictures | `#FF29C3` | `#FFD700` |
| Left | Portfolio | `#FFD700` | `#4CAF50` |
| Top | Bio | `#4CAF50` | `#FF5733` |
| Bottom | About | `#FF5733` | `#00C2FF` |

The colours transition with face navigation and with the nearest visible face during dragging. Reduced-motion preferences remove the animated interpolation. If WebGL cannot initialise, a blurred CSS glow uses the same colour pairs behind the perspective HTML cube.

## Interaction

Drag a face or the space around it to turn the cube. The cube follows the pointer directly and settles on the nearest face when released, keeping its text upright and synchronising the section navigation. Right-drag, middle-drag or Shift-drag pans the cube within bounded space. Scroll or pinch to zoom; two fingers pan and zoom together on touch screens. Zoom buttons and Reset view provide keyboard-accessible controls. Zoom persists through window resizing, and Reset view restores the default position and magnification. Links, buttons and form controls retain their normal click behaviour. Pointer capture keeps a drag intact when the cursor leaves the scene.

Mobile uses a single visible scrolling section with the original colour washes. Inactive desktop faces are inert and excluded from accessibility navigation. The section buttons provide a keyboard-accessible alternative to dragging.

## Intro

The intro keeps the original black screen and white signature, with a 100px white circular cursor using exclusion blending. Its Enter label changes to Loading and the circle grows during the loading sequence. Clicking anywhere enters the portfolio; the full-screen hit area is also keyboard accessible. Touch and keyboard users receive a static Enter hint instead of needing a pointer cursor. The implementation uses native pointer events and works with React 19 without the old cursor package.

## Performance

The scene renders on demand and sleeps when motion and colour transitions finish, when it has no size, or when the tab is hidden. Rotation updates one parent transform; all six face contents remain painted. The glow only redraws when its colours, camera or position change. Its soft canvas uses a bounded pixel budget while text stays full resolution. Expensive moving backdrop filters are replaced with translucent tints. Only the matching desktop/mobile presentation mounts, and the gallery loads the current photograph and its two neighbours. See [PERFORMANCE.md](./PERFORMANCE.md) for the production comparison and reproduction command.
