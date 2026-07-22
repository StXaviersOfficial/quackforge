"use client";

import { motion } from "framer-motion";

/**
 * SVG chip diagram with 4 circuit lines extending outward to labels.
 * - Top: Dedicated Backend
 * - Right: Premium Frontend
 * - Bottom: SEO & Search Dominance
 * - Left: Growth & Advertising
 * Animated dashed lines (stroke-dashoffset), staggered per side.
 */
export function ChipDiagram() {
  return (
    <div className="relative aspect-square w-full max-w-[480px] mx-auto">
      <svg
        viewBox="0 0 500 500"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full"
        aria-hidden
      >
        <defs>
          <linearGradient id="chip-fill" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#142B53" />
            <stop offset="100%" stopColor="#0F2147" />
          </linearGradient>
          <linearGradient id="trace-stroke" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#22D3EE" />
            <stop offset="100%" stopColor="#3B82F6" />
          </linearGradient>
          <radialGradient id="chip-glow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="rgba(34,211,238,0.35)" />
            <stop offset="70%" stopColor="rgba(34,211,238,0.05)" />
            <stop offset="100%" stopColor="rgba(34,211,238,0)" />
          </radialGradient>
        </defs>

        {/* Center glow */}
        <circle cx="250" cy="250" r="200" fill="url(#chip-glow)" />

        {/* 4 lines extending outward from chip edges */}
        {/* Top line: chip top → label at y=20 */}
        <line
          x1="250" y1="170" x2="250" y2="40"
          stroke="url(#trace-stroke)"
          strokeWidth="2"
          className="trace-line"
        />
        {/* Right line: chip right → label at x=480 */}
        <line
          x1="330" y1="250" x2="460" y2="250"
          stroke="url(#trace-stroke)"
          strokeWidth="2"
          className="trace-line trace-line-2"
        />
        {/* Bottom line: chip bottom → label at y=480 */}
        <line
          x1="250" y1="330" x2="250" y2="460"
          stroke="url(#trace-stroke)"
          strokeWidth="2"
          className="trace-line trace-line-3"
        />
        {/* Left line: chip left → label at x=20 */}
        <line
          x1="170" y1="250" x2="40" y2="250"
          stroke="url(#trace-stroke)"
          strokeWidth="2"
          className="trace-line trace-line-4"
        />

        {/* Chip body (square with rounded corners) */}
        <rect
          x="170" y="170" width="160" height="160" rx="14"
          fill="url(#chip-fill)"
          stroke="rgba(34,211,238,0.5)"
          strokeWidth="1.5"
        />
        {/* Inner die */}
        <rect
          x="195" y="195" width="110" height="110" rx="6"
          fill="none"
          stroke="rgba(34,211,238,0.35)"
          strokeWidth="1"
          strokeDasharray="2 2"
        />

        {/* Circuit traces inside the chip */}
        <g stroke="rgba(34,211,238,0.55)" strokeWidth="1" fill="none">
          <path d="M 210 215 L 230 215 L 230 235 L 250 235" />
          <path d="M 290 215 L 270 215 L 270 235 L 250 235" />
          <path d="M 210 285 L 230 285 L 230 265 L 250 265" />
          <path d="M 290 285 L 270 285 L 270 265 L 250 265" />
          <circle cx="250" cy="250" r="4" fill="rgba(34,211,238,0.9)" stroke="none" />
        </g>

        {/* Chip pins (legs on each side) */}
        <g fill="rgba(34,211,238,0.6)">
          {[200, 220, 240, 260, 280, 300].map((y) => (
            <rect key={`pin-top-${y}`} x="247" y={y - 8} width="6" height="6" />
          ))}
          {[200, 220, 240, 260, 280, 300].map((x) => (
            <rect key={`pin-right-${x}`} x={x - 3} y="247" width="6" height="6" />
          ))}
        </g>

        {/* Node dots at line endpoints (where line meets label) */}
        <circle cx="250" cy="40" r="5" fill="#22D3EE" />
        <circle cx="460" cy="250" r="5" fill="#22D3EE" />
        <circle cx="250" cy="460" r="5" fill="#22D3EE" />
        <circle cx="40" cy="250" r="5" fill="#22D3EE" />

        {/* Traveling dots along each line */}
        <motion.circle
          r="4" fill="#67E8F9"
          initial={{ cy: 170 }}
          animate={{ cy: [170, 40] }}
          transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut", delay: 0 }}
          style={{ cx: 250 }}
        />
        <motion.circle
          r="4" fill="#67E8F9"
          initial={{ cx: 330 }}
          animate={{ cx: [330, 460] }}
          transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut", delay: 0.6 }}
          style={{ cy: 250 }}
        />
        <motion.circle
          r="4" fill="#67E8F9"
          initial={{ cy: 330 }}
          animate={{ cy: [330, 460] }}
          transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut", delay: 1.2 }}
          style={{ cx: 250 }}
        />
        <motion.circle
          r="4" fill="#67E8F9"
          initial={{ cx: 170 }}
          animate={{ cx: [170, 40] }}
          transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut", delay: 1.8 }}
          style={{ cy: 250 }}
        />

        {/* Labels */}
        <text x="250" y="22" textAnchor="middle" className="fill-cyan-100"
          style={{ fontFamily: "var(--font-mono)", fontSize: "13px", letterSpacing: "0.08em", textTransform: "uppercase" }}>
          Dedicated Backend
        </text>
        <text x="480" y="245" textAnchor="end" className="fill-cyan-100"
          style={{ fontFamily: "var(--font-mono)", fontSize: "13px", letterSpacing: "0.08em", textTransform: "uppercase" }}>
          Premium
        </text>
        <text x="480" y="262" textAnchor="end" className="fill-cyan-100"
          style={{ fontFamily: "var(--font-mono)", fontSize: "13px", letterSpacing: "0.08em", textTransform: "uppercase" }}>
          Frontend
        </text>
        <text x="250" y="487" textAnchor="middle" className="fill-cyan-100"
          style={{ fontFamily: "var(--font-mono)", fontSize: "13px", letterSpacing: "0.08em", textTransform: "uppercase" }}>
          SEO &amp; Search Dominance
        </text>
        <text x="20" y="245" textAnchor="start" className="fill-cyan-100"
          style={{ fontFamily: "var(--font-mono)", fontSize: "13px", letterSpacing: "0.08em", textTransform: "uppercase" }}>
          Growth &amp;
        </text>
        <text x="20" y="262" textAnchor="start" className="fill-cyan-100"
          style={{ fontFamily: "var(--font-mono)", fontSize: "13px", letterSpacing: "0.08em", textTransform: "uppercase" }}>
          Advertising
        </text>
      </svg>
    </div>
  );
}
