export default function FuelSection() {
  return (
    <section
      id="fuel"
      className="scroll-section absolute inset-0 flex items-start justify-start pl-[clamp(60px,8vw,140px)] pt-[clamp(100px,18vh,220px)]"
      style={{ opacity: 0 }}
      role="region"
      aria-label="Fuel your fire"
    >
      <div className="text-left max-w-[650px]">
        {/* Eyebrow */}
        <p
          className="rv text-[clamp(14px,1.6vw,20px)] tracking-[0.5em] uppercase text-[var(--rb-yellow)] mb-8 font-['var(--font-body)'] font-semibold"
          style={{ opacity: 0, transform: "translateY(30px)" }}
        >
          Your Daily Drive
        </p>

        {/* Headline — aggressive, top-anchored */}
        <h2
          className="rv font-['var(--font-heading)'] font-black tracking-[-0.04em] leading-[0.92] text-white"
          style={{
            fontSize: "clamp(64px,10vw,140px)",
            opacity: 0,
            transform: "translateY(30px)",
          }}
        >
          FUEL
          <br />
          <span className="text-[var(--rb-red)]">YOUR FIRE.</span>
        </h2>

        {/* Descriptor */}
        <p
          className="rv text-[clamp(18px,2.2vw,28px)] text-white/30 mt-10 max-w-[500px] leading-relaxed font-['var(--font-body)'] font-light"
          style={{ opacity: 0, transform: "translateY(30px)" }}
        >
          Taurine. B-group vitamins. The perfect carbonation. From the morning
          grind to the late-night hustle — performance amplified.
        </p>

        {/* Accent line */}
        <div
          className="rv flex items-center justify-start gap-5 mt-10"
          style={{ opacity: 0, transform: "translateY(30px)" }}
        >
          <span className="text-[clamp(13px,1.4vw,18px)] tracking-[0.45em] uppercase text-white/25 font-['var(--font-body)'] font-medium">
            Performance Amplifier
          </span>
          <div className="w-14 h-[2px] bg-[var(--rb-red)]/40" aria-hidden="true" />
        </div>
      </div>
    </section>
  );
}
