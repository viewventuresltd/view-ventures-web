"use client";

import { createContext, useCallback, useContext, useEffect, useSyncExternalStore, type ReactNode } from "react";

export type Lang = "en" | "el";

export const languages: { code: Lang; label: string; short: string }[] = [
  { code: "en", label: "English", short: "EN" },
  { code: "el", label: "Ελληνικά", short: "ΕΛ" },
];

// Strings for the shared chrome (header, footer, booking). Page content is English for now.
const dictionary = {
  en: {
    about: "About",
    verticals: "Verticals",
    transportation: "Transportation",
    news: "News",
    contact: "Contact",
    book: "Book a bus",
    language: "Language",
    menu: "Menu",
    close: "Close",
    company: "Company",
    rights: "All rights reserved.",
  },
  el: {
    about: "Σχετικά",
    verticals: "Τομείς",
    transportation: "Μεταφορές",
    news: "Νέα",
    contact: "Επικοινωνία",
    book: "Κράτηση λεωφορείου",
    language: "Γλώσσα",
    menu: "Μενού",
    close: "Κλείσιμο",
    company: "Εταιρεία",
    rights: "Με την επιφύλαξη παντός δικαιώματος.",
  },
} as const;

type Key = keyof (typeof dictionary)["en"];

type LanguageContextValue = { lang: Lang; setLang: (lang: Lang) => void; t: (key: Key) => string };

const LanguageContext = createContext<LanguageContextValue | null>(null);

const STORAGE_KEY = "vv-lang";

// The saved choice lives in localStorage, with an in-memory fallback when storage is blocked.
let memoryLang: Lang = "en";
const listeners = new Set<() => void>();

function subscribe(listener: () => void) {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

function getSnapshot(): Lang {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved === "en" || saved === "el") return saved;
  } catch {}
  return memoryLang;
}

export function LanguageProvider({ children }: { children: ReactNode }) {
  const lang = useSyncExternalStore(subscribe, getSnapshot, () => "en" as Lang);

  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  const setLang = useCallback((next: Lang) => {
    memoryLang = next;
    try {
      localStorage.setItem(STORAGE_KEY, next);
    } catch {}
    listeners.forEach((l) => l());
  }, []);

  const t = useCallback((key: Key) => dictionary[lang][key], [lang]);

  return <LanguageContext.Provider value={{ lang, setLang, t }}>{children}</LanguageContext.Provider>;
}

export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useLanguage must be used inside LanguageProvider");
  return ctx;
}
