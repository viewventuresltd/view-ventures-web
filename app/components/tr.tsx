"use client";

import type { ReactNode } from "react";
import { useLanguage } from "../lib/i18n";

// Inline bilingual text for server-rendered pages: <Tr en="About" el="Σχετικά" />.
export function Tr({ en, el }: { en: ReactNode; el: ReactNode }) {
  const { lang } = useLanguage();
  return <>{lang === "el" ? el : en}</>;
}
