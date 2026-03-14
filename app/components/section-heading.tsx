type SectionHeadingProps = {
  eyebrow: string;
  title: string;
  description: string;
};

export function SectionHeading({
  eyebrow,
  title,
  description,
}: SectionHeadingProps) {
  return (
    <div className="max-w-3xl">
      <p className="text-xs font-semibold uppercase tracking-[0.26em] text-ink-2">
        {eyebrow}
      </p>
      <h2 className="mt-4 text-balance font-display text-4xl leading-tight text-ink-1 sm:text-5xl">
        {title}
      </h2>
      <p className="mt-6 max-w-2xl text-pretty text-base leading-7 text-ink-2 sm:text-lg">
        {description}
      </p>
    </div>
  );
}
