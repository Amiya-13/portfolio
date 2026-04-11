"use client";
import { useEffect, useRef } from "react";
import { resumeData } from "@/data/resume";

const skillIcons: Record<string, string> = {
  "Java": "☕",
  "HTML": "🔶",
  "CSS": "🎨",
  "JavaScript": "⚡",
  "TypeScript": "🔷",
  "React.js": "⚛️",
  "Express.js": "🚀",
  "Node.js": "💚",
  "FastAPI": "🐍",
  "Tailwind CSS": "💨",
  "MySQL": "🐬",
  "PostgreSQL": "🐘",
  "MongoDB": "🍃",
  "Git": "🌿",
  "GitHub": "🐙",
  "Postman": "📮",
  "PowerBI": "📊",
  "Excel": "📗",
};

function useRevealSection() {
  const ref = useRef<HTMLElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const children = el.querySelectorAll(".reveal-up");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            (entry.target as HTMLElement).classList.add("visible");
          }
        });
      },
      { threshold: 0.1 }
    );
    children.forEach((child, i) => {
      (child as HTMLElement).style.transitionDelay = `${i * 0.1}s`;
      observer.observe(child);
    });
    return () => observer.disconnect();
  }, []);
  return ref;
}

const categoryColors: Record<string, string> = {
  "Languages": "var(--accent)",
  "Frameworks": "var(--accent-2)",
  "Databases": "var(--accent-3)",
  "Tools": "#f7c55c",
};

export default function SkillsSection() {
  const sectionRef = useRevealSection();

  return (
    <section
      id="skills"
      ref={sectionRef as React.RefObject<HTMLElement>}
      style={{
        padding: "7rem 0",
        position: "relative",
        background: "linear-gradient(to bottom, transparent, rgba(108,99,255,0.02), transparent)",
      }}
    >
      <div className="section-container">
        <div className="reveal-up" style={{ textAlign: "center", marginBottom: "4rem" }}>
          <p className="section-label" style={{ textAlign: "center" }}>Tech Stack</p>
          <h2
            style={{
              fontSize: "clamp(2rem, 4vw, 3.2rem)",
              fontWeight: 800,
              marginBottom: "1rem",
            }}
          >
            Tools I <span className="gradient-text">build with</span>
          </h2>
          <p style={{ color: "var(--text-secondary)", fontSize: "1.05rem", maxWidth: "500px", margin: "0 auto" }}>
            A curated set of technologies I use to turn ideas into production-ready products.
          </p>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
          {Object.entries(resumeData.skills).map(([category, skills]) => (
            <div key={category} className="reveal-up glass-card" style={{ padding: "2rem" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "1.5rem" }}>
                <div
                  style={{
                    width: "4px",
                    height: "20px",
                    borderRadius: "2px",
                    background: categoryColors[category] ?? "var(--accent)",
                  }}
                />
                <h3
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: "0.8rem",
                    letterSpacing: "0.15em",
                    color: categoryColors[category] ?? "var(--accent)",
                  }}
                >
                  {category.toUpperCase()}
                </h3>
              </div>

              <div style={{ display: "flex", flexWrap: "wrap", gap: "0.65rem" }}>
                {skills.map((skill) => (
                  <span
                    key={skill}
                    className="skill-tag"
                    style={{
                      borderColor: `${categoryColors[category] ?? "var(--accent)"}30`,
                      color: categoryColors[category] ?? "var(--accent-light)",
                    }}
                  >
                    {skillIcons[skill] && (
                      <span style={{ marginRight: "0.35rem", fontSize: "0.85em" }}>
                        {skillIcons[skill]}
                      </span>
                    )}
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Proficiency bars for key skills */}
        <div className="reveal-up glass-card" style={{ padding: "2rem", marginTop: "2rem" }}>
          <h3
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "0.8rem",
              letterSpacing: "0.15em",
              color: "var(--text-muted)",
              marginBottom: "1.75rem",
            }}
          >
            CORE PROFICIENCY
          </h3>
          <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
            {[
              { name: "React.js", level: 88 },
              { name: "Node.js / Express", level: 82 },
              { name: "JavaScript / TypeScript", level: 85 },
              { name: "MongoDB / PostgreSQL", level: 75 },
              { name: "Java", level: 78 },
            ].map((skill) => (
              <div key={skill.name}>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    marginBottom: "0.5rem",
                  }}
                >
                  <span style={{ fontSize: "0.9rem", color: "var(--text-primary)" }}>{skill.name}</span>
                  <span style={{ fontSize: "0.8rem", color: "var(--text-muted)", fontFamily: "var(--font-mono)" }}>
                    {skill.level}%
                  </span>
                </div>
                <div
                  style={{
                    height: "5px",
                    background: "rgba(255,255,255,0.05)",
                    borderRadius: "3px",
                    overflow: "hidden",
                  }}
                >
                  <div
                    style={{
                      height: "100%",
                      width: `${skill.level}%`,
                      background: "linear-gradient(90deg, var(--accent), var(--accent-2))",
                      borderRadius: "3px",
                      transition: "width 1.5s cubic-bezier(0.16, 1, 0.3, 1)",
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
