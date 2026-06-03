"use client";

import { useEffect, useState } from "react";

export default function LoadingScreen({ onReady }: { onReady: () => void }) {
  const [progress, setProgress] = useState(0);
  const [splitting, setSplitting] = useState(false);
  const [done, setDone] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setSplitting(true);
          setTimeout(() => {
            setDone(true);
            onReady();
          }, 600);
          return 100;
        }
        return prev + 2;
      });
    }, 25);

    return () => clearInterval(interval);
  }, [onReady]);

  if (done) return null;

  return (
    <div className="fixed inset-0 z-[100] overflow-hidden bg-[#0a0a0a] flex items-center justify-center">
      {/* Two triangles side by side — Red Bull motif */}
      <div className="relative flex items-center justify-center gap-[clamp(8px,2vw,24px)]">
        {/* Left triangle — red */}
        <div
          className="transition-all duration-500 ease-[cubic-bezier(0.76,0,0.24,1)]"
          style={{
            width: 0,
            height: 0,
            borderLeft: "clamp(40px,7vw,80px) solid transparent",
            borderRight: "clamp(40px,7vw,80px) solid transparent",
            borderBottom: "clamp(70px,12vw,140px) solid #E21B4D",
            transform: splitting ? "translateX(-120vw) rotate(-15deg)" : "translateX(0) rotate(0deg)",
            opacity: splitting ? 0 : 1,
          }}
        />

        {/* Right triangle — yellow */}
        <div
          className="transition-all duration-500 ease-[cubic-bezier(0.76,0,0.24,1)]"
          style={{
            width: 0,
            height: 0,
            borderLeft: "clamp(40px,7vw,80px) solid transparent",
            borderRight: "clamp(40px,7vw,80px) solid transparent",
            borderBottom: "clamp(70px,12vw,140px) solid #FFD300",
            transform: splitting ? "translateX(120vw) rotate(15deg)" : "translateX(0) rotate(0deg)",
            opacity: splitting ? 0 : 1,
          }}
        />
      </div>

      {/* Center content — logo + progress (overlaid on top) */}
      <div className="absolute inset-0 flex flex-col items-center justify-center z-10">
        <div className="mb-8">
          <img
            src="/redbull.svg"
            alt="Red Bull"
            className="h-[clamp(32px,5vw,56px)] w-auto drop-shadow-lg"
          />
        </div>

        <div className="w-[200px] h-[3px] bg-white/10 overflow-hidden rounded-full">
          <div
            className="h-full bg-gradient-to-r from-[var(--rb-red)] to-[var(--rb-yellow)] transition-all duration-150 ease-out rounded-full"
            style={{ width: `${progress}%` }}
          />
        </div>

        <p className="mt-6 text-[clamp(10px,1.2vw,14px)] tracking-[0.4em] uppercase text-white/30 font-['var(--font-body)'] font-medium">
          Loading
        </p>
      </div>
    </div>
  );
}
