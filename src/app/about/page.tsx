// app/about/page.tsx
export default function AboutPage() {
  return (
    <div className="space-y-6">
      <header className="space-y-2">
        <h1 className="text-2xl font-semibold text-neutral-50">About me</h1>
      </header>

      <section className="space-y-3 text-sm text-neutral-300">
        <p>
          I&apos;m Harry Xu, a third-year Bachelor of Advanced Computing student
          at the University of Sydney, majoring in Software Development. I enjoy
          building end-to-end solutions that combine{" "}
          <span className="text-indigo-300">
            clean backend design, usable frontends, and practical AI features
          </span>
          .
        </p>
        <p>
          Recently, I&apos;ve been working on an AI-driven project management
          learning platform with role-based personas, an AI calendar web app
          powered by LLaMA, and a secure virtual access control system using
          Java Spring Boot.
        </p>
        <p>
          I&apos;m comfortable working with Java, Python, JavaScript/TypeScript,
          React, Node.js, PostgreSQL, and testing/CI tools like JUnit, Mockito,
          Jest, and GitHub Actions. I enjoy collaborating in agile teams and
          learning from real-world feedback.
        </p>
      </section>

      <section className="space-y-2 text-sm text-neutral-300">
        <h2 className="text-base font-semibold text-neutral-100">
          Quick facts
        </h2>
        <ul className="list-disc pl-5 space-y-1">
          <li>Location: Sydney, Australia</li>
          <li>Degree: Bachelor of Advanced Computing (2026 expected)</li>
          <li>Interests: Photography, hiking, fitness, reading, singing</li>
        </ul>
      </section>
    </div>
  );
}
