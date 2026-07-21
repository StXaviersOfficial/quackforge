"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Environment, ContactShadows, Sparkles } from "@react-three/drei";
import { useRef, useMemo } from "react";
import * as THREE from "three";

/**
 * Realistic 3D CPU chip with electric signal arcs.
 * - Multi-layer chip body with realistic materials
 * - 32 gold pins on all 4 sides
 * - Circuit traces on die
 * - Cyan emissive glow
 * - Electric signal arcs (particles flowing along paths)
 */
function ChipBody() {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.3) * 0.25;
      groupRef.current.rotation.x = Math.cos(state.clock.elapsedTime * 0.2) * 0.08;
    }
  });

  // Generate pins
  const pins = useMemo(() => {
    const arr: { pos: [number, number, number]; rot: [number, number, number]; key: string }[] = [];
    const pinCount = 8;
    const spacing = 0.22;
    const start = -((pinCount - 1) * spacing) / 2;

    for (let i = 0; i < pinCount; i++) {
      arr.push({ pos: [start + i * spacing, 0.05, -0.7], rot: [Math.PI / 2, 0, 0], key: `top-${i}` });
      arr.push({ pos: [start + i * spacing, 0.05, 0.7], rot: [Math.PI / 2, 0, 0], key: `bot-${i}` });
      arr.push({ pos: [-0.7, 0.05, start + i * spacing], rot: [0, 0, Math.PI / 2], key: `left-${i}` });
      arr.push({ pos: [0.7, 0.05, start + i * spacing], rot: [0, 0, Math.PI / 2], key: `right-${i}` });
    }
    return arr;
  }, []);

  return (
    <group ref={groupRef}>
      {/* Bottom substrate (PCB) */}
      <mesh position={[0, -0.05, 0]} castShadow receiveShadow>
        <boxGeometry args={[1.6, 0.06, 1.6]} />
        <meshStandardMaterial color="#0A2818" metalness={0.3} roughness={0.7} />
      </mesh>

      {/* Chip ceramic body */}
      <mesh position={[0, 0.08, 0]} castShadow receiveShadow>
        <boxGeometry args={[1.4, 0.18, 1.4]} />
        <meshStandardMaterial color="#1A1F2E" metalness={0.5} roughness={0.4} />
      </mesh>

      {/* Heatspreader (metal lid) */}
      <mesh position={[0, 0.18, 0]} castShadow>
        <boxGeometry args={[1.2, 0.04, 1.2]} />
        <meshStandardMaterial color="#3A4250" metalness={0.95} roughness={0.15} />
      </mesh>

      {/* Die (glowing cyan silicon) */}
      <mesh position={[0, 0.22, 0]}>
        <boxGeometry args={[0.7, 0.02, 0.7]} />
        <meshStandardMaterial
          color="#071E24"
          emissive="#22D3EE"
          emissiveIntensity={0.7}
          metalness={0.4}
          roughness={0.3}
        />
      </mesh>

      {/* Circuit traces on die — horizontal */}
      {Array.from({ length: 6 }).map((_, i) => (
        <mesh key={`trace-h-${i}`} position={[0, 0.235, -0.25 + i * 0.1]}>
          <boxGeometry args={[0.6, 0.005, 0.015]} />
          <meshStandardMaterial color="#22D3EE" emissive="#22D3EE" emissiveIntensity={2.5} toneMapped={false} />
        </mesh>
      ))}
      {/* Circuit traces on die — vertical */}
      {Array.from({ length: 6 }).map((_, i) => (
        <mesh key={`trace-v-${i}`} position={[-0.25 + i * 0.1, 0.235, 0]}>
          <boxGeometry args={[0.015, 0.005, 0.6]} />
          <meshStandardMaterial color="#22D3EE" emissive="#22D3EE" emissiveIntensity={2.5} toneMapped={false} />
        </mesh>
      ))}

      {/* Center glow sphere */}
      <mesh position={[0, 0.24, 0]}>
        <sphereGeometry args={[0.08, 16, 16]} />
        <meshStandardMaterial
          color="#67E8F9"
          emissive="#22D3EE"
          emissiveIntensity={4}
          toneMapped={false}
        />
      </mesh>

      {/* Gold pins */}
      {pins.map((pin) => (
        <mesh
          key={pin.key}
          position={pin.pos}
          rotation={pin.rot}
          castShadow
        >
          <cylinderGeometry args={[0.018, 0.018, 0.18, 8]} />
          <meshStandardMaterial
            color="#D4AF37"
            metalness={1}
            roughness={0.2}
            emissive="#8B6F1F"
            emissiveIntensity={0.2}
          />
        </mesh>
      ))}

      {/* Corner accent triangles (Nvidia-style) */}
      {[
        { pos: [0.55, 0.21, 0.55], rot: [0, Math.PI / 4, 0] },
        { pos: [-0.55, 0.21, 0.55], rot: [0, -Math.PI / 4, 0] },
        { pos: [0.55, 0.21, -0.55], rot: [0, (3 * Math.PI) / 4, 0] },
        { pos: [-0.55, 0.21, -0.55], rot: [0, -(3 * Math.PI) / 4, 0] },
      ].map((c, i) => (
        <mesh key={`corner-${i}`} position={c.pos as [number, number, number]} rotation={c.rot as [number, number, number]}>
          <boxGeometry args={[0.08, 0.005, 0.08]} />
          <meshStandardMaterial color="#22D3EE" emissive="#22D3EE" emissiveIntensity={2} toneMapped={false} />
        </mesh>
      ))}

      {/* Electric signal particles — sparkles around the chip */}
      <Sparkles
        count={40}
        scale={3}
        size={3}
        speed={0.6}
        opacity={0.8}
        color="#22D3EE"
      />
    </group>
  );
}

export function CpuDiagram3D() {
  return (
    <div className="relative w-full aspect-square max-w-[560px] mx-auto">
      {/* SVG rays + electric arcs + labels layer */}
      <svg
        viewBox="0 0 500 500"
        className="absolute inset-0 w-full h-full pointer-events-none z-10"
        fill="none"
        aria-hidden
      >
        <defs>
          <linearGradient id="power-gradient-3d" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#22D3EE" />
            <stop offset="50%" stopColor="#67E8F9" />
            <stop offset="100%" stopColor="#0E7490" />
          </linearGradient>
          <filter id="glow-filter">
            <feGaussianBlur stdDeviation="2.5" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* 4 wavy power strings with glow filter */}
        <g filter="url(#glow-filter)">
          <path d="M 250 155 Q 230 100 250 35" className="power-string animated" />
          <path d="M 345 250 Q 410 230 470 250" className="power-string animated" style={{ animationDelay: "0.4s" }} />
          <path d="M 250 345 Q 270 410 250 470" className="power-string animated" style={{ animationDelay: "0.8s" }} />
          <path d="M 155 250 Q 90 270 30 250" className="power-string animated" style={{ animationDelay: "1.2s" }} />
        </g>

        {/* Electric arc endpoints (glowing nodes) */}
        <circle cx="250" cy="35" r="6" fill="#22D3EE" className="power-node" filter="url(#glow-filter)" />
        <circle cx="470" cy="250" r="6" fill="#22D3EE" className="power-node" style={{ animationDelay: "0.4s" }} filter="url(#glow-filter)" />
        <circle cx="250" cy="470" r="6" fill="#22D3EE" className="power-node" style={{ animationDelay: "0.8s" }} filter="url(#glow-filter)" />
        <circle cx="30" cy="250" r="6" fill="#22D3EE" className="power-node" style={{ animationDelay: "1.2s" }} filter="url(#glow-filter)" />

        {/* Labels */}
        <text x="250" y="22" textAnchor="middle" fill="#A5F3FC"
          style={{ fontFamily: "var(--font-mono)", fontSize: "13px", letterSpacing: "0.10em", textTransform: "uppercase", fontWeight: 700 }}>
          Dedicated Backend
        </text>
        <text x="490" y="246" textAnchor="end" fill="#A5F3FC"
          style={{ fontFamily: "var(--font-mono)", fontSize: "13px", letterSpacing: "0.10em", textTransform: "uppercase", fontWeight: 700 }}>
          Premium
        </text>
        <text x="490" y="262" textAnchor="end" fill="#A5F3FC"
          style={{ fontFamily: "var(--font-mono)", fontSize: "13px", letterSpacing: "0.10em", textTransform: "uppercase", fontWeight: 700 }}>
          Frontend
        </text>
        <text x="250" y="492" textAnchor="middle" fill="#A5F3FC"
          style={{ fontFamily: "var(--font-mono)", fontSize: "13px", letterSpacing: "0.10em", textTransform: "uppercase", fontWeight: 700 }}>
          SEO &amp; Search Dominance
        </text>
        <text x="10" y="246" textAnchor="start" fill="#A5F3FC"
          style={{ fontFamily: "var(--font-mono)", fontSize: "13px", letterSpacing: "0.10em", textTransform: "uppercase", fontWeight: 700 }}>
          Growth &amp;
        </text>
        <text x="10" y="262" textAnchor="start" fill="#A5F3FC"
          style={{ fontFamily: "var(--font-mono)", fontSize: "13px", letterSpacing: "0.10em", textTransform: "uppercase", fontWeight: 700 }}>
          Advertising
        </text>
      </svg>

      {/* 3D Canvas */}
      <Canvas
        camera={{ position: [2.2, 1.8, 2.2], fov: 38 }}
        shadows
        dpr={[1, 2]}
        gl={{ antialias: true, alpha: true }}
        style={{ background: "transparent" }}
      >
        <ambientLight intensity={0.4} />
        <directionalLight
          position={[5, 8, 5]}
          intensity={1.5}
          castShadow
          shadow-mapSize={[1024, 1024]}
        />
        <pointLight position={[-5, 3, -5]} intensity={1.2} color="#22D3EE" />
        <pointLight position={[3, -2, 3]} intensity={0.8} color="#0E7490" />
        <spotLight
          position={[0, 6, 0]}
          angle={0.5}
          penumbra={1}
          intensity={1.2}
          color="#67E8F9"
        />

        <Float speed={2} rotationIntensity={0.3} floatIntensity={0.4}>
          <ChipBody />
        </Float>

        <ContactShadows
          position={[0, -1.5, 0]}
          opacity={0.5}
          scale={6}
          blur={2.5}
          far={4}
          color="#22D3EE"
        />

        <Environment preset="city" />
      </Canvas>
    </div>
  );
}
