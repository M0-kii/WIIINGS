export default function CaffeineSection() {
  return (
    <section
      id="caffeine"
      className="scroll-section absolute inset-0 flex items-end justify-end pr-[clamp(60px,8vw,140px)] pb-[clamp(80px,12vh,160px)]"
      style={{ opacity: 0 }}
      role="region"
      aria-label="Caffeine content"
    >
      <div className="text-right max-w-[650px]">
        {/* Eyebrow — yellow accent */}
        <p
          className="rv text-[clamp(14px,1.6vw,20px)] tracking-[0.5em] uppercase text-[var(--rb-yellow)] mb-8 font-['var(--font-body)'] font-semibold"
          style={{ opacity: 0, transform: "translateY(30px)" }}
        >
          Vitalizes Body &amp; Mind
        </p>

        {/* Big number — dominant visual */}
        <div
          className="rv flex items-baseline justify-end gap-4"
          style={{ opacity: 0, transform: "translateY(30px)" }}
        >
          <span className="font-['var(--font-heading)'] font-black tracking-[-0.06em] leading-[0.82] text-white text-[clamp(120px,20vw,280px)]">
            114
          </span>
          <span className="font-['var(--font-heading)'] font-light tracking-[0.06em] text-white/25 text-[clamp(36px,5vw,64px)]">
            mg
          </span>
        </div>

        {/* Label — red accent line */}
        <div
          className="rv flex items-center justify-end gap-5 mt-6"
          style={{ opacity: 0, transform: "translateY(30px)" }}
        >
          <span className="text-[clamp(14px,1.6vw,20px)] tracking-[0.5em] uppercase text-[var(--rb-red)] font-['var(--font-body)'] font-bold">
            Caffeine Per Can
          </span>
          <div className="w-12 h-[2px] bg-[var(--rb-red)]" aria-hidden="true" />
        </div>

        {/* Descriptor */}
        <p
          className="rv text-[clamp(18px,2.2vw,28px)] text-white/30 mt-10 max-w-[500px] ml-auto leading-relaxed font-['var(--font-body)'] font-light"
          style={{ opacity: 0, transform: "translateY(30px)" }}
        >
          Zero sugar. Essential amino acids. B-group vitamins. The formula that
          started a global movement in 1987.
        </p>
      </div>
    </section>
  );
}
