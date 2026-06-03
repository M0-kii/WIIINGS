const STATS = [
  { num: "80", unit: "ml", label: "Serving Size" },
  { num: "114", unit: "mg", label: "Caffeine" },
  { num: "0", unit: "g", label: "Sugar" },
  { num: "4", unit: "b", label: "Vitamins" },
] as const;

export default function StatsSection() {
  return (
    <section
      id="stats"
      className="scroll-section absolute inset-0 flex items-center justify-end pr-[clamp(60px,8vw,160px)]"
      style={{ opacity: 0 }}
      role="region"
      aria-label="Nutrition facts"
    >
      <div>
        {/* Eyebrow */}
        <p
          className="rv text-[clamp(14px,1.6vw,20px)] tracking-[0.5em] uppercase text-[var(--rb-yellow)] mb-12 font-['var(--font-body)'] font-semibold"
          style={{ opacity: 0, transform: "translateY(30px)" }}
        >
          Nutrition Facts
        </p>

        {/* Data grid — 2×2 with accent lines between */}
        <div
          className="rv grid grid-cols-2 gap-x-28 gap-y-16"
          style={{ opacity: 0, transform: "translateY(30px)" }}
        >
          {STATS.map((stat, i) => (
            <div
              key={stat.label}
              className="flex flex-col relative"
            >
              {/* Top accent line on first row */}
              {i < 2 && (
                <div
                  className="absolute -top-8 left-0 right-0 h-[2px] bg-white/10"
                  aria-hidden="true"
                />
              )}
              <span className="font-['var(--font-heading)'] font-black text-white leading-none text-[clamp(60px,9vw,120px)]">
                {stat.num}
                <span className="text-[clamp(20px,2.5vw,36px)] text-[var(--rb-red)] font-bold ml-1">
                  {stat.unit}
                </span>
              </span>
              <span className="text-[clamp(14px,1.5vw,20px)] tracking-[0.35em] uppercase text-white/30 mt-4 font-['var(--font-body)'] font-semibold">
                {stat.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
