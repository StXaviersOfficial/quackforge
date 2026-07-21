"use client";

/**
 * Realistic CPU using actual rendered image + animated SVG power rays.
 * - Real CPU image (public/cpu-real.jpg) with cyan glow + float animation
 * - SVG layer with 4 wavy power rays to labels (no dots, real curved lines)
 * - Animated current flow along each ray (staggered)
 */
const LABELS = {
  top: "Dedicated Backend",
  right: "Premium Frontend",
  bottom: "SEO & Search Dominance",
  left: "Growth & Advertising",
};

export function CpuDiagram() {
  return (
    <div className="cpu-scene">
      {/* SVG rays + labels layer (behind the image) */}
      <svg
        viewBox="0 0 500 500"
        className="cpu-rays"
        fill="none"
        aria-hidden
      >
        <defs>
          <linearGradient id="power-gradient" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#22D3EE" />
            <stop offset="50%" stopColor="#67E8F9" />
            <stop offset="100%" stopColor="#0E7490" />
          </linearGradient>
          <radialGradient id="chip-aura" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="rgba(34,211,238,0.45)" />
            <stop offset="70%" stopColor="rgba(34,211,238,0.10)" />
            <stop offset="100%" stopColor="rgba(34,211,238,0)" />
          </radialGradient>
        </defs>

        {/* Aura behind chip */}
        <circle cx="250" cy="250" r="200" fill="url(#chip-aura)" />

        {/* 4 wavy power strings from chip edges to label endpoints */}
        {/* Top: chip top → label at y=20 */}
        <path
          d="M 250 155 Q 230 100 250 35"
          className="power-string animated"
        />
        {/* Right: chip right → label at x=480 */}
        <path
          d="M 345 250 Q 410 230 470 250"
          className="power-string animated"
          style={{ animationDelay: "0.4s" }}
        />
        {/* Bottom: chip bottom → label at y=485 */}
        <path
          d="M 250 345 Q 270 410 250 470"
          className="power-string animated"
          style={{ animationDelay: "0.8s" }}
        />
        {/* Left: chip left → label at x=20 */}
        <path
          d="M 155 250 Q 90 270 30 250"
          className="power-string animated"
          style={{ animationDelay: "1.2s" }}
        />

        {/* Node circles at each label endpoint */}
        <circle cx="250" cy="35" r="5" fill="#22D3EE" className="power-node" />
        <circle cx="470" cy="250" r="5" fill="#22D3EE" className="power-node" style={{ animationDelay: "0.4s" }} />
        <circle cx="250" cy="470" r="5" fill="#22D3EE" className="power-node" style={{ animationDelay: "0.8s" }} />
        <circle cx="30" cy="250" r="5" fill="#22D3EE" className="power-node" style={{ animationDelay: "1.2s" }} />

        {/* Labels */}
        <text x="250" y="22" textAnchor="middle" fill="#A5F3FC"
          style={{ fontFamily: "var(--font-mono)", fontSize: "13px", letterSpacing: "0.10em", textTransform: "uppercase", fontWeight: 700 }}>
          {LABELS.top}
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
          {LABELS.bottom}
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

      {/* Real CPU image */}
      <div className="cpu-img-wrap">
        <img
          src="/cpu-real.jpg"
          alt="3D rendered CPU chip with golden pins"
          className="cpu-img"
          draggable={false}
        />
        <div className="cpu-img-overlay" />
      </div>
    </div>
  );
}
