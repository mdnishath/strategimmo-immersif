"use client";
/* eslint-disable react-hooks/immutability, react-hooks/purity -- objets three.js mutables, hors état React */

import { Suspense, useMemo, useRef, type MutableRefObject } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useTexture } from "@react-three/drei";
import * as THREE from "three";

export type Shot = { src: string; aspect: number };

/**
 * Visite cinématique : les photos réelles du bien sont posées en profondeur,
 * la caméra avance au rythme du scroll et « traverse » chaque photo pour
 * entrer dans la suivante. Tout ce qui est visible est une vraie photographie.
 */
const D = 6; // espacement entre deux photos (unités monde)
const START = D * 2.2; // distance caméra → 1re photo au départ (la photo remplit l'écran)
const END = D * 1.5; // distance caméra → dernière photo à l'arrivée
const COVER = D * 2.35; // distance pour laquelle le plan couvre l'écran

function coverUV(tex: THREE.Texture, imgAspect: number, planeAspect: number) {
  // recadrage « object-fit: cover » via repeat/offset de la texture
  if (imgAspect > planeAspect) {
    const r = planeAspect / imgAspect;
    tex.repeat.set(r, 1);
    tex.offset.set((1 - r) / 2, 0);
  } else {
    const r = imgAspect / planeAspect;
    tex.repeat.set(1, r);
    tex.offset.set(0, (1 - r) / 2);
  }
  tex.needsUpdate = true;
}

function Photo({ shot, index, camZ, planeSize }: { shot: Shot; index: number; camZ: MutableRefObject<number>; planeSize: [number, number] }) {
  const tex = useTexture(shot.src) as THREE.Texture;
  const mat = useRef<THREE.MeshBasicMaterial>(null);
  const mesh = useRef<THREE.Mesh>(null);
  const [w, h] = planeSize;

  useMemo(() => {
    tex.colorSpace = THREE.SRGBColorSpace;
    tex.anisotropy = 8;
    tex.wrapS = tex.wrapT = THREE.ClampToEdgeWrapping;
    coverUV(tex, shot.aspect, w / h);
  }, [tex, shot.aspect, w, h]);

  const z = -index * D;

  useFrame((state, dt) => {
    const m = mat.current;
    const g = mesh.current;
    if (!m || !g) return;
    const ahead = camZ.current - z; // distance devant la caméra (> 0 = devant)
    // opaque tant qu'elle est « devant », fondu quand on la traverse (entre 1.15 D et 0.95 D)
    let o = 1;
    if (ahead > D * 3.2) o = THREE.MathUtils.clamp(1 - (ahead - D * 3.2) / (D * 0.8), 0, 1);
    if (ahead < D * 1.15) o = THREE.MathUtils.clamp((ahead - D * 0.95) / (D * 0.2), 0, 1);
    // les photos lointaines s'assombrissent (profondeur)
    const dim = THREE.MathUtils.clamp(1 - (ahead - D * 2.2) / (D * 1.2), 0.3, 1);
    m.opacity = THREE.MathUtils.damp(m.opacity, o, 12, dt);
    m.color.setScalar(THREE.MathUtils.damp(m.color.r, dim, 8, dt));
    g.visible = m.opacity > 0.01;
    // parallaxe subtile à la souris, plus marquée sur la photo proche
    const near = THREE.MathUtils.clamp(1 - (ahead - D) / (D * 1.3), 0, 1);
    g.rotation.y = THREE.MathUtils.damp(g.rotation.y, -state.pointer.x * 0.04 * (0.4 + near), 6, dt);
    g.rotation.x = THREE.MathUtils.damp(g.rotation.x, state.pointer.y * 0.03 * (0.4 + near), 6, dt);
  });

  return (
    <mesh ref={mesh} position={[0, 0, z]} renderOrder={-index}>
      <planeGeometry args={[w, h]} />
      <meshBasicMaterial ref={mat} map={tex} transparent opacity={0} depthWrite={false} toneMapped={false} />
    </mesh>
  );
}

function Rig({ progress, count, camZ }: { progress: MutableRefObject<number>; count: number; camZ: MutableRefObject<number> }) {
  const { camera } = useThree();
  const startZ = START; // la première photo remplit l'écran au départ
  const endZ = -(count - 1) * D + END; // ... la dernière, légèrement zoomée, à l'arrivée
  useFrame((state, dtRaw) => {
    const dt = Math.min(dtRaw, 0.05);
    const p = THREE.MathUtils.clamp(progress.current, 0, 1);
    const target = startZ + (endZ - startZ) * p;
    camZ.current = THREE.MathUtils.damp(camZ.current, target, 6, dt);
    camera.position.set(state.pointer.x * 0.12, state.pointer.y * 0.08, camZ.current);
    camera.lookAt(state.pointer.x * 0.06, state.pointer.y * 0.04, camZ.current - 10);
  });
  return null;
}

export default function Walkthrough({ shots, progress, mobile = false }: { shots: Shot[]; progress: MutableRefObject<number>; mobile?: boolean }) {
  const camZ = useRef(START);
  const fov = mobile ? 62 : 48;
  return (
    <Canvas dpr={[1, mobile ? 1.5 : 2]} gl={{ antialias: true, alpha: false, powerPreference: "high-performance" }} camera={{ fov, near: 0.1, far: 80, position: [0, 0, START] }} style={{ background: "#0b0a09" }}>
      <color attach="background" args={["#0b0a09"]} />
      <Suspense fallback={null}>
        <Scene shots={shots} camZ={camZ} fov={fov} />
      </Suspense>
      <Rig progress={progress} count={shots.length} camZ={camZ} />
    </Canvas>
  );
}

function Scene({ shots, camZ, fov }: { shots: Shot[]; camZ: MutableRefObject<number>; fov: number }) {
  const { size } = useThree();
  const planeSize = useMemo<[number, number]>(() => {
    // taille pour couvrir l'écran à la distance COVER (+ marge pour la parallaxe)
    const h = 2 * COVER * Math.tan((fov * Math.PI) / 360) * 1.08;
    const w = h * (size.width / size.height);
    return [w, h];
  }, [fov, size.width, size.height]);
  return (
    <>
      {shots.map((s, i) => (
        <Photo key={s.src} shot={s} index={i} camZ={camZ} planeSize={planeSize} />
      ))}
    </>
  );
}
