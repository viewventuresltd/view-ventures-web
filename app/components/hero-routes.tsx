"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useLanguage } from "../lib/i18n";
import { casino, transportRoutes } from "../lib/site-data";

const W = 900;
const H = 560;
const K = 190;
// Equirectangular projection; latitude stretched by 1/cos(40°) so distances look right.
const project = (lat: number, lng: number) => ({
  x: (lng - 21.9) * K + (W - 2 * K) / 2,
  y: (41.3 - lat) * K * 1.305 + 18,
});

const hub = project(casino.lat, casino.lng);

const paths = transportRoutes.map((r, i) => {
  const p = project(r.lat, r.lng);
  const dx = hub.x - p.x;
  const dy = hub.y - p.y;
  const bend = i % 2 === 0 ? 0.22 : -0.22;
  const cx = (p.x + hub.x) / 2 - dy * bend;
  const cy = (p.y + hub.y) / 2 + dx * bend;
  return { ...r, p, d: `M${p.x.toFixed(1)} ${p.y.toFixed(1)} Q${cx.toFixed(1)} ${cy.toFixed(1)} ${hub.x.toFixed(1)} ${hub.y.toFixed(1)}` };
});

export function HeroRoutes() {
  const { lang } = useLanguage();
  const reduce = useReducedMotion();

  return (
    <svg viewBox={`0 0 ${W} ${H}`} preserveAspectRatio="xMidYMid slice" className="h-[440px] w-full sm:h-auto" role="img" aria-label={lang === "el" ? "Γραμμές λεωφορείων από έξι περιοχές της Βόρειας Ελλάδας προς τη Θεσσαλονίκη" : "Bus routes from six regions of Northern Greece converging on Thessaloniki"}>
      <defs>
        <pattern id="hero-dots" width="18" height="18" patternUnits="userSpaceOnUse">
          <circle cx="1.5" cy="1.5" r="1.1" className="fill-ink-3" opacity="0.35" />
        </pattern>
        <radialGradient id="hero-fade" cx="50%" cy="50%" r="55%">
          <stop offset="0%" stopColor="#fff" stopOpacity="1" />
          <stop offset="100%" stopColor="#fff" stopOpacity="0" />
        </radialGradient>
        <mask id="hero-mask">
          <rect width={W} height={H} fill="url(#hero-fade)" />
        </mask>
      </defs>

      <rect width={W} height={H} fill="url(#hero-dots)" mask="url(#hero-mask)" />

      {paths.map((r, i) => (
        <g key={r.id}>
          <motion.path
            d={r.d}
            fill="none"
            className="stroke-navy"
            strokeWidth={1.6}
            strokeLinecap="round"
            initial={reduce ? false : { pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 0.7 }}
            transition={{ duration: 1.6, delay: 0.5 + i * 0.15, ease: [0.22, 1, 0.36, 1] }}
          />
          {!reduce && (
            <circle r="3.2" className="fill-gold" opacity="0">
              <set attributeName="opacity" to="1" begin={`${2 + i * 0.4}s`} />
              <animateMotion dur={`${4 + (i % 3)}s`} begin={`${2 + i * 0.4}s`} repeatCount="indefinite" path={r.d} />
            </circle>
          )}
          <circle cx={r.p.x} cy={r.p.y} r="5" className="fill-surface stroke-navy" strokeWidth={2} />
          <text
            x={r.p.x + (r.p.x < hub.x ? -12 : 12)}
            y={r.p.y + 4}
            textAnchor={r.p.x < hub.x ? "end" : "start"}
            className="fill-ink-2 text-[13px] font-medium"
          >
            {lang === "el" ? r.nameEl : r.name}
          </text>
        </g>
      ))}

      <g>
        {!reduce && (
          <circle cx={hub.x} cy={hub.y} r="8" className="fill-gold" opacity="0.35">
            <animate attributeName="r" values="8;26" dur="2.4s" repeatCount="indefinite" />
            <animate attributeName="opacity" values="0.35;0" dur="2.4s" repeatCount="indefinite" />
          </circle>
        )}
        <circle cx={hub.x} cy={hub.y} r="8" className="fill-gold stroke-surface" strokeWidth={3} />
        <text x={hub.x + 16} y={hub.y - 10} className="fill-ink text-[15px] font-semibold">{lang === "el" ? "Θεσσαλονίκη" : "Thessaloniki"}</text>
      </g>
    </svg>
  );
}
