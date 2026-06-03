export default function HeritageSection() {
  return (
    <section
      id="heritage"
      className="scroll-section absolute inset-0 flex items-center pl-[clamp(60px,8vw,160px)]"
      style={{ opacity: 0 }}
      role="region"
      aria-label="Heritage"
    >
      <div className="max-w-[700px]">
        {/* Eyebrow */}
        <p
          className="rv text-[clamp(14px,1.6vw,20px)] tracking-[0.5em] uppercase text-[var(--rb-yellow)] mb-8 font-['var(--font-body)'] font-semibold"
          style={{ opacity: 0, transform: "translateY(30px)" }}
        >
          Since 1987
        </p>

        {/* Headline — editorial with red accent */}
        <h2
          className="rv font-['var(--font-heading)'] font-black tracking-[-0.04em] leading-[0.92] text-white"
          style={{
            fontSize: "clamp(64px,10vw,140px)",
            opacity: 0,
            transform: "translateY(30px)",
          }}
        >
          BORN IN
          <br />
          <span className="text-[var(--rb-red)]">AUSTRIA</span>
        </h2>

        {/* Descriptor */}
        <p
          className="rv text-[clamp(18px,2.2vw,28px)] text-white/30 mt-10 max-w-[520px] leading-relaxed font-['var(--font-body)'] font-light"
          style={{ opacity: 0, transform: "translateY(30px)" }}
        >
          From a garage in Vienna to 172 countries. One vision between two friends
          became the world&apos;s number one energy drink.
        </p>

        {/* Accent line + stat */}
        <div
          className="rv flex items-center gap-5 mt-10"
          style={{ opacity: 0, transform: "translateY(30px)" }}
        >
          <div className="w-14 h-[2px] bg-[var(--rb-red)]/40" aria-hidden="true" />
          <span className="text-[clamp(13px,1.4vw,18px)] tracking-[0.45em] uppercase text-white/25 font-['var(--font-body)'] font-medium">
            172 Countries Worldwide
          </span>
        </div>
      </div>
    </section>
  );
}
