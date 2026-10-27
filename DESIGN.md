# Original design

Keep Daniel's signature SVG, Roboto Mono typography, grey background and translucent navigation. The design picker and alternative themes have been removed in favour of the original identity.

## Glass and glow

Three.js owns camera projection and quaternion rotation. HTML content is placed with CSS3DRenderer at the six faces of a transparent WebGL box, retaining semantic content, links and selectable text. The HTML surfaces use a light white tint and a fine glass edge. Only the facing section shows content, avoiding text overlapping through the transparent cube.

A soft, camera-facing shader at the cube's centre blends two colours with a Gaussian falloff. It is deliberately diffused, rather than an opaque sphere. The orb and glass move together while the light fades softly beyond the edges. These are the original gradient pairs:

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

Drag a face or the space around it to turn the cube. The cube follows the pointer directly and settles on the nearest face when released, keeping its text upright and synchronising the section navigation. Shift-drag moves the cube within bounded space. Links, buttons and form controls retain their normal click behaviour. Pointer capture keeps a drag intact when the cursor leaves the scene.

Mobile uses a single visible scrolling section with the original colour washes. Inactive desktop faces are inert and excluded from accessibility navigation. The section buttons provide a keyboard-accessible alternative to dragging.
