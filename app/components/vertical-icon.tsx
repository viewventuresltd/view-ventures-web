const icons: Record<string, React.ReactNode> = {
  travel: <path d="M2.5 13.5l19-8-5 15-4.5-6.5-6.5 3 2-4.5-5-1z" />,
  transportation: (
    <>
      <rect x="4" y="3.5" width="16" height="14" rx="3" />
      <path d="M4 11h16M8 17.5V20M16 17.5V20M7.5 14.5h.01M16.5 14.5h.01" />
    </>
  ),
  "real-estate": <path d="M3.5 20.5h17M5.5 20.5V9l6.5-5 6.5 5v11.5M10 20.5v-5h4v5" />,
  wellness: <path d="M12 20.5c-5-2.5-7.5-6-7.5-10.5 3.5 0 6 1.2 7.5 3.5 1.5-2.3 4-3.5 7.5-3.5 0 4.5-2.5 8-7.5 10.5zM12 13.5V8m0 0c0-2 1-3.5 2.5-4.5M12 8c0-2-1-3.5-2.5-4.5" />,
  tech: (
    <>
      <rect x="6.5" y="6.5" width="11" height="11" rx="2" />
      <path d="M9.5 3v3.5M14.5 3v3.5M9.5 17.5V21M14.5 17.5V21M3 9.5h3.5M3 14.5h3.5M17.5 9.5H21M17.5 14.5H21" />
    </>
  ),
};

export function VerticalIcon({ slug, className }: { slug: string; className?: string }) {
  return (
    <svg viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
      {icons[slug]}
    </svg>
  );
}
