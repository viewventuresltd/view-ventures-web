// Georgia Bold "V" outline at 120px, baked into a path so the mark renders
// identically everywhere (favicons, devices without Georgia).
export const V_GLYPH =
  "M93.9-83.1L93.9-78.5Q91.9-78.3 90.2-77.8Q88.4-77.2 86.5-76.1L86.5-76.1Q84.0-74.6 82.6-73.0Q81.3-71.3 79.9-68.4L79.9-68.4Q78.1-64.3 74.8-56.6Q71.5-48.8 67.3-38.9L67.3-38.9Q63.6-30 59.2-19.4Q54.8-8.8 50.9 0.9L50.9 0.9L39.1 0.9Q30.9-19.2 22.4-39.9Q13.9-60.6 10.4-68.7L10.4-68.7Q9.1-71.7 7.8-73.2Q6.6-74.6 3.8-76.2L3.8-76.2Q1.8-77.3 0.3-77.8Q-1.2-78.2-3.8-78.6L-3.8-78.6L-3.8-83.1L41.3-83.1L41.3-78.7Q35.0-77.9 32.7-77.1Q30.5-76.2 30.5-74.9L30.5-74.9Q30.5-74.3 30.7-73.6Q30.9-72.8 31.3-71.6L31.3-71.6Q33.2-66.4 38.1-54.8Q43.0-43.1 52.7-19.1L52.7-19.1Q58.6-33.7 62.5-43.8Q66.4-53.8 69.4-61.6L69.4-61.6Q70.9-65.3 71.9-68.6Q72.8-71.8 72.8-73.5L72.8-73.5Q72.8-75.4 70.1-76.6Q67.4-77.9 60.2-78.5L60.2-78.5L60.2-83.1L93.9-83.1Z";

type ViewMarkProps = { size?: number; stroke?: string; accent?: string; className?: string };

export function ViewMark({ size = 56, stroke = "currentColor", accent = "var(--gold)", className }: ViewMarkProps) {
  return (
    <svg className={className} width={size} height={Math.round(size * 0.55)} viewBox="0 0 260 165" fill="none" aria-hidden="true">
      <path transform="translate(8 125)" d={V_GLYPH} fill={stroke} />
      <line x1="134" y1="18" x2="134" y2="90" stroke={stroke} strokeWidth="1.3" opacity="0.3" />
      <line x1="134" y1="90" x2="134" y2="118" stroke={accent} strokeWidth="1.3" />
      <path transform="translate(142 125)" d={V_GLYPH} fill={stroke} />
    </svg>
  );
}
