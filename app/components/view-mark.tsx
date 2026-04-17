type ViewMarkProps = {
  size?: number;
  stroke?: string;
  accent?: string;
  strokeWidth?: number;
  className?: string;
};

export function ViewMark({
  size = 56,
  stroke = "#FFFFFF",
  accent = "#C49A2E",
  strokeWidth = 3.8,
  className,
}: ViewMarkProps) {
  return (
    <svg
      className={className}
      width={size}
      height={Math.round(size * 0.55)}
      viewBox="0 0 280 154"
      fill="none"
      aria-hidden="true"
    >
      {/* Left V */}
      <text
        x="18"
        y="118"
        fontFamily="Georgia, serif"
        fontWeight="700"
        fontSize="124"
        fill={stroke}
      >{"V"}</text>

      {/* Vertical divider */}
      <line
        x1="150"
        y1="16"
        x2="150"
        y2="90"
        stroke={stroke}
        strokeWidth="1.5"
        opacity="0.4"
      />
      {/* Gold accent on divider */}
      <line
        x1="150"
        y1="90"
        x2="150"
        y2="118"
        stroke={accent}
        strokeWidth="1.5"
      />

      {/* Right V */}
      <text
        x="158"
        y="118"
        fontFamily="Georgia, serif"
        fontWeight="700"
        fontSize="124"
        fill={stroke}
      >{"V"}</text>
    </svg>
  );
}
