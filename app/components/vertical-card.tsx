"use client";

import { motion, useReducedMotion } from "framer-motion";

type VerticalCardProps = {
  title: string;
  summary: string;
  index: number;
};

export function VerticalCard({ title, summary, index }: VerticalCardProps) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.article
      initial={reduceMotion ? false : { opacity: 0, y: 18 }}
      whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
      whileHover={reduceMotion ? undefined : { y: -3 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{
        duration: 0.6,
        ease: [0.22, 1, 0.36, 1],
        delay: reduceMotion ? 0 : index * 0.06,
      }}
      className="rounded-2xl border border-line/70 bg-[rgba(255,255,255,0.82)] p-6 backdrop-blur-md"
    >
      <p className="text-xs font-semibold uppercase tracking-[0.23em] text-ink-2">
        Vertical {String(index + 1).padStart(2, "0")}
      </p>
      <h3 className="mt-4 text-xl font-semibold tracking-tight text-ink-1">
        {title}
      </h3>
      <p className="mt-3 text-sm leading-7 text-ink-2">{summary}</p>
    </motion.article>
  );
}
