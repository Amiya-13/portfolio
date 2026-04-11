"use client";
import { useEffect, useRef, useState } from "react";
import { resumeData } from "@/data/resume";

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
      (child as HTMLElement).style.transitionDelay = `${i * 0.12}s`;
      observer.observe(child);
    });
    return () => observer.disconnect();
  }, []);
  return ref;
}

export default function ProjectsSection() {
  const sectionRef = useRevealSection();
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);

  const projectColors = [
    { primary: "var(--accent)", secondary: "rgba(108,99,255,0.08)" },
    { primary: "var(--accent-2)", secondary: "rgba(255,101,132,0.08)" },
  ];

  return (
    <section
      id="projects"
      ref={sectionRef as React.RefObject<HTMLElement>}
      style={{
        padding: "7rem 0",
        position: "relative",
        background: "linear-gradient(to bottom, transparent, rgba(108,99,255,0.02), transparent)",
      }}
    >
      {/* Glow */}
      <div
        style={{
          position: "absolute",
          bottom: "20%",
          right: "-150px",
          width: "500px",
          height: "500px",
          background: "radial-gradient(circle, rgba(67,233,123,0.04) 0%, transparent 70%)",
          pointerEvents: "none",
        }}
      />

      <div className="section-container">
        <div className="reveal-up" style={{ marginBottom: "4rem" }}>
          <p className="section-label">Portfolio</p>
          <h2 style={{ fontSize: "clamp(2rem, 4vw, 3.2rem)", fontWeight: 800 }}>
            Things I've{" "}
            <span className="gradient-text-green">shipped</span>
          </h2>
          <p
            style={{
              color: "var(--text-secondary)",
              fontSize: "1.05rem",
              maxWidth: "500px",
              marginTop: "1rem",
              lineHeight: 1.7,
            }}
          >
            A selection of projects that pushed my skills and solved real problems.
          </p>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
          {resumeData.projects.map((project, idx) => {
            const colors = projectColors[idx % projectColors.length];
            const isHovered = hoveredCard === project.name;

            return (
              <div
                key={project.name}
                className="reveal-up glass-card shine-card"
                onMouseEnter={() => setHoveredCard(project.name)}
                onMouseLeave={() => setHoveredCard(null)}
                style={{
                  padding: "2.25rem",
                  display: "grid",
                  gridTemplateColumns: "1fr auto",
                  gap: "2rem",
                  position: "relative",
                  overflow: "hidden",
                  boxShadow: isHovered ? `0 0 50px ${colors.secondary}` : "none",
                  borderColor: isHovered ? `${colors.primary}30` : "var(--border)",
                }}
                data-cursor-hover
              >
                {/* Background Number */}
                <div
                  style={{
                    position: "absolute",
                    top: "50%",
                    right: "2rem",
                    transform: "translateY(-50%)",
                    fontFamily: "var(--font-display)",
                    fontSize: "8rem",
                    fontWeight: 900,
                    color: colors.secondary,
                    letterSpacing: "-0.05em",
                    userSelect: "none",
                    transition: "color 0.3s ease",
                    pointerEvents: "none",
                  }}
                >
                  {String(idx + 1).padStart(2, "0")}
                </div>

                <div style={{ position: "relative", zIndex: 1 }}>
                  {/* Header */}
                  <div style={{ marginBottom: "1.25rem" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "0.4rem" }}>
                      <h3
                        style={{
                          fontSize: "1.5rem",
                          fontWeight: 800,
                          fontFamily: "var(--font-display)",
                          color: isHovered ? colors.primary : "var(--text-primary)",
                          transition: "color 0.3s ease",
                        }}
                      >
                        {project.name}
                      </h3>
                      <a
                        href={project.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{
                          width: "28px",
                          height: "28px",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          borderRadius: "50%",
                          border: `1px solid ${colors.primary}40`,
                          color: colors.primary,
                          transition: "background 0.3s ease",
                          flexShrink: 0,
                        }}
                        aria-label={`View ${project.name} on GitHub`}
                      >
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
                          <polyline points="15 3 21 3 21 9"/>
                          <line x1="10" y1="14" x2="21" y2="3"/>
                        </svg>
                      </a>
                    </div>
                    <p style={{ fontSize: "0.85rem", color: colors.primary, fontFamily: "var(--font-mono)" }}>
                      {project.subtitle}
                    </p>
                  </div>

                  {/* Highlights */}
                  <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "0.65rem", marginBottom: "1.5rem" }}>
                    {project.highlights.map((h, i) => (
                      <li key={i} style={{ display: "flex", gap: "0.75rem", alignItems: "flex-start" }}>
                        <span
                          style={{
                            width: "5px",
                            height: "5px",
                            borderRadius: "50%",
                            background: colors.primary,
                            marginTop: "8px",
                            flexShrink: 0,
                          }}
                        />
                        <span style={{ fontSize: "0.875rem", color: "var(--text-secondary)", lineHeight: 1.65 }}>
                          {h}
                        </span>
                      </li>
                    ))}
                  </ul>

                  {/* Tech Tags */}
                  <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
                    {project.tech.map((tech) => (
                      <span
                        key={tech}
                        style={{
                          padding: "0.25rem 0.7rem",
                          background: `${colors.primary}10`,
                          border: `1px solid ${colors.primary}25`,
                          borderRadius: "20px",
                          fontSize: "0.75rem",
                          fontFamily: "var(--font-mono)",
                          color: colors.primary,
                        }}
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* View All on GitHub */}
        <div className="reveal-up" style={{ textAlign: "center", marginTop: "3rem" }}>
          <a
            href={resumeData.links.github}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-outline"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0 1 12 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/>
            </svg>
            View all on GitHub
          </a>
        </div>
      </div>
    </section>
  );
}
