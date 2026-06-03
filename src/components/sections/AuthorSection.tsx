"use client";

import { useState, useEffect } from "react";

export default function AuthorSection() {
  const [year, setYear] = useState<number | null>(null);

  useEffect(() => {
    setYear(new Date().getFullYear());
  }, []);

  return (
    <section
      id="author"
      className="scroll-section absolute inset-0 flex items-end justify-center pb-[clamp(60px,10vh,120px)]"
      style={{ opacity: 0 }}
      role="region"
      aria-label="Author credit"
    >
      <div className="text-center pointer-events-auto">
        {/* Eyebrow — whispered */}
        <p
          className="rv text-[clamp(12px,1.3vw,16px)] tracking-[0.7em] uppercase text-white/15 mb-10 font-['var(--font-body)'] font-medium"
          style={{ opacity: 0, transform: "translateY(30px)" }}
        >
          Designed &amp; Developed By
        </p>

        {/* Name — large but ghosted */}
        <a
          href="https://github.com/M0-Kii"
          target="_blank"
          rel="noopener noreferrer"
          className="rv group inline-flex flex-col items-center pointer-events-auto cursor-pointer"
          style={{ opacity: 0, transform: "translateY(30px)" }}
        >
          <span className="font-['var(--font-heading)'] font-black tracking-[-0.03em] text-white/80 group-hover:text-[var(--rb-red)] transition-colors duration-500 text-[clamp(48px,7vw,96px)]">
            M0-Kii
          </span>
        </a>

        {/* Divider + link */}
        <div
          className="rv mt-12 flex items-center gap-10 justify-center"
          style={{ opacity: 0, transform: "translateY(30px)" }}
        >
          <div className="w-20 h-[2px] bg-gradient-to-r from-transparent to-[var(--rb-red)]/25" aria-hidden="true" />
          <a
            href="https://github.com/M0-Kii"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[clamp(13px,1.4vw,18px)] tracking-[0.4em] uppercase text-white/15 hover:text-white/40 transition-colors duration-300 font-['var(--font-body)'] font-light pointer-events-auto cursor-pointer"
          >
            github.com/M0-Kii
          </a>
          <div className="w-20 h-[2px] bg-gradient-to-l from-transparent to-[var(--rb-red)]/25" aria-hidden="true" />
        </div>

        {/* Year */}
        <p
          className="rv mt-10 text-[clamp(10px,1vw,14px)] tracking-[0.5em] uppercase text-white/8 font-['var(--font-body)']"
          style={{ opacity: 0, transform: "translateY(30px)" }}
        >
          UI DESIGN · {year ?? "2026"}
        </p>
      </div>
    </section>
  );
}
