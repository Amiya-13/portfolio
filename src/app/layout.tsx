import type { Metadata } from "next";
import "./globals.css";
import CustomCursor from "@/components/CustomCursor";
import Navbar from "@/components/Navbar";
import ScrollProgress from "@/components/ScrollProgress";
import LenisProvider from "@/components/LenisProvider";
import { ThemeProvider } from "@/context/ThemeContext";

export const metadata: Metadata = {
  title: "Amiya Mishu — Full-Stack Developer",
  description: "Amiya Mishu is a Full-Stack Developer and B.Tech IT student at IEM Kolkata, specializing in React, Node.js, and building thoughtful digital experiences.",
  keywords: ["Amiya Mishu", "Full-Stack Developer", "React Developer", "Portfolio", "IEM Kolkata", "Web Developer"],
  authors: [{ name: "Amiya Mishu" }],
  openGraph: {
    title: "Amiya Mishu — Full-Stack Developer",
    description: "Building digital experiences at the intersection of engineering and design.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Blocking script: apply theme before first paint to prevent flash */}
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var s=localStorage.getItem('portfolio-theme');var p=window.matchMedia('(prefers-color-scheme: light)').matches?'light':'dark';document.documentElement.setAttribute('data-theme',s||p);}catch(e){document.documentElement.setAttribute('data-theme','dark');}})();`,
          }}
        />
      </head>
      <body>
        <ThemeProvider>
          <LenisProvider>
            <div className="noise-overlay" />
            <CustomCursor />
            <ScrollProgress />
            <Navbar />
            {children}
          </LenisProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
