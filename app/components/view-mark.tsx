type ViewMarkProps = { size?: number; stroke?: string; accent?: string; strokeWidth?: number; className?: string; };
export function ViewMark({ size = 56, stroke = "#FFFFFF", accent = "#C49A2E", strokeWidth = 3.8, className }: ViewMarkProps) {
  return (
    <svg className={className} width={size} height={Math.round(size * 0.55)} viewBox="0 0 300 165" fill="none" aria-hidden="true">
      <text x="10" y="125" fontFamily="Georgia, serif" fontWeight="700" fontSize="130" fill={stroke}>{"V"}</text>
      <line x1="152" y1="18" x2="152" y2="92" stroke={stroke} strokeWidth="1.4" opacity="0.35"/>
      <line x1="152" y1="92" x2="152" y2="122" stroke={accent} strokeWidth="1.4"/>
      <text x="162" y="125" fontFamily="Georgia, serif" fontWeight="700" fontSize="130" fill={stroke}>{"V"}</text>
    </svg>
  );
}