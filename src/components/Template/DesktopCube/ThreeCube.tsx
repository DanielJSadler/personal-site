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

/** HTML faces share a camera and world coordinates with the WebGL body. */
export function ThreeCube({ active, children }: { active: Side; children: ReactNode[] }) {
  const host = useRef<HTMLDivElement>(null);
  const target = useRef(active);
  const [faces, setFaces] = useState<HTMLDivElement[]>([]);
  useEffect(() => { target.current = active; }, [active]);

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
    // HTML remains usable on devices where WebGL is unavailable.
    try {
      renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      renderer.shadowMap.enabled = true;
      renderer.shadowMap.type = THREE.PCFSoftShadowMap;
      renderer.domElement.className = "three-canvas";
      renderer.domElement.setAttribute("aria-hidden", "true");
      container.prepend(renderer.domElement);
      body = new THREE.Mesh(new THREE.BoxGeometry(640, 640, 640), new THREE.MeshStandardMaterial({ color: 0xb9c8cf, roughness: 0.7 }));
      body.castShadow = true;
      scene.add(body);
      floor = new THREE.Mesh(new THREE.PlaneGeometry(6000, 6000), new THREE.ShadowMaterial({ opacity: 0.18 }));
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
    } catch { /* CSS3D uses the same real perspective camera without WebGL. */ }

    const resize = () => {
      const { width, height } = container.getBoundingClientRect();
      if (!width || !height) return;
      camera.aspect = width / height;
      camera.position.set(70, 55, 320 + 490 / (Math.tan(THREE.MathUtils.degToRad(19)) * Math.min(camera.aspect, 1)));
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
    let frame = 0;
    let previous = performance.now();
    const animate = (now: number) => {
      const delta = Math.min((now - previous) / 1000, 0.1);
      previous = now;
      euler.set(...rotations[target.current]);
      desired.setFromEuler(euler).invert();
      group.quaternion.slerp(desired, reducedMotion.matches ? 1 : 1 - Math.exp(-7 * delta));
      body?.quaternion.copy(group.quaternion);
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
    };
  }, []);

  return <div ref={host} className="three-stage">{faces.map((face, i) => createPortal(children[i], face, sides[i]))}</div>;
}
