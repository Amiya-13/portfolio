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
      (child as HTMLElement).style.transitionDelay = `${i * 0.1}s`;
      observer.observe(child);
    });
    return () => observer.disconnect();
  }, []);
  return ref;
}

const projectAccents = [
  { primary: "#6c63ff", secondary: "rgba(108,99,255,0.1)", glow: "rgba(108,99,255,0.15)" },
  { primary: "#ff6584", secondary: "rgba(255,101,132,0.1)", glow: "rgba(255,101,132,0.12)" },
  { primary: "#43e97b", secondary: "rgba(67,233,123,0.1)", glow: "rgba(67,233,123,0.12)" },
  { primary: "#f7c55c", secondary: "rgba(247,197,92,0.1)",  glow: "rgba(247,197,92,0.12)" },
];

const projectEmojis = ["⚡", "🛒", "👥", "🤖"];

export default function ProjectsSection() {
  const sectionRef = useRevealSection();
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);

  return (
    <section
      id="projects"
      ref={sectionRef as React.RefObject<HTMLElement>}
      style={{
        padding: "7rem 0",
        position: "relative",
        background: "linear-gradient(to bottom, transparent, rgba(108,99,255,0.015), transparent)",
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
          background: "radial-gradient(circle, rgba(67,233,123,0.05) 0%, transparent 70%)",
          pointerEvents: "none",
        }}
      />

      <div className="section-container">
        <div className="reveal-up" style={{ marginBottom: "3.5rem" }}>
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
            Projects that challenged me, taught me, and made it to production.
          </p>
        </div>

        {/* 2x2 Project Grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "1.5rem",
          }}
          className="projects-grid"
        >
          {resumeData.projects.map((project, idx) => {
            const accent = projectAccents[idx % projectAccents.length];
            const isHovered = hoveredCard === project.name;

            return (
              <div
                key={project.name}
                className="reveal-up glass-card shine-card"
                onMouseEnter={() => setHoveredCard(project.name)}
                onMouseLeave={() => setHoveredCard(null)}
                style={{
                  padding: "2rem",
                  position: "relative",
                  overflow: "hidden",
                  borderColor: isHovered ? `${accent.primary}40` : "var(--border)",
                  boxShadow: isHovered ? `0 0 40px ${accent.glow}` : "var(--shadow-card)",
                  transition: "all 0.4s ease",
                  cursor: "default",
                }}
                data-cursor-hover
              >
                {/* Background accent number */}
                <div
                  style={{
                    position: "absolute",
                    bottom: "-0.5rem",
                    right: "1.25rem",
                    fontFamily: "var(--font-display)",
                    fontSize: "6rem",
                    fontWeight: 900,
                    color: isHovered ? accent.glow : "var(--border)",
                    letterSpacing: "-0.05em",
                    userSelect: "none",
                    lineHeight: 1,
                    transition: "color 0.4s ease",
                    pointerEvents: "none",
                  }}
                >
                  {String(idx + 1).padStart(2, "0")}
                </div>

                {/* Header */}
                <div style={{ marginBottom: "1.25rem" }}>
                  <div
                    style={{
                      width: "40px",
                      height: "40px",
                      borderRadius: "10px",
                      background: accent.secondary,
                      border: `1px solid ${accent.primary}30`,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: "1.2rem",
                      marginBottom: "1rem",
                    }}
                  >
                    {projectEmojis[idx]}
                  </div>

                  <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: "0.5rem" }}>
                    <div>
                      <h3
                        style={{
                          fontSize: "1.25rem",
                          fontWeight: 800,
                          fontFamily: "var(--font-display)",
                          color: isHovered ? accent.primary : "var(--text-primary)",
                          transition: "color 0.3s ease",
                          marginBottom: "0.3rem",
                        }}
                      >
                        {project.name}
                      </h3>
                      <p style={{ fontSize: "0.78rem", color: accent.primary, fontFamily: "var(--font-mono)" }}>
                        {project.subtitle}
                      </p>
                    </div>
                    <div style={{ display: "flex", gap: "0.4rem", flexShrink: 0 }}>
                      {/* Live link */}
                      <a
                        href={project.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`View ${project.name} live`}
                        title="Live Demo"
                        style={{
                          width: "32px",
                          height: "32px",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          borderRadius: "50%",
                          border: `1px solid ${accent.primary}40`,
                          color: accent.primary,
                          transition: "all 0.3s ease",
                          textDecoration: "none",
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.background = accent.secondary;
                          e.currentTarget.style.transform = "scale(1.1)";
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.background = "transparent";
                          e.currentTarget.style.transform = "none";
                        }}
                      >
                        {/* External link / globe icon */}
                        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <circle cx="12" cy="12" r="10"/>
                          <line x1="2" y1="12" x2="22" y2="12"/>
                          <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
                        </svg>
                      </a>
                      {/* GitHub link — only for projects with a githubLink */}
                      {"githubLink" in project && (project as {githubLink: string}).githubLink && (
                        <a
                          href={(project as {githubLink: string}).githubLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label={`${project.name} GitHub`}
                          title="Source Code"
                          style={{
                            width: "32px",
                            height: "32px",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            borderRadius: "50%",
                            border: `1px solid ${accent.primary}25`,
                            color: accent.primary,
                            transition: "all 0.3s ease",
                            textDecoration: "none",
                            opacity: 0.7,
                          }}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.background = accent.secondary;
                            e.currentTarget.style.transform = "scale(1.1)";
                            e.currentTarget.style.opacity = "1";
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.background = "transparent";
                            e.currentTarget.style.transform = "none";
                            e.currentTarget.style.opacity = "0.7";
                          }}
                        >
                          <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0 1 12 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/>
                          </svg>
                        </a>
                      )}
                    </div>
                  </div>
                </div>

                {/* Highlights */}
                <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "0.55rem", marginBottom: "1.25rem", position: "relative", zIndex: 1 }}>
                  {project.highlights.slice(0, 2).map((h, i) => (
                    <li key={i} style={{ display: "flex", gap: "0.6rem", alignItems: "flex-start" }}>
                      <span
                        style={{
                          width: "5px",
                          height: "5px",
                          borderRadius: "50%",
                          background: accent.primary,
                          marginTop: "7px",
                          flexShrink: 0,
                        }}
                      />
                      <span style={{ fontSize: "0.83rem", color: "var(--text-secondary)", lineHeight: 1.6 }}>
                        {h}
                      </span>
                    </li>
                  ))}
                </ul>

                {/* Tech Tags */}
                <div style={{ display: "flex", flexWrap: "wrap", gap: "0.4rem", position: "relative", zIndex: 1 }}>
                  {project.tech.map((tech) => (
                    <span
                      key={tech}
                      style={{
                        padding: "0.2rem 0.6rem",
                        background: accent.secondary,
                        border: `1px solid ${accent.primary}25`,
                        borderRadius: "20px",
                        fontSize: "0.7rem",
                        fontFamily: "var(--font-mono)",
                        color: accent.primary,
                      }}
                    >
                      {tech}
                    </span>
                  ))}
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

      <style>{`
        @media (max-width: 768px) {
          .projects-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  );
}
