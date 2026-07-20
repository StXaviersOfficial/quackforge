"use client";

import { motion } from "framer-motion";

/**
 * 3D realistic CPU chip with 4 power strings extending to labels.
 * - Multi-layer chip body (top, die, bottom) with translateZ for 3D depth
 * - Gold pins on all 4 sides
 * - Wavy SVG "power strings" connecting chip → labels (no dots, real lines)
 * - Animated current flow along each string (staggered)
 */
const LABELS = {
  top: "Dedicated Backend",
  right: "Premium Frontend",
  bottom: "SEO & Search Dominance",
  left: "Growth & Advertising",
};

export function CpuDiagram() {
  return (
    <div className="cpu-scene relative w-full aspect-square max-w-[520px] mx-auto py-8">
      {/* Power strings + labels SVG layer */}
      <svg
        viewBox="0 0 500 500"
        className="absolute inset-0 w-full h-full pointer-events-none"
        fill="none"
        aria-hidden
      >
        <defs>
          <linearGradient id="power-gradient" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#22D3EE" />
            <stop offset="50%" stopColor="#67E8F9" />
            <stop offset="100%" stopColor="#3B82F6" />
          </linearGradient>
          <radialGradient id="chip-aura" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="rgba(34,211,238,0.35)" />
            <stop offset="70%" stopColor="rgba(34,211,238,0.08)" />
            <stop offset="100%" stopColor="rgba(34,211,238,0)" />
          </radialGradient>
        </defs>

        {/* Aura behind chip */}
        <circle cx="250" cy="250" r="180" fill="url(#chip-aura)" />

        {/* 4 wavy power strings from chip edges to label endpoints */}
        {/* Top: chip top edge → label at y=20 */}
        <path
          d="M 250 165 Q 230 100 250 35"
          className="power-string animated"
        />
        {/* Right: chip right edge → label at x=480 */}
        <path
          d="M 335 250 Q 410 230 470 250"
          className="power-string animated"
          style={{ animationDelay: "0.4s" }}
        />
        {/* Bottom: chip bottom edge → label at y=485 */}
        <path
          d="M 250 335 Q 270 410 250 470"
          className="power-string animated"
          style={{ animationDelay: "0.8s" }}
        />
        {/* Left: chip left edge → label at x=20 */}
        <path
          d="M 165 250 Q 90 270 30 250"
          className="power-string animated"
          style={{ animationDelay: "1.2s" }}
        />

        {/* Node circles at each label endpoint */}
        <circle cx="250" cy="35" r="5" fill="#22D3EE" className="power-node" />
        <circle cx="470" cy="250" r="5" fill="#22D3EE" className="power-node" style={{ animationDelay: "0.4s" }} />
        <circle cx="250" cy="470" r="5" fill="#22D3EE" className="power-node" style={{ animationDelay: "0.8s" }} />
        <circle cx="30" cy="250" r="5" fill="#22D3EE" className="power-node" style={{ animationDelay: "1.2s" }} />

        {/* Labels */}
        <text x="250" y="22" textAnchor="middle" fill="#67E8F9"
          style={{ fontFamily: "var(--font-mono)", fontSize: "13px", letterSpacing: "0.10em", textTransform: "uppercase", fontWeight: 600 }}>
          {LABELS.top}
        </text>
        <text x="490" y="246" textAnchor="end" fill="#67E8F9"
          style={{ fontFamily: "var(--font-mono)", fontSize: "13px", letterSpacing: "0.10em", textTransform: "uppercase", fontWeight: 600 }}>
          Premium
        </text>
        <text x="490" y="262" textAnchor="end" fill="#67E8F9"
          style={{ fontFamily: "var(--font-mono)", fontSize: "13px", letterSpacing: "0.10em", textTransform: "uppercase", fontWeight: 600 }}>
          Frontend
        </text>
        <text x="250" y="492" textAnchor="middle" fill="#67E8F9"
          style={{ fontFamily: "var(--font-mono)", fontSize: "13px", letterSpacing: "0.10em", textTransform: "uppercase", fontWeight: 600 }}>
          {LABELS.bottom}
        </text>
        <text x="10" y="246" textAnchor="start" fill="#67E8F9"
          style={{ fontFamily: "var(--font-mono)", fontSize: "13px", letterSpacing: "0.10em", textTransform: "uppercase", fontWeight: 600 }}>
          Growth &amp;
        </text>
        <text x="10" y="262" textAnchor="start" fill="#67E8F9"
          style={{ fontFamily: "var(--font-mono)", fontSize: "13px", letterSpacing: "0.10em", textTransform: "uppercase", fontWeight: 600 }}>
          Advertising
        </text>
      </svg>

      {/* 3D CPU chip */}
      <div className="cpu-chip absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[170px] h-[170px]">
        <div className="cpu-body relative w-full h-full">
          {/* Bottom layer (depth) */}
          <div className="cpu-layer-bottom" />

          {/* Top layer */}
          <div className="cpu-layer-top">
            <div className="cpu-die" />
          </div>

          {/* Gold pins on all 4 sides */}
          {Array.from({ length: 6 }).map((_, i) => (
            <div
              key={`pin-top-${i}`}
              className="cpu-pin"
              style={{
                top: `-10px`,
                left: `${30 + i * 20}px`,
                width: `4px`,
                height: `14px`,
                transform: `translateZ(15px)`,
              }}
            />
          ))}
          {Array.from({ length: 6 }).map((_, i) => (
            <div
              key={`pin-bottom-${i}`}
              className="cpu-pin"
              style={{
                bottom: `-10px`,
                left: `${30 + i * 20}px`,
                width: `4px`,
                height: `14px`,
                transform: `translateZ(15px)`,
              }}
            />
          ))}
          {Array.from({ length: 6 }).map((_, i) => (
            <div
              key={`pin-left-${i}`}
              className="cpu-pin"
              style={{
                left: `-10px`,
                top: `${30 + i * 20}px`,
                width: `14px`,
                height: `4px`,
                transform: `translateZ(15px)`,
              }}
            />
          ))}
          {Array.from({ length: 6 }).map((_, i) => (
            <div
              key={`pin-right-${i}`}
              className="cpu-pin"
              style={{
                right: `-10px`,
                top: `${30 + i * 20}px`,
                width: `14px`,
                height: `4px`,
                transform: `translateZ(15px)`,
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
