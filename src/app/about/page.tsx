// app/about/page.tsx
export default function AboutPage() {
  return (
    <div className="about-page">
      <header className="about-header">
        <h1 className="about-title">About me</h1>
      </header>

      <section className="about-section">
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

      <section className="about-section about-section--facts">
        <h2 className="about-facts-title">Quick facts</h2>
        <ul className="about-facts-list">
          <li>Location: Sydney, Australia</li>
          <li>Degree: Bachelor of Advanced Computing (2026 expected)</li>
          <li>Interests: Photography, hiking, fitness, reading, singing</li>
        </ul>
      </section>
    </div>
  );
}
