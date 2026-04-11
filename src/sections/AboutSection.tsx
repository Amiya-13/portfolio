"use client";
import { useEffect, useRef } from "react";
import { resumeData } from "@/data/resume";

const stats = [
  { value: "9.1", label: "CGPA", suffix: "" },
  { value: "2+", label: "Projects Shipped", suffix: "" },
  { value: "300+", label: "Records Managed", suffix: "" },
  { value: "40%", label: "Efficiency Gain", suffix: "" },
];

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

export default function AboutSection() {
  const sectionRef = useRevealSection();

  return (
    <section
      id="about"
      ref={sectionRef as React.RefObject<HTMLElement>}
      style={{
        padding: "7rem 0",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Subtle glow */}
      <div
        style={{
          position: "absolute",
          top: "50%",
          right: "-200px",
          width: "600px",
          height: "600px",
          background: "radial-gradient(circle, rgba(108,99,255,0.06) 0%, transparent 70%)",
          transform: "translateY(-50%)",
          pointerEvents: "none",
        }}
      />

      <div className="section-container">
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "5rem",
            alignItems: "center",
          }}
          className="about-grid"
        >
          {/* Left: Text */}
          <div>
            <div className="reveal-up">
              <p className="section-label">About Me</p>
              <h2
                style={{
                  fontSize: "clamp(2rem, 4vw, 3.2rem)",
                  fontWeight: 800,
                  marginBottom: "1.5rem",
                  lineHeight: 1.15,
                }}
              >
                Crafting experiences,{" "}
                <span className="gradient-text">not just code</span>
              </h2>
            </div>

            <div className="reveal-up">
              <p
                style={{
                  color: "var(--text-secondary)",
                  lineHeight: 1.85,
                  fontSize: "1.05rem",
                  marginBottom: "1.25rem",
                }}
              >
                I'm a second-year B.Tech IT student at the{" "}
                <span style={{ color: "var(--text-primary)", fontWeight: 500 }}>
                  Institute of Engineering and Management, Kolkata
                </span>{" "}
                — with a CGPA of 9.1 and a passionate drive to build things that matter.
              </p>
              <p
                style={{
                  color: "var(--text-secondary)",
                  lineHeight: 1.85,
                  fontSize: "1.05rem",
                  marginBottom: "1.25rem",
                }}
              >
                My work spans from building{" "}
                <span style={{ color: "var(--accent-light)" }}>full-stack web systems</span>{" "}
                with role-based access to creating event management platforms with AI-powered recommendations.
              </p>
              <p
                style={{
                  color: "var(--text-secondary)",
                  lineHeight: 1.85,
                  fontSize: "1.05rem",
                  marginBottom: "2.5rem",
                }}
              >
                Beyond writing code, I organize hackathons, mentor peers, and continuously explore new domains — currently deep into{" "}
                <span style={{ color: "var(--accent-2)" }}>GenAI and system design</span>.
              </p>

              <div style={{ display: "flex", gap: "1rem" }}>
                <a href={resumeData.links.github} target="_blank" rel="noopener noreferrer" className="btn-primary">
                  GitHub Profile
                </a>
                <a href="#contact" className="btn-outline">
                  Get in Touch
                </a>
              </div>
            </div>
          </div>

          {/* Right: Stats + Education Card */}
          <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
            {/* Stats grid */}
            <div
              className="reveal-up"
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: "1rem",
              }}
            >
              {stats.map((stat) => (
                <div key={stat.label} className="glass-card shine-card" style={{ padding: "1.5rem" }}>
                  <div
                    style={{
                      fontSize: "2rem",
                      fontWeight: 800,
                      fontFamily: "var(--font-display)",
                      marginBottom: "0.25rem",
                    }}
                    className="gradient-text"
                  >
                    {stat.value}
                  </div>
                  <div
                    style={{
                      fontSize: "0.8rem",
                      color: "var(--text-secondary)",
                      fontFamily: "var(--font-mono)",
                      letterSpacing: "0.05em",
                    }}
                  >
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>

            {/* Education Card */}
            <div className="reveal-up glass-card shine-card" style={{ padding: "1.75rem" }}>
              <div style={{ display: "flex", gap: "1rem", alignItems: "flex-start" }}>
                <div
                  style={{
                    width: "42px",
                    height: "42px",
                    borderRadius: "10px",
                    background: "rgba(108,99,255,0.15)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                  }}
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" strokeWidth="2">
                    <path d="M22 10v6M2 10l10-5 10 5-10 5z"/>
                    <path d="M6 12v5c3 3 9 3 12 0v-5"/>
                  </svg>
                </div>
                <div>
                  <p
                    style={{
                      fontFamily: "var(--font-mono)",
                      fontSize: "0.7rem",
                      color: "var(--accent)",
                      letterSpacing: "0.15em",
                      marginBottom: "0.35rem",
                    }}
                  >
                    EDUCATION
                  </p>
                  <h3 style={{ fontSize: "0.95rem", fontWeight: 600, marginBottom: "0.25rem" }}>
                    {resumeData.education[0].institution}
                  </h3>
                  <p style={{ fontSize: "0.85rem", color: "var(--text-secondary)" }}>
                    {resumeData.education[0].degree}
                  </p>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      marginTop: "0.75rem",
                      paddingTop: "0.75rem",
                      borderTop: "1px solid var(--border)",
                    }}
                  >
                    <span style={{ fontSize: "0.8rem", color: "var(--text-muted)", fontFamily: "var(--font-mono)" }}>
                      {resumeData.education[0].period}
                    </span>
                    <span style={{ fontSize: "0.8rem", color: "var(--accent-3)", fontFamily: "var(--font-mono)", fontWeight: 600 }}>
                      CGPA: {resumeData.education[0].cgpa}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Location badge */}
            <div className="reveal-up" style={{ display: "flex", gap: "0.75rem" }}>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "0.5rem",
                  padding: "0.5rem 1rem",
                  background: "rgba(255,255,255,0.03)",
                  border: "1px solid var(--border)",
                  borderRadius: "40px",
                }}
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--text-muted)" strokeWidth="2">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
                  <circle cx="12" cy="10" r="3"/>
                </svg>
                <span style={{ fontSize: "0.8rem", color: "var(--text-muted)", fontFamily: "var(--font-mono)" }}>
                  {resumeData.location}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .about-grid {
            grid-template-columns: 1fr !important;
            gap: 3rem !important;
          }
        }
      `}</style>
    </section>
  );
}
