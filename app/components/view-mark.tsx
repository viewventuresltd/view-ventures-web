type ViewMarkProps = {
  size?: number;
  stroke?: string;
  accent?: string;
  strokeWidth?: number;
  className?: string;
};

export function ViewMark({
  size = 56,
  stroke = "white",
  accent = "#C49A2E",
  strokeWidth = 3.8,
  className,
}: ViewMarkProps) {
  return (
    <svg
      className={className}
      width={size}
      height={size}
      viewBox="0 0 140 140"
      fill="none"
      aria-hidden="true"
    >
      <line
        x1="14"
        y1="18"
        x2="70"
        y2="118"
        stroke={stroke}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
      />
      <line
        x1="126"
        y1="18"
        x2="93"
        y2="72"
        stroke={stroke}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
      />
      <line
        x1="84"
        y1="87"
        x2="70"
        y2="118"
        stroke={stroke}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
      />
      <line
        x1="93"
        y1="72"
        x2="84"
        y2="87"
        stroke={accent}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
      />
    </svg>
  );
}
