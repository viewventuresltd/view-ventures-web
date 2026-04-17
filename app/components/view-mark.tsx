type ViewMarkProps = { size?: number; stroke?: string; accent?: string; strokeWidth?: number; className?: string; };
export function ViewMark({ size = 56, stroke = "#FFFFFF", accent = "#C49A2E", strokeWidth = 3.8, className }: ViewMarkProps) {
  return (
    <svg className={className} width={size} height={Math.round(size * 0.55)} viewBox="0 0 260 165" fill="none" aria-hidden="true">
      <text x="8" y="125" fontFamily="Georgia, serif" fontWeight="700" fontSize="120" fill={stroke}>{"V"}</text>
      <line x1="134" y1="18" x2="134" y2="90" stroke={stroke} strokeWidth="1.3" opacity="0.3"/>
      <line x1="134" y1="90" x2="134" y2="118" stroke={accent} strokeWidth="1.3"/>
      <text x="142" y="125" fontFamily="Georgia, serif" fontWeight="700" fontSize="120" fill={stroke}>{"V"}</text>
    </svg>
  );
}