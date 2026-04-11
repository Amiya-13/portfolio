"use client";
import { useEffect, useRef } from "react";
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

export default function ExperienceSection() {
  const sectionRef = useRevealSection();

  return (
    <section
      id="experience"
      ref={sectionRef as React.RefObject<HTMLElement>}
      style={{
        padding: "7rem 0",
        position: "relative",
      }}
    >
      {/* Glow */}
      <div
        style={{
          position: "absolute",
          top: "30%",
          left: "-200px",
          width: "500px",
          height: "500px",
          background: "radial-gradient(circle, rgba(255,101,132,0.05) 0%, transparent 70%)",
          pointerEvents: "none",
        }}
      />

      <div className="section-container">
        <div className="reveal-up" style={{ marginBottom: "4rem" }}>
          <p className="section-label">My Journey</p>
          <h2 style={{ fontSize: "clamp(2rem, 4vw, 3.2rem)", fontWeight: 800 }}>
            Experience &{" "}
            <span className="gradient-text">Leadership</span>
          </h2>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "3rem" }} className="exp-grid">
          {/* Experience */}
          <div>
            <div className="reveal-up" style={{ marginBottom: "2rem" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
                <div
                  style={{
                    width: "32px",
                    height: "32px",
                    borderRadius: "8px",
                    background: "rgba(108,99,255,0.15)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" strokeWidth="2">
                    <rect x="2" y="7" width="20" height="14" rx="2"/>
                    <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/>
                  </svg>
                </div>
                <h3 style={{ fontFamily: "var(--font-mono)", fontSize: "0.78rem", letterSpacing: "0.15em", color: "var(--accent)" }}>
                  WORK EXPERIENCE
                </h3>
              </div>
            </div>

            {resumeData.experience.map((exp) => (
              <div
                key={exp.role}
                className="reveal-up glass-card shine-card"
                style={{ padding: "1.75rem", position: "relative" }}
              >
                <div
                  style={{
                    position: "absolute",
                    top: "1.75rem",
                    right: "1.75rem",
                    padding: "0.25rem 0.7rem",
                    background: "rgba(108,99,255,0.1)",
                    border: "1px solid rgba(108,99,255,0.2)",
                    borderRadius: "20px",
                    fontSize: "0.7rem",
                    fontFamily: "var(--font-mono)",
                    color: "var(--accent)",
                  }}
                >
                  {exp.period}
                </div>

                <h3 style={{ fontSize: "1.05rem", fontWeight: 700, marginBottom: "0.35rem", paddingRight: "120px" }}>
                  {exp.role}
                </h3>
                <p
                  style={{
                    fontSize: "0.85rem",
                    color: "var(--accent-light)",
                    marginBottom: "1.25rem",
                    fontFamily: "var(--font-mono)",
                  }}
                >
                  {exp.company}
                </p>

                <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "0.75rem" }}>
                  {exp.highlights.map((h, i) => (
                    <li key={i} style={{ display: "flex", gap: "0.75rem", alignItems: "flex-start" }}>
                      <span
                        style={{
                          width: "5px",
                          height: "5px",
                          borderRadius: "50%",
                          background: "var(--accent)",
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
              </div>
            ))}
          </div>

          {/* Leadership */}
          <div>
            <div className="reveal-up" style={{ marginBottom: "2rem" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
                <div
                  style={{
                    width: "32px",
                    height: "32px",
                    borderRadius: "8px",
                    background: "rgba(255,101,132,0.12)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--accent-2)" strokeWidth="2">
                    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
                    <circle cx="9" cy="7" r="4"/>
                    <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
                    <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
                  </svg>
                </div>
                <h3 style={{ fontFamily: "var(--font-mono)", fontSize: "0.78rem", letterSpacing: "0.15em", color: "var(--accent-2)" }}>
                  LEADERSHIP
                </h3>
              </div>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
              {resumeData.leadership.map((item) => (
                <div key={item.event} className="reveal-up glass-card shine-card" style={{ padding: "1.5rem" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "0.5rem" }}>
                    <h3 style={{ fontSize: "0.95rem", fontWeight: 700 }}>{item.event}</h3>
                    <span
                      style={{
                        fontSize: "0.7rem",
                        fontFamily: "var(--font-mono)",
                        color: "var(--text-muted)",
                        whiteSpace: "nowrap",
                      }}
                    >
                      {item.period}
                    </span>
                  </div>

                  <p style={{ fontSize: "0.8rem", color: "var(--accent-2)", fontFamily: "var(--font-mono)", marginBottom: "1rem" }}>
                    {item.role}
                  </p>

                  <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                    {item.highlights.map((h, i) => (
                      <li key={i} style={{ display: "flex", gap: "0.6rem", alignItems: "flex-start" }}>
                        <span
                          style={{
                            width: "4px",
                            height: "4px",
                            borderRadius: "50%",
                            background: "var(--accent-2)",
                            marginTop: "8px",
                            flexShrink: 0,
                          }}
                        />
                        <span style={{ fontSize: "0.82rem", color: "var(--text-secondary)", lineHeight: 1.6 }}>
                          {h}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .exp-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  );
}
