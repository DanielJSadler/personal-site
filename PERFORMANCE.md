# Cube performance

Production build sampled locally in headless Chromium at a 1440 × 1000 viewport and 2× device scale. Both measurements used the same script, machine, reduced-motion setting, two-second idle window and 90-point drag. Browser/GPU performance varies; these are local samples rather than a guarantee for other devices.

| Measurement | Before | After |
| --- | ---: | ---: |
| Median frame interval during drag | 133 ms | 17 ms |
| 95th percentile frame interval | 150 ms | 17 ms |
| DOM attribute mutations during drag | 3,925 | 241 |
| DOM attribute mutations during two seconds idle | 204 | 0 |
| WebGL drawing-buffer pixels | 5,100,000 | 1,498,088 |
| Mounted images | 66 | 7 |

The drag sample completed sooner after optimisation, so total mutation counts cover the same input sequence rather than equal durations. Frame intervals include browser rendering/compositing and input delivery; they are not a GPU timer.

Changes:

- Render on demand. No perpetual animation loop or repeated accessibility/style writes while idle. Suspend work in hidden tabs and wake for navigation, gestures and resizing.
- Move one parent CSS3D object. Six fixed face transforms stay mounted, preserving continuous content during rotation.
- Separate glow and HTML invalidation. Turning within a face reuses the WebGL image; colour changes, pan and zoom redraw it.
- Draw only the glow in WebGL. Remove the almost invisible duplicate physical box, unused lights, shadows and antialiasing. Cap the diffuse canvas at 1.5 million pixels and 1.25× scale; HTML text and glass edges keep native resolution.
- Remove large backdrop filters from moving faces/navigation while retaining their translucent tint.
- Mount only the desktop or mobile presentation. Load Three.js through the desktop component, avoiding an invisible WebGL scene on phones.
- Keep three photographs mounted in the gallery: current, previous and next. Adjacent images load eagerly; wraparound skips the long empty-track transition.
- Move the intro cursor with a compositor transform rather than layout-changing `left`/`top` writes. Remove the mobile navigation's artificial delay.

Reproduce against a production server, with other browser tests stopped:

```sh
npx yarn@1.22.22 build
npx yarn@1.22.22 start
# In another terminal:
node scripts/measure-performance.mjs
```

An optional first argument selects a different server URL. Browser regression tests also verify zero idle draws/mutations, reuse of the glow during rotation, completion of normal-motion colour transitions, and absence of a hidden desktop scene on mobile. They use behavioural checks rather than flaky frame-rate thresholds.
