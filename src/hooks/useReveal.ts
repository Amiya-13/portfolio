"use client";
import { useEffect, useRef } from "react";

interface UseRevealOptions {
  threshold?: number;
  delay?: number;
}

export function useReveal(options: UseRevealOptions = {}) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            el.classList.add("visible");
          }, options.delay ?? 0);
          observer.disconnect();
        }
      },
      { threshold: options.threshold ?? 0.1 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [options.delay, options.threshold]);

  return ref;
}
