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

const GitHubIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0 1 12 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/>
  </svg>
);

const LinkedInIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
  </svg>
);

const LeetCodeIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
    <path d="M13.483 0a1.374 1.374 0 0 0-.961.438L7.116 6.226l-3.854 4.126a5.266 5.266 0 0 0-1.209 2.104 5.35 5.35 0 0 0-.125.513 5.527 5.527 0 0 0 .062 2.362 5.83 5.83 0 0 0 .349 1.017 5.938 5.938 0 0 0 1.271 1.818l4.277 4.193.039.038c2.248 2.165 5.852 2.133 8.063-.074l2.396-2.392c.54-.54.54-1.414.003-1.955a1.378 1.378 0 0 0-1.951-.003l-2.396 2.392a3.021 3.021 0 0 1-4.205.038l-.02-.019-4.276-4.193c-.652-.64-.972-1.469-.948-2.263a2.68 2.68 0 0 1 .066-.523 2.545 2.545 0 0 1 .619-1.164L9.13 8.114c1.058-1.134 3.204-1.27 4.43-.278l3.501 2.831c.593.48 1.461.387 1.94-.207a1.384 1.384 0 0 0-.207-1.943l-3.5-2.831c-.8-.647-1.766-1.045-2.774-1.202l2.015-2.158A1.384 1.384 0 0 0 13.483 0zm-2.866 12.815a1.38 1.38 0 0 0-1.38 1.382 1.38 1.38 0 0 0 1.38 1.382H20.79a1.38 1.38 0 0 0 1.38-1.382 1.38 1.38 0 0 0-1.38-1.382z"/>
  </svg>
);

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

  const socialLinks = [
    {
      href: resumeData.links.github,
      label: "GitHub",
      color: "#1f2328",
      bgColor: "rgba(31,35,40,0.08)",
      icon: <GitHubIcon />,
    },
    {
      href: resumeData.links.linkedin,
      label: "LinkedIn",
      color: "#0077B5",
      bgColor: "rgba(0,119,181,0.08)",
      icon: <LinkedInIcon />,
    },
    {
      href: resumeData.links.leetcode,
      label: "LeetCode",
      color: "#FFA116",
      bgColor: "rgba(255,161,22,0.08)",
      icon: <LeetCodeIcon />,
    },
  ];

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
      {/* Glow */}
      <div
        style={{
          position: "absolute",
          bottom: "-100px",
          left: "50%",
          transform: "translateX(-50%)",
          width: "800px",
          height: "400px",
          background: "radial-gradient(ellipse, var(--accent-glow) 0%, transparent 70%)",
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
            {/* Email Card */}
            <div className="reveal-up glass-card" style={{ padding: "1.25rem 1.5rem", display: "flex", alignItems: "center", gap: "1rem" }}>
              <div
                style={{
                  width: "40px",
                  height: "40px",
                  borderRadius: "10px",
                  background: "rgba(108,99,255,0.12)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0,
                }}
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" strokeWidth="2">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                  <polyline points="22,6 12,13 2,6"/>
                </svg>
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <p style={{ fontSize: "0.72rem", color: "var(--text-muted)", fontFamily: "var(--font-mono)", letterSpacing: "0.1em", marginBottom: "0.2rem" }}>EMAIL</p>
                <p style={{ fontSize: "0.88rem", color: "var(--text-primary)", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                  {resumeData.email}
                </p>
              </div>
              <button
                onClick={copyEmail}
                style={{
                  padding: "0.3rem 0.8rem",
                  background: "rgba(108,99,255,0.1)",
                  border: "1px solid rgba(108,99,255,0.2)",
                  borderRadius: "20px",
                  fontSize: "0.72rem",
                  color: "var(--accent)",
                  cursor: "pointer",
                  fontFamily: "var(--font-mono)",
                  transition: "all 0.2s ease",
                  flexShrink: 0,
                }}
              >
                {copied ? "✓ Copied!" : "Copy"}
              </button>
            </div>

            {/* Phone Card */}
            <div className="reveal-up glass-card" style={{ padding: "1.25rem 1.5rem", display: "flex", alignItems: "center", gap: "1rem" }}>
              <div
                style={{
                  width: "40px",
                  height: "40px",
                  borderRadius: "10px",
                  background: "rgba(255,101,132,0.1)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0,
                }}
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--accent-2)" strokeWidth="2">
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.61 3.18 2 2 0 0 1 3.6 1h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.91a16 16 0 0 0 6 6l.91-.91a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 21.73 16.92z"/>
                </svg>
              </div>
              <div style={{ flex: 1 }}>
                <p style={{ fontSize: "0.72rem", color: "var(--text-muted)", fontFamily: "var(--font-mono)", letterSpacing: "0.1em", marginBottom: "0.2rem" }}>PHONE</p>
                <p style={{ fontSize: "0.88rem", color: "var(--text-primary)" }}>{resumeData.phone}</p>
              </div>
              <a
                href={`tel:${resumeData.phone}`}
                style={{
                  padding: "0.3rem 0.8rem",
                  background: "rgba(255,101,132,0.1)",
                  border: "1px solid rgba(255,101,132,0.2)",
                  borderRadius: "20px",
                  fontSize: "0.72rem",
                  color: "var(--accent-2)",
                  textDecoration: "none",
                  fontFamily: "var(--font-mono)",
                  flexShrink: 0,
                }}
              >
                Call
              </a>
            </div>

            {/* Location Card */}
            <div className="reveal-up glass-card" style={{ padding: "1.25rem 1.5rem", display: "flex", alignItems: "center", gap: "1rem" }}>
              <div
                style={{
                  width: "40px",
                  height: "40px",
                  borderRadius: "10px",
                  background: "rgba(67,233,123,0.1)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0,
                }}
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--accent-3)" strokeWidth="2">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
                  <circle cx="12" cy="10" r="3"/>
                </svg>
              </div>
              <div style={{ flex: 1 }}>
                <p style={{ fontSize: "0.72rem", color: "var(--text-muted)", fontFamily: "var(--font-mono)", letterSpacing: "0.1em", marginBottom: "0.2rem" }}>LOCATION</p>
                <p style={{ fontSize: "0.88rem", color: "var(--text-primary)" }}>{resumeData.location}</p>
              </div>
            </div>

            {/* Social Links with Platform Logos */}
            <div className="reveal-up" style={{ display: "flex", gap: "0.75rem", paddingTop: "0.25rem" }}>
              {socialLinks.map(({ href, label, color, bgColor, icon }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  title={label}
                  aria-label={`Visit ${label}`}
                  style={{
                    flex: 1,
                    padding: "1rem 0.5rem",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "0.5rem",
                    background: "var(--bg-card)",
                    border: "1px solid var(--border)",
                    borderRadius: "14px",
                    color: "var(--text-muted)",
                    textDecoration: "none",
                    transition: "all 0.3s ease",
                    boxShadow: "var(--shadow-card)",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = color;
                    e.currentTarget.style.color = color;
                    e.currentTarget.style.background = bgColor;
                    e.currentTarget.style.transform = "translateY(-3px)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = "var(--border)";
                    e.currentTarget.style.color = "var(--text-muted)";
                    e.currentTarget.style.background = "var(--bg-card)";
                    e.currentTarget.style.transform = "none";
                  }}
                >
                  {icon}
                  <span style={{ fontSize: "0.65rem", fontFamily: "var(--font-mono)", letterSpacing: "0.08em" }}>
                    {label}
                  </span>
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
                        background: "var(--bg-secondary)",
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
                      background: "var(--bg-secondary)",
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
