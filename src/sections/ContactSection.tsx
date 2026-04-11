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

export default function ContactSection() {
  const sectionRef = useRevealSection();
  const [copied, setCopied] = useState(false);
  const [formState, setFormState] = useState({ name: "", email: "", message: "" });
  const [sent, setSent] = useState(false);

  const copyEmail = () => {
    navigator.clipboard.writeText(resumeData.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    window.location.href = `mailto:${resumeData.email}?subject=Portfolio Message from ${formState.name}&body=${formState.message}%0A%0AFrom: ${formState.email}`;
    setSent(true);
  };

  return (
    <section
      id="contact"
      ref={sectionRef as React.RefObject<HTMLElement>}
      style={{
        padding: "7rem 0 5rem",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Glows */}
      <div
        style={{
          position: "absolute",
          bottom: "-100px",
          left: "50%",
          transform: "translateX(-50%)",
          width: "800px",
          height: "400px",
          background: "radial-gradient(ellipse, rgba(108,99,255,0.08) 0%, transparent 70%)",
          pointerEvents: "none",
        }}
      />

      <div className="section-container">
        <div className="reveal-up" style={{ textAlign: "center", marginBottom: "4rem" }}>
          <p className="section-label" style={{ textAlign: "center" }}>Get In Touch</p>
          <h2 style={{ fontSize: "clamp(2rem, 4vw, 3.5rem)", fontWeight: 800, marginBottom: "1rem" }}>
            Let's build something{" "}
            <span className="gradient-text">together</span>
          </h2>
          <p
            style={{
              color: "var(--text-secondary)",
              fontSize: "1.05rem",
              maxWidth: "500px",
              margin: "0 auto",
              lineHeight: 1.7,
            }}
          >
            Whether you have an idea, a role, or just want to say hi — my inbox is always open.
          </p>
        </div>

        <div
          style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "3rem", alignItems: "start" }}
          className="contact-grid"
        >
          {/* Left: Info cards */}
          <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
            {[
              {
                icon: (
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" strokeWidth="2">
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                    <polyline points="22,6 12,13 2,6"/>
                  </svg>
                ),
                label: "Email",
                value: resumeData.email,
                action: copyEmail,
                actionLabel: copied ? "Copied!" : "Copy",
                accentColor: "var(--accent)",
              },
              {
                icon: (
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--accent-2)" strokeWidth="2">
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.61 3.18 2 2 0 0 1 3.6 1h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.91a16 16 0 0 0 6 6l.91-.91a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 21.73 16.92z"/>
                  </svg>
                ),
                label: "Phone",
                value: resumeData.phone,
                action: () => window.open(`tel:${resumeData.phone}`),
                actionLabel: "Call",
                accentColor: "var(--accent-2)",
              },
              {
                icon: (
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--accent-3)" strokeWidth="2">
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
                    <circle cx="12" cy="10" r="3"/>
                  </svg>
                ),
                label: "Location",
                value: resumeData.location,
                action: undefined,
                actionLabel: undefined,
                accentColor: "var(--accent-3)",
              },
            ].map((item) => (
              <div
                key={item.label}
                className="reveal-up glass-card"
                style={{ padding: "1.25rem 1.5rem", display: "flex", alignItems: "center", gap: "1rem" }}
              >
                <div
                  style={{
                    width: "40px",
                    height: "40px",
                    borderRadius: "10px",
                    background: `${item.accentColor}15`,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                  }}
                >
                  {item.icon}
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <p style={{ fontSize: "0.72rem", color: "var(--text-muted)", fontFamily: "var(--font-mono)", letterSpacing: "0.1em", marginBottom: "0.2rem" }}>
                    {item.label.toUpperCase()}
                  </p>
                  <p style={{ fontSize: "0.9rem", color: "var(--text-primary)", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                    {item.value}
                  </p>
                </div>
                {item.action && (
                  <button
                    onClick={item.action}
                    style={{
                      padding: "0.3rem 0.8rem",
                      background: `${item.accentColor}15`,
                      border: `1px solid ${item.accentColor}30`,
                      borderRadius: "20px",
                      fontSize: "0.72rem",
                      color: item.accentColor,
                      cursor: "pointer",
                      fontFamily: "var(--font-mono)",
                      transition: "all 0.2s ease",
                      flexShrink: 0,
                    }}
                  >
                    {item.actionLabel}
                  </button>
                )}
              </div>
            ))}

            {/* Social Links */}
            <div className="reveal-up" style={{ display: "flex", gap: "0.75rem", paddingTop: "0.5rem" }}>
              {[
                { href: resumeData.links.github, label: "GitHub", icon: "GH" },
                { href: resumeData.links.linkedin, label: "LinkedIn", icon: "LI" },
                { href: resumeData.links.leetcode, label: "LeetCode", icon: "LC" },
              ].map(({ href, label, icon }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    flex: 1,
                    padding: "0.75rem",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    background: "rgba(255,255,255,0.03)",
                    border: "1px solid var(--border)",
                    borderRadius: "12px",
                    fontSize: "0.75rem",
                    fontFamily: "var(--font-mono)",
                    color: "var(--text-secondary)",
                    textDecoration: "none",
                    transition: "all 0.3s ease",
                    letterSpacing: "0.05em",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = "var(--accent)";
                    e.currentTarget.style.color = "var(--accent)";
                    e.currentTarget.style.background = "rgba(108,99,255,0.08)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = "var(--border)";
                    e.currentTarget.style.color = "var(--text-secondary)";
                    e.currentTarget.style.background = "rgba(255,255,255,0.03)";
                  }}
                >
                  {icon}
                </a>
              ))}
            </div>
          </div>

          {/* Right: Form */}
          <div className="reveal-up glass-card" style={{ padding: "2rem" }}>
            {sent ? (
              <div style={{ textAlign: "center", padding: "3rem 1rem" }}>
                <div
                  style={{
                    width: "64px",
                    height: "64px",
                    borderRadius: "50%",
                    background: "rgba(67,233,123,0.1)",
                    border: "1px solid rgba(67,233,123,0.3)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    margin: "0 auto 1.5rem",
                  }}
                >
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="var(--accent-3)" strokeWidth="2">
                    <polyline points="20 6 9 17 4 12"/>
                  </svg>
                </div>
                <h3 style={{ fontSize: "1.25rem", fontWeight: 700, marginBottom: "0.5rem" }}>Message sent!</h3>
                <p style={{ color: "var(--text-secondary)", fontSize: "0.95rem" }}>
                  Thanks for reaching out. I'll get back to you soon.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
                <h3 style={{ fontFamily: "var(--font-mono)", fontSize: "0.78rem", letterSpacing: "0.15em", color: "var(--text-muted)", marginBottom: "0.5rem" }}>
                  SEND A MESSAGE
                </h3>

                {[
                  { key: "name", label: "Your Name", type: "text", placeholder: "John Doe" },
                  { key: "email", label: "Email Address", type: "email", placeholder: "john@example.com" },
                ].map((field) => (
                  <div key={field.key}>
                    <label
                      htmlFor={field.key}
                      style={{ display: "block", fontSize: "0.8rem", color: "var(--text-secondary)", marginBottom: "0.5rem", fontFamily: "var(--font-mono)" }}
                    >
                      {field.label}
                    </label>
                    <input
                      id={field.key}
                      type={field.type}
                      placeholder={field.placeholder}
                      value={formState[field.key as keyof typeof formState]}
                      onChange={(e) => setFormState((s) => ({ ...s, [field.key]: e.target.value }))}
                      required
                      style={{
                        width: "100%",
                        padding: "0.75rem 1rem",
                        background: "rgba(255,255,255,0.03)",
                        border: "1px solid var(--border)",
                        borderRadius: "10px",
                        color: "var(--text-primary)",
                        fontSize: "0.9rem",
                        outline: "none",
                        transition: "border-color 0.3s ease",
                        fontFamily: "var(--font-sans)",
                      }}
                      onFocus={(e) => (e.target.style.borderColor = "var(--accent)")}
                      onBlur={(e) => (e.target.style.borderColor = "var(--border)")}
                    />
                  </div>
                ))}

                <div>
                  <label
                    htmlFor="message"
                    style={{ display: "block", fontSize: "0.8rem", color: "var(--text-secondary)", marginBottom: "0.5rem", fontFamily: "var(--font-mono)" }}
                  >
                    Message
                  </label>
                  <textarea
                    id="message"
                    placeholder="Let's talk about..."
                    rows={5}
                    value={formState.message}
                    onChange={(e) => setFormState((s) => ({ ...s, message: e.target.value }))}
                    required
                    style={{
                      width: "100%",
                      padding: "0.75rem 1rem",
                      background: "rgba(255,255,255,0.03)",
                      border: "1px solid var(--border)",
                      borderRadius: "10px",
                      color: "var(--text-primary)",
                      fontSize: "0.9rem",
                      outline: "none",
                      transition: "border-color 0.3s ease",
                      resize: "vertical",
                      fontFamily: "var(--font-sans)",
                    }}
                    onFocus={(e) => (e.target.style.borderColor = "var(--accent)")}
                    onBlur={(e) => (e.target.style.borderColor = "var(--border)")}
                  />
                </div>

                <button type="submit" className="btn-primary" style={{ justifyContent: "center" }}>
                  Send Message
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <line x1="22" y1="2" x2="11" y2="13"/>
                    <polygon points="22 2 15 22 11 13 2 9 22 2"/>
                  </svg>
                </button>
              </form>
            )}
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .contact-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  );
}
