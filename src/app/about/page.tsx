"use client";

import { useLanguage } from "@/context/LanguageContext";
import { aboutCopy } from "@/data/about";

export default function AboutPage() {
  const { language } = useLanguage();
  const copy = aboutCopy[language];

  return (
    <div className="about-page">
      <header className="about-header">
        <h1 className="about-title">{copy.title}</h1>
      </header>

      <section className="about-section">
        {copy.intro.map((paragraph) => (
          <p key={paragraph}>{paragraph}</p>
        ))}
      </section>

      <section className="about-section about-section--facts">
        <h2 className="about-facts-title">{copy.factsTitle}</h2>
        <ul className="about-facts-list">
          {copy.facts.map((fact) => (
            <li key={fact}>{fact}</li>
          ))}
        </ul>
      </section>
    </div>
  );
}
