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

/** HTML faces share a camera and world coordinates with the WebGL body. */
export function ThreeCube({ active, onSideChange, children }: { active: Side; onSideChange: (side: Side) => void; children: ReactNode[] }) {
  const host = useRef<HTMLDivElement>(null);
  const target = useRef(active);
  const onChange = useRef(onSideChange);
  const controls = useRef<{ zoom: (factor: number) => void; reset: () => void } | null>(null);
  const [faces, setFaces] = useState<HTMLDivElement[]>([]);
  useEffect(() => { target.current = active; }, [active]);
  useEffect(() => { onChange.current = onSideChange; }, [onSideChange]);

  useEffect(() => {
    if (!host.current) return;
    const container = host.current;
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(38, 1, 1, 10000);
    const group = new THREE.Group();
    scene.add(group);
    const html = new CSS3DRenderer();
    html.domElement.className = "three-html";
    container.appendChild(html.domElement);
    const elements = sides.map((side) => {
      const element = document.createElement("div");
      element.className = "three-face";
      element.dataset.side = side;
      element.style.width = "640px";
      element.style.height = "640px";
      const object = new CSS3DObject(element);
      object.rotation.set(...rotations[side]);
      object.position.set(0, 0, 321).applyEuler(object.rotation);
      group.add(object);
      return element;
    });
    setFaces(elements);

    let renderer: THREE.WebGLRenderer | undefined;
    let body: THREE.Mesh | undefined;
    let floor: THREE.Mesh | undefined;
    let orb: THREE.Mesh<THREE.PlaneGeometry, THREE.ShaderMaterial> | undefined;
    // HTML remains usable on devices where WebGL is unavailable.
    try {
      renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      renderer.shadowMap.enabled = true;
      renderer.shadowMap.type = THREE.PCFShadowMap;
      renderer.domElement.className = "three-canvas";
      renderer.domElement.setAttribute("aria-hidden", "true");
      container.prepend(renderer.domElement);
      body = new THREE.Mesh(new THREE.BoxGeometry(640, 640, 640), new THREE.MeshPhysicalMaterial({ color: 0xffffff, transparent: true, opacity: 0.035, roughness: 0.25, depthWrite: false }));
      scene.add(body);
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
      floor = new THREE.Mesh(new THREE.PlaneGeometry(6000, 6000), new THREE.ShadowMaterial({ opacity: 0.04 }));
      floor.rotation.x = -Math.PI / 2;
      floor.position.y = -470;
      floor.receiveShadow = true;
      scene.add(floor);
      scene.add(new THREE.HemisphereLight(0xffffff, 0x64748b, 3));
      const light = new THREE.DirectionalLight(0xffffff, 4);
      light.position.set(-700, 1400, 1100);
      light.castShadow = true;
      light.shadow.camera.left = light.shadow.camera.bottom = -1200;
      light.shadow.camera.right = light.shadow.camera.top = 1200;
      light.shadow.camera.far = 5000;
      light.shadow.mapSize.set(1024, 1024);
      scene.add(light);
      container.dataset.webgl = "true";
    } catch { /* CSS3D uses the same real perspective camera without WebGL. */ }

    const resize = () => {
      const { width, height } = container.getBoundingClientRect();
      if (!width || !height) return;
      camera.aspect = width / height;
      camera.position.set(650, 500, 320 + 490 / (Math.tan(THREE.MathUtils.degToRad(19)) * Math.min(camera.aspect, 1)));
      camera.lookAt(0, 0, 0);
      camera.updateProjectionMatrix();
      html.setSize(width, height);
      renderer?.setSize(width, height);
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
    };
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
        const turn = new THREE.Quaternion().setFromEuler(new THREE.Euler(dy * 0.008, dx * 0.008, 0));
        group.quaternion.premultiply(turn).normalize();
        target.current = nearestSide();
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
    };
    container.addEventListener("pointerdown", down);
    container.addEventListener("pointermove", move);
    container.addEventListener("pointerup", up);
    container.addEventListener("pointercancel", up);
    container.addEventListener("lostpointercapture", up);
    container.addEventListener("wheel", wheel, { passive: false });
    const contextMenu = (event: Event) => { event.preventDefault(); };
    container.addEventListener("contextmenu", contextMenu);
    let frame = 0;
    let previous = performance.now();
    const animate = (now: number) => {
      const delta = Math.min((now - previous) / 1000, 0.1);
      previous = now;
      euler.set(...rotations[target.current]);
      desired.setFromEuler(euler).invert();
      if (!pointer?.moved) group.quaternion.slerp(desired, reducedMotion.matches ? 1 : 1 - Math.exp(-7 * delta));
      body?.quaternion.copy(group.quaternion);
      body?.position.copy(group.position);
      container.dataset.activeSide = target.current;
      if (orb) {
        orb.position.copy(group.position);
        orb.quaternion.copy(camera.quaternion);
        upperColour.set(glowColors[target.current][0]);
        lowerColour.set(glowColors[target.current][1]);
        const uniforms = orb.material.uniforms as { upper: { value: THREE.Color }; lower: { value: THREE.Color } };
        const blend = reducedMotion.matches ? 1 : 1 - Math.exp(-3 * delta);
        uniforms.upper.value.lerp(upperColour, blend);
        uniforms.lower.value.lerp(lowerColour, blend);
      }
      elements.forEach((element, index) => {
        const selected = sides[index] === target.current;
        element.inert = !selected;
        element.setAttribute("aria-hidden", String(!selected));
        element.style.pointerEvents = selected ? "auto" : "none";
      });
      renderer?.render(scene, camera);
      html.render(scene, camera);
      frame = requestAnimationFrame(animate);
    };
    frame = requestAnimationFrame(animate);
    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
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
