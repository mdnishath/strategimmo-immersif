"use client";
/* eslint-disable react-hooks/immutability, react-hooks/purity -- objets three.js mutables, hors état React */

import { Suspense, useMemo, useRef, useState, type MutableRefObject } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useTexture } from "@react-three/drei";
import * as THREE from "three";
import { agencies, toMap, MAP_H, type Agency } from "@/config/brand";

/** Carte réelle de la Normandie (tuiles OpenStreetMap, version nuit) en 3D, 11 repères, caméra qui plane vers l'agence choisie. */
const OVERVIEW_POS = new THREE.Vector3(0, 118, 56);
const OVERVIEW_LOOK = new THREE.Vector3(0, 0, -2);
/** dans la vue d'ensemble, on n'étiquette pas les agences du centre de Rouen (trop serrées) */
const CLUSTERED = new Set(["siege", "unovia"]);
type LabelRefs = MutableRefObject<Record<string, HTMLDivElement | null>>;

function MapPlane({ mobile }: { mobile: boolean }) {
  const tex = useTexture(mobile ? "/map/normandy-dark-1k.jpg" : "/map/normandy-dark.jpg") as THREE.Texture;
  tex.colorSpace = THREE.SRGBColorSpace;
  tex.anisotropy = 8;
  return (
    <group>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.01, 0]} receiveShadow>
        <planeGeometry args={[100, MAP_H]} />
        <meshBasicMaterial map={tex} toneMapped={false} />
      </mesh>
      <mesh position={[0, -0.65, 0]}>
        <boxGeometry args={[100.4, 1.2, MAP_H + 0.4]} />
        <meshStandardMaterial color="#1a1715" roughness={0.9} />
      </mesh>
    </group>
  );
}

function Pin({ a, selected, onSelect }: { a: Agency; selected: boolean; onSelect: (a: Agency) => void }) {
  const [x, z] = useMemo(() => toMap(a.lat, a.lng), [a]);
  const g = useRef<THREE.Group>(null);
  const [hover, setHover] = useState(false);
  useFrame((state, dt) => {
    if (!g.current) return;
    const s = selected ? 1.5 : hover ? 1.25 : 1;
    g.current.scale.setScalar(THREE.MathUtils.damp(g.current.scale.x, s, 8, dt));
    g.current.position.y = selected ? Math.sin(state.clock.elapsedTime * 3) * 0.12 : 0;
  });
  const on = selected || hover;
  return (
    <group position={[x, 0, z]}>
      <group ref={g} onClick={(e) => { e.stopPropagation(); onSelect(a); }} onPointerOver={(e) => { e.stopPropagation(); setHover(true); document.body.style.cursor = "pointer"; }} onPointerOut={() => { setHover(false); document.body.style.cursor = ""; }}>
        <mesh position={[0, 0.9, 0]}><cylinderGeometry args={[0.06, 0.06, 1.8, 8]} /><meshStandardMaterial color="#f3ede2" roughness={0.6} /></mesh>
        <mesh position={[0, 2.0, 0]} castShadow><sphereGeometry args={[0.62, 24, 24]} /><meshStandardMaterial color={on ? "#e8672a" : "#f3ede2"} emissive={on ? "#e8672a" : "#000"} emissiveIntensity={0.6} roughness={0.35} metalness={0.2} /></mesh>
        <mesh position={[0, 0.03, 0]} rotation={[-Math.PI / 2, 0, 0]}><ringGeometry args={[0.7, 1.05, 40]} /><meshBasicMaterial color="#e8672a" transparent opacity={selected ? 0.9 : 0.5} toneMapped={false} /></mesh>
        <mesh position={[0, 1.4, 0]} visible={false}><sphereGeometry args={[1.7, 8, 8]} /><meshBasicMaterial /></mesh>
      </group>
    </group>
  );
}

function LabelProjector({ labels, selected, mobile }: { labels: LabelRefs; selected: Agency | null; mobile: boolean }) {
  const { camera, size } = useThree();
  const v = useMemo(() => new THREE.Vector3(), []);
  useFrame(() => {
    for (const a of agencies) {
      const el = labels.current[a.id];
      if (!el) continue;
      const show = selected ? selected.id === a.id : !mobile && !CLUSTERED.has(a.id);
      if (!show) { el.style.opacity = "0"; continue; }
      const [x, z] = toMap(a.lat, a.lng);
      v.set(x, 2.9, z).project(camera);
      el.style.transform = `translate(-50%, -100%) translate(${(v.x * 0.5 + 0.5) * size.width}px, ${(-v.y * 0.5 + 0.5) * size.height}px)`;
      el.style.opacity = v.z < 1 ? "1" : "0";
    }
  });
  return null;
}

function Rig({ selected, mobile }: { selected: Agency | null; mobile: boolean }) {
  const { camera } = useThree();
  const look = useRef(OVERVIEW_LOOK.clone());
  const target = useRef(OVERVIEW_POS.clone());
  const lookTarget = useRef(OVERVIEW_LOOK.clone());
  useFrame((_, dtRaw) => {
    const dt = Math.min(dtRaw, 0.05);
    if (selected) {
      const [x, z] = toMap(selected.lat, selected.lng);
      target.current.set(x + (mobile ? 0 : 5), mobile ? 30 : 22, z + (mobile ? 26 : 20));
      lookTarget.current.set(x, 0.5, z - 1);
    } else {
      target.current.set(OVERVIEW_POS.x, mobile ? 150 : 118, mobile ? 64 : 56);
      lookTarget.current.copy(OVERVIEW_LOOK);
    }
    const k = 1 - Math.exp(-dt * 3.2);
    camera.position.lerp(target.current, k);
    look.current.lerp(lookTarget.current, k);
    camera.lookAt(look.current);
  });
  return null;
}

export default function MapScene({ selected, onSelect, mobile = false }: { selected: Agency | null; onSelect: (a: Agency | null) => void; mobile?: boolean }) {
  const labels = useRef<Record<string, HTMLDivElement | null>>({});
  return (
    <div className="absolute inset-0">
      <Canvas dpr={[1, mobile ? 1.5 : 2]} shadows={!mobile} gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }} camera={{ fov: 40, near: 1, far: 500, position: OVERVIEW_POS.toArray() }} style={{ background: "transparent" }} onPointerMissed={() => onSelect(null)}>
        <ambientLight intensity={1.0} />
        <directionalLight position={[-40, 70, 30]} intensity={1.4} color="#ffe9d2" castShadow={!mobile} shadow-mapSize={[1024, 1024]} shadow-camera-left={-60} shadow-camera-right={60} shadow-camera-top={60} shadow-camera-bottom={-60} />
        <Suspense fallback={null}><MapPlane mobile={mobile} /></Suspense>
        {agencies.map((a) => (<Pin key={a.id} a={a} selected={selected?.id === a.id} onSelect={onSelect} />))}
        <LabelProjector labels={labels} selected={selected} mobile={mobile} />
        <Rig selected={selected} mobile={mobile} />
      </Canvas>
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        {agencies.map((a) => (
          <div key={a.id} ref={(el) => { labels.current[a.id] = el; }} className={`absolute left-0 top-0 whitespace-nowrap rounded-full px-2.5 py-0.5 text-[9.5px] font-semibold tracking-[0.12em] transition-opacity duration-200 ${selected?.id === a.id ? "bg-copper text-white" : "glass text-ivory"}`} style={{ opacity: 0, willChange: "transform" }}>
            {a.name.toUpperCase()}
          </div>
        ))}
      </div>
    </div>
  );
}
