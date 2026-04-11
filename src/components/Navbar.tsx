"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { resumeData } from "@/data/resume";
import { useTheme } from "@/context/ThemeContext";

const navItems = [
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Experience", href: "#experience" },
  { label: "Projects", href: "#projects" },
  { label: "Contact", href: "#contact" },
];

function SunIcon() {
  return (
    <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/>
      <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/>
      <line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/>
      <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>
    </svg>
  );
}

function MoonIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
    </svg>
  );
}

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const { theme, toggleTheme } = useTheme();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    const onResize = () => setIsMobile(window.innerWidth < 768);
    onResize();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  return (
    <>
      <nav
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 100,
          padding: "1.1rem clamp(1.5rem, 5vw, 4rem)",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          transition: "background 0.4s ease, backdrop-filter 0.4s ease, border-color 0.4s ease",
          background: scrolled
            ? theme === "dark"
              ? "rgba(5, 5, 8, 0.88)"
              : "rgba(245, 245, 250, 0.88)"
            : "transparent",
          backdropFilter: scrolled ? "blur(20px)" : "none",
          borderBottom: scrolled ? "1px solid var(--border)" : "1px solid transparent",
        }}
      >
        {/* Logo */}
        <Link
          href="/"
          style={{
            fontFamily: "var(--font-display)",
            fontWeight: 800,
            fontSize: "1.1rem",
            color: "var(--text-primary)",
            textDecoration: "none",
            letterSpacing: "-0.02em",
          }}
        >
          AM<span style={{ color: "var(--accent)" }}>.</span>
        </Link>

        {/* Desktop Nav */}
        {!isMobile && (
          <div style={{ display: "flex", gap: "2rem", alignItems: "center" }}>
            {navItems.map((item) => (
              <a key={item.label} href={item.href} className="nav-link">
                {item.label}
              </a>
            ))}

            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="theme-toggle"
              aria-label="Toggle theme"
              title={theme === "dark" ? "Switch to Light Mode" : "Switch to Dark Mode"}
            >
              {theme === "dark" ? <SunIcon /> : <MoonIcon />}
            </button>

            <a
              href={`mailto:${resumeData.email}`}
              className="btn-primary"
              style={{ padding: "0.55rem 1.4rem", fontSize: "0.8rem" }}
            >
              Hire Me
            </a>
          </div>
        )}

        {/* Mobile: Theme + Hamburger */}
        {isMobile && (
          <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
            <button
              onClick={toggleTheme}
              className="theme-toggle"
              aria-label="Toggle theme"
            >
              {theme === "dark" ? <SunIcon /> : <MoonIcon />}
            </button>
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="Toggle menu"
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "5px",
                background: "none",
                border: "none",
                cursor: "pointer",
                padding: "4px",
                zIndex: 101,
              }}
            >
              {[0, 1, 2].map((i) => (
                <span
                  key={i}
                  style={{
                    display: "block",
                    width: "22px",
                    height: "1.5px",
                    background: "var(--text-primary)",
                    transition: "all 0.3s ease",
                    transform: menuOpen
                      ? i === 0
                        ? "translateY(6.5px) rotate(45deg)"
                        : i === 2
                        ? "translateY(-6.5px) rotate(-45deg)"
                        : "scaleX(0)"
                      : "none",
                  }}
                />
              ))}
            </button>
          </div>
        )}
      </nav>

      {/* Mobile Menu Overlay */}
      {isMobile && menuOpen && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: theme === "dark" ? "rgba(5, 5, 8, 0.98)" : "rgba(245,245,250,0.98)",
            backdropFilter: "blur(20px)",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: "2.5rem",
            zIndex: 99,
          }}
        >
          {navItems.map((item) => (
            <a
              key={item.label}
              href={item.href}
              onClick={() => setMenuOpen(false)}
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "2rem",
                fontWeight: 700,
                color: "var(--text-primary)",
                textDecoration: "none",
                transition: "color 0.3s ease",
              }}
            >
              {item.label}
            </a>
          ))}
          <a
            href={`mailto:${resumeData.email}`}
            className="btn-primary"
            onClick={() => setMenuOpen(false)}
          >
            Hire Me
          </a>
        </div>
      )}
    </>
  );
}
