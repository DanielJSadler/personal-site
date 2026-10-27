"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { createPortal } from "react-dom";
import * as THREE from "three";
import { CSS3DObject, CSS3DRenderer } from "three/addons/renderers/CSS3DRenderer.js";

export const sides = ["front", "right", "back", "left", "top", "bottom"] as const;
export type Side = (typeof sides)[number];
const rotations: Record<Side, [number, number, number]> = {
  front: [0, 0, 0], right: [0, Math.PI / 2, 0], back: [0, Math.PI, 0],
  left: [0, -Math.PI / 2, 0], top: [-Math.PI / 2, 0, 0], bottom: [Math.PI / 2, 0, 0],
};
// The original six gradient pairs, now lighting the centre of the glass cube.
const glowColors: Record<Side, [string, string]> = {
  front: ["#00C2FF", "#293FFF"], right: ["#00C2FF", "#FF29C3"],
  back: ["#FF29C3", "#FFD700"], left: ["#FFD700", "#4CAF50"],
  top: ["#4CAF50", "#FF5733"], bottom: ["#FF5733", "#00C2FF"],
};

/** HTML glass and the WebGL glow share a camera and world coordinates. */
export function ThreeCube({ active, onSideChange, children }: { active: Side; onSideChange: (side: Side) => void; children: ReactNode[] }) {
  const host = useRef<HTMLDivElement>(null);
  const target = useRef(active);
  const onChange = useRef(onSideChange);
  const wake = useRef<(() => void) | null>(null);
  const controls = useRef<{ zoom: (factor: number) => void; reset: () => void } | null>(null);
  const [faces, setFaces] = useState<HTMLDivElement[]>([]);
  useEffect(() => { target.current = active; wake.current?.(); }, [active]);
  useEffect(() => { onChange.current = onSideChange; }, [onSideChange]);

  useEffect(() => {
    if (!host.current) return;
    const container = host.current;
    let frame: number | null = null;
    let hasSize = false;
    let htmlDirty = true;
    let glowDirty = true;
    let disposed = false;
    let previous = performance.now();
    function invalidate() {
      if (!disposed && hasSize && !document.hidden && frame === null) {
        previous = performance.now();
        frame = requestAnimationFrame(animate);
      }
    }
    wake.current = invalidate;
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(38, 1, 1, 10000);
    const group = new THREE.Group();
    scene.add(group);
    const html = new CSS3DRenderer();
    html.domElement.className = "three-html";
    container.appendChild(html.domElement);
    // One composited object moves all six faces; their local transforms never change.
    const cubeElement = document.createElement("div");
    cubeElement.className = "three-cube";
    group.add(new CSS3DObject(cubeElement));
    const faceTransforms: Record<Side, string> = {
      front: "rotateY(0deg)", right: "rotateY(90deg)", back: "rotateY(180deg)",
      left: "rotateY(-90deg)", top: "rotateX(90deg)", bottom: "rotateX(-90deg)",
    };
    const elements = sides.map((side) => {
      const element = document.createElement("div");
      element.className = "three-face";
      element.dataset.side = side;
      element.style.width = "640px";
      element.style.height = "640px";
      element.style.transform = faceTransforms[side] + " translateZ(321px)";
      cubeElement.appendChild(element);
      return element;
    });
    setFaces(elements);

    let renderer: THREE.WebGLRenderer | undefined;
    let orb: THREE.Mesh<THREE.PlaneGeometry, THREE.ShaderMaterial> | undefined;
    // HTML remains usable on devices where WebGL is unavailable.
    try {
      renderer = new THREE.WebGLRenderer({ alpha: true, antialias: false, powerPreference: "low-power" });
      renderer.domElement.className = "three-canvas";
      renderer.domElement.setAttribute("aria-hidden", "true");
      container.prepend(renderer.domElement);
      const uniforms = {
        upper: { value: new THREE.Color(glowColors[target.current][0]) },
        lower: { value: new THREE.Color(glowColors[target.current][1]) },
      };
      orb = new THREE.Mesh(new THREE.PlaneGeometry(1200, 1200), new THREE.ShaderMaterial({
        uniforms, transparent: true, depthWrite: false, depthTest: false,
        vertexShader: `varying vec2 vUv;
          void main() { vUv = uv; gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); }`,
        fragmentShader: `uniform vec3 upper; uniform vec3 lower; varying vec2 vUv;
          void main() {
            vec2 p = (vUv - 0.5) * 2.0;
            float radius = length(p);
            float diffusion = exp(-4.8 * radius * radius) * (1.0 - smoothstep(0.65, 1.0, radius));
            vec3 colour = mix(lower, upper, smoothstep(0.2, 0.8, vUv.y));
            gl_FragColor = vec4(colour, diffusion * 0.95);
            #include <colorspace_fragment>
          }`,
      }));
      orb.renderOrder = 2;
      scene.add(orb);
      container.dataset.webgl = "true";
    } catch { /* CSS3D uses the same real perspective camera without WebGL. */ }

    const resize = () => {
      const { width, height } = container.getBoundingClientRect();
      hasSize = width > 0 && height > 0;
      if (!hasSize) return;
      camera.aspect = width / height;
      camera.position.set(650, 500, 320 + 490 / (Math.tan(THREE.MathUtils.degToRad(19)) * Math.min(camera.aspect, 1)));
      camera.lookAt(0, 0, 0);
      camera.updateProjectionMatrix();
      html.setSize(width, height);
      // The canvas only draws a diffuse glow. Text and glass remain full-resolution DOM.
      renderer?.setPixelRatio(Math.min(window.devicePixelRatio, 1.25, Math.sqrt(1_500_000 / (width * height))));
      renderer?.setSize(width, height);
      htmlDirty = glowDirty = true;
      invalidate();
    };
    const observer = new ResizeObserver(resize);
    observer.observe(container);
    resize();
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const desired = new THREE.Quaternion();
    const euler = new THREE.Euler();
    const normal = new THREE.Vector3();
    const viewDirection = new THREE.Vector3();
    const upperColour = new THREE.Color();
    const lowerColour = new THREE.Color();
    const zoom = (factor: number) => {
      camera.zoom = THREE.MathUtils.clamp(camera.zoom * factor, 0.6, 1.8);
      camera.updateProjectionMatrix();
      container.dataset.zoom = camera.zoom.toFixed(3);
      htmlDirty = glowDirty = true;
      invalidate();
    };
    controls.current = { zoom, reset: () => { group.position.set(0, 0, 0); camera.zoom = 1; zoom(1); } };
    zoom(1);
    const wheel = (event: WheelEvent) => {
      // Long sections can still scroll; pinch/Control-wheel always zooms.
      if (!event.ctrlKey && event.target instanceof Element) {
        const scrollArea = event.target.closest(".skill-container, .projects-face, .experience-container");
        if (scrollArea && scrollArea.scrollHeight > scrollArea.clientHeight + 1) return;
      }
      event.preventDefault();
      const pixels = event.deltaY * (event.deltaMode === 1 ? 16 : event.deltaMode === 2 ? container.clientHeight : 1);
      zoom(Math.exp(-THREE.MathUtils.clamp(pixels, -200, 200) * 0.002));
    };
    const touches = new Map<number, { x: number; y: number }>();
    let gesture: { distance: number; x: number; y: number } | undefined;
    const touchPair = () => {
      const [first, second] = [...touches.values()];
      if (!first || !second) return undefined;
      return { distance: Math.max(1, Math.hypot(second.x - first.x, second.y - first.y)), x: (first.x + second.x) / 2, y: (first.y + second.y) / 2 };
    };
    const pan = (dx: number, dy: number) => {
      group.position.x = THREE.MathUtils.clamp(group.position.x + dx * 1.4 / camera.zoom, -400, 400);
      group.position.y = THREE.MathUtils.clamp(group.position.y - dy * 1.4 / camera.zoom, -280, 280);
      htmlDirty = glowDirty = true;
      invalidate();
    };
    const turn = new THREE.Quaternion();
    const turnEuler = new THREE.Euler();
    let pointer: { id: number; x: number; y: number; startX: number; startY: number; pan: boolean; moved: boolean } | undefined;
    const nearestSide = () => {
      viewDirection.copy(camera.position).sub(group.position).normalize();
      let best: Side = target.current;
      let score = -Infinity;
      for (const side of sides) {
        normal.set(0, 0, 1).applyEuler(euler.set(...rotations[side])).applyQuaternion(group.quaternion);
        const facing = normal.dot(viewDirection);
        if (facing > score) { score = facing; best = side; }
      }
      return best;
    };
    const down = (event: PointerEvent) => {
      if (![0, 1, 2].includes(event.button) || !(event.target instanceof Element)) return;
      if (event.target.closest("a, button, input, select, textarea, [role=button]")) return;
      if (event.pointerType === "touch") {
        touches.set(event.pointerId, { x: event.clientX, y: event.clientY });
        gesture = touchPair();
      }
      container.setPointerCapture(event.pointerId);
      if (pointer) return;
      pointer = { id: event.pointerId, x: event.clientX, y: event.clientY, startX: event.clientX, startY: event.clientY, pan: event.shiftKey || event.button !== 0, moved: false };
      if (event.button !== 0) event.preventDefault();
    };
    const move = (event: PointerEvent) => {
      if (touches.has(event.pointerId)) {
        touches.set(event.pointerId, { x: event.clientX, y: event.clientY });
        const next = touchPair();
        if (next && gesture) {
          zoom(next.distance / gesture.distance);
          pan(next.x - gesture.x, next.y - gesture.y);
          gesture = next;
          if (pointer) pointer.moved = true;
          container.classList.add("is-dragging");
          event.preventDefault();
          return;
        }
      }
      if (!pointer || pointer.id !== event.pointerId) return;
      if (!pointer.moved && Math.hypot(event.clientX - pointer.startX, event.clientY - pointer.startY) < 5) return;
      pointer.moved = true;
      container.setPointerCapture(event.pointerId);
      container.classList.add("is-dragging");
      const dx = event.clientX - pointer.x;
      const dy = event.clientY - pointer.y;
      if (pointer.pan) {
        pan(dx, dy);
      } else {
        turn.setFromEuler(turnEuler.set(dy * 0.008, dx * 0.008, 0));
        group.quaternion.premultiply(turn).normalize();
        target.current = nearestSide();
        htmlDirty = true;
        invalidate();
      }
      pointer.x = event.clientX;
      pointer.y = event.clientY;
      event.preventDefault();
    };
    const up = (event: PointerEvent) => {
      if (!pointer || (pointer.id !== event.pointerId && !touches.has(event.pointerId))) return;
      const moved = pointer.moved;
      const captured = new Set([...touches.keys(), pointer.id, event.pointerId]);
      pointer = undefined;
      touches.clear();
      gesture = undefined;
      container.classList.remove("is-dragging");
      for (const id of captured) if (container.hasPointerCapture(id)) container.releasePointerCapture(id);
      if (moved) {
        target.current = nearestSide();
        onChange.current(target.current);
      }
      invalidate();
    };
    container.addEventListener("pointerdown", down);
    container.addEventListener("pointermove", move);
    container.addEventListener("pointerup", up);
    container.addEventListener("pointercancel", up);
    container.addEventListener("lostpointercapture", up);
    container.addEventListener("wheel", wheel, { passive: false });
    const contextMenu = (event: Event) => { event.preventDefault(); };
    container.addEventListener("contextmenu", contextMenu);
    let renderedSide: Side | undefined;
    const colourSettled = (a: THREE.Color, b: THREE.Color) => Math.max(Math.abs(a.r - b.r), Math.abs(a.g - b.g), Math.abs(a.b - b.b)) < 0.0005;
    function animate(now: number) {
      frame = null;
      if (disposed || !hasSize || document.hidden) return;
      const delta = Math.min(Math.max((now - previous) / 1000, 1 / 120), 0.05);
      previous = now;
      let settling = false;
      euler.set(...rotations[target.current]);
      desired.setFromEuler(euler).invert();
      if (!pointer?.moved && group.quaternion.angleTo(desired) > 0.00001) {
        group.quaternion.slerp(desired, reducedMotion.matches ? 1 : 1 - Math.exp(-9 * delta));
        if (group.quaternion.angleTo(desired) < 0.00001) group.quaternion.copy(desired);
        else settling = true;
        htmlDirty = true;
      }
      if (renderedSide !== target.current) {
        renderedSide = target.current;
        container.dataset.activeSide = renderedSide;
        elements.forEach((element, index) => {
          const selected = sides[index] === renderedSide;
          element.inert = !selected;
          element.setAttribute("aria-hidden", String(!selected));
          element.style.pointerEvents = selected ? "auto" : "none";
        });
      }
      if (orb) {
        upperColour.set(glowColors[target.current][0]);
        lowerColour.set(glowColors[target.current][1]);
        const uniforms = orb.material.uniforms as { upper: { value: THREE.Color }; lower: { value: THREE.Color } };
        if (!colourSettled(uniforms.upper.value, upperColour) || !colourSettled(uniforms.lower.value, lowerColour)) {
          const blend = reducedMotion.matches ? 1 : 1 - Math.exp(-5 * delta);
          uniforms.upper.value.lerp(upperColour, blend);
          uniforms.lower.value.lerp(lowerColour, blend);
          if (colourSettled(uniforms.upper.value, upperColour) && colourSettled(uniforms.lower.value, lowerColour)) {
            uniforms.upper.value.copy(upperColour);
            uniforms.lower.value.copy(lowerColour);
          } else settling = true;
          glowDirty = true;
        }
        if (glowDirty) {
          orb.position.copy(group.position);
          orb.quaternion.copy(camera.quaternion);
          renderer?.render(scene, camera);
          glowDirty = false;
        }
      }
      if (htmlDirty) {
        html.render(scene, camera);
        htmlDirty = false;
      }
      if (settling) frame = requestAnimationFrame(animate);
    }
    const visibility = () => {
      if (document.hidden) {
        if (frame !== null) cancelAnimationFrame(frame);
        frame = null;
      } else { htmlDirty = glowDirty = true; invalidate(); }
    };
    document.addEventListener("visibilitychange", visibility);
    invalidate();
    return () => {
      disposed = true;
      if (frame !== null) cancelAnimationFrame(frame);
      observer.disconnect();
      document.removeEventListener("visibilitychange", visibility);
      wake.current = null;
      container.removeEventListener("pointerdown", down);
      container.removeEventListener("pointermove", move);
      container.removeEventListener("pointerup", up);
      container.removeEventListener("pointercancel", up);
      container.removeEventListener("lostpointercapture", up);
      container.removeEventListener("wheel", wheel);
      container.removeEventListener("contextmenu", contextMenu);
      controls.current = null;
      scene.traverse((object) => {
        if (object instanceof THREE.Mesh) {
          object.geometry.dispose();
          const materials = Array.isArray(object.material) ? object.material : [object.material];
          materials.forEach((material: THREE.Material) => material.dispose());
        }
      });
      renderer?.dispose();
      renderer?.domElement.remove();
      html.domElement.remove();
      delete container.dataset.webgl;
    };
  }, []);

  return <div ref={host} className="three-stage" aria-label="Interactive portfolio cube" aria-describedby="cube-instructions">
    <div className="cube-glow-fallback" aria-hidden="true" />
    {faces.map((face, i) => createPortal(children[i], face, sides[i]))}
    <div className="cube-controls" role="group" aria-label="Cube view">
      <button type="button" aria-label="Zoom out" onClick={() => controls.current?.zoom(1 / 1.15)}>−</button>
      <button type="button" aria-label="Zoom in" onClick={() => controls.current?.zoom(1.15)}>+</button>
      <button type="button" onClick={() => controls.current?.reset()}>Reset view</button>
    </div>
    <p id="cube-instructions" className="cube-instructions">Drag to turn · Right-drag to pan · Scroll to zoom<br />Touch: two fingers to pan and pinch to zoom</p>
  </div>;
}
