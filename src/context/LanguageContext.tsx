"use client";

import {
  createContext,
  useContext,
  useMemo,
  useState,
  ReactNode,
} from "react";

type Language = "en" | "zh";

type LanguageContextValue = {
  language: Language;
  toggleLanguage: () => void;
};

const LanguageContext = createContext<LanguageContextValue | undefined>(
  undefined,
);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>("en");

  const value = useMemo(
    () => ({
      language,
      toggleLanguage: () => setLanguage((prev) => (prev === "en" ? "zh" : "en")),
    }),
    [language],
  );

  return (
    <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>
  );
}

export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return ctx;
}
