import { V_GLYPH } from "../components/view-mark";

// Square app icon used for the favicon and Apple touch icon.
export function BrandIcon({ size, radius }: { size: number; radius: number }) {
  return (
    <div
      style={{
        width: size,
        height: size,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "#0B0F19",
        borderRadius: radius,
      }}
    >
      <svg width={size * 0.86} height={size * 0.86} viewBox="0 20 260 125">
        <path transform="translate(8 125)" d={V_GLYPH} fill="#FFFFFF" />
        <rect x="131" y="70" width="6" height="48" fill="#C49A2E" />
        <path transform="translate(142 125)" d={V_GLYPH} fill="#FFFFFF" />
      </svg>
    </div>
  );
}
