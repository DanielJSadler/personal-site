# Design exploration

Based on [Anthropic's frontend-design skill](https://github.com/anthropics/skills/blob/main/skills/frontend-design/SKILL.md), reviewed against Daniel's existing portfolio before implementation.

The cube is the signature interaction in every option. Keep the original identity as the default and offer five additional directions. Use Daniel's real projects and photographs. Avoid invented credentials, generic dashboard cards and decorative stock photography.

| Direction | Core palette | Type | Composition |
| --- | --- | --- | --- |
| Original | grey `#d8d8d8`, sky `#c5eaff`, periwinkle `#8996f2`, ink `#222222` | Existing Roboto Mono and SVG signature | Centred signature, translucent navigation and coloured faces. |
| Play studio | butter `#ffe98b`, cobalt `#163ec0`, pink `#d84c73`, pale blue `#aebeff` | Arial Black display, Arial body | Large left-aligned name, circular maker's mark, offset project image shadows. |
| Off the clock | leaf `#d9e8c4`, forest `#214d3e`, violet `#76459e`, lilac `#bdb2d4` | Trebuchet MS, Georgia italic accent | A relaxed vertical composition and a simple route motif rooted in running and exploration. |
| Coffee break | porcelain `#d8e5ed`, roast `#503627`, copper `#92582f`, caramel `#bc9678` | Georgia display, Arial body | Quiet masthead, oversized serif statement and arched coffee photograph. |
| Contact sheet | white `#ffffff`, slate `#25344a`, blue `#3366a8`, gallery grey `#e4e7eb` | Helvetica Neue / Arial | A compact photo grid, restrained captions and horizontal project presentations. |
| Workshop | blueprint `#e8f2fb`, navy `#204573`, drafting red `#a13b3e`, steel `#b1c9de` | Courier New | Graph-paper surface, a software relationship diagram and plain technical lettering. |

Each home is left aligned; navigation keeps a consistent order and accessible labels. Other faces inherit the chosen palette, while project images and editorial headings receive direction-specific treatments. System font stacks make alternatives available without more font downloads.

Review: a generic dark developer theme and a cream/terracotta editorial theme were rejected in favour of directions grounded in Daniel's actual interests. Colour-only variants would not offer enough comparison, so every new home has a separate composition. The original remains one click away. Reduced motion, small-screen scrolling and keyboard navigation apply to all options. Local storage remembers the selection; unavailable storage does not prevent switching.

## Scene

Three.js owns camera projection and quaternion rotation. HTML content is placed with CSS3DRenderer at the six faces of a WebGL box, retaining semantic content, links and selectable text. WebGL provides the solid body, lighting and ground shadow; the same perspective scene still works through CSS3DRenderer if WebGL cannot initialise. This hybrid intentionally uses DOM rendering for content instead of rasterising pages into inaccessible textures.

Mobile uses a single visible scrolling section rather than shrinking six pages into a small cube. Inactive desktop faces are inert and excluded from accessibility navigation. The original CSS transform cube has been removed.
