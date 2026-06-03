export default function WiiingsSection() {
  return (
    <section
      id="wiiings"
      className="scroll-section absolute inset-0 flex items-start justify-end pr-[clamp(60px,8vw,140px)] pt-[clamp(100px,14vh,200px)]"
      style={{ opacity: 0 }}
      role="region"
      aria-label="Wiiings performance"
    >
      <div className="text-right max-w-[750px]">
        {/* Eyebrow */}
        <p
          className="rv text-[clamp(14px,1.6vw,20px)] tracking-[0.5em] uppercase text-[var(--rb-yellow)] mb-10 font-['var(--font-body)'] font-semibold"
          style={{ opacity: 0, transform: "translateY(30px)" }}
        >
          Athletic Performance
        </p>

        {/* Giant quotation mark — editorial anchor */}
        <div
          className="rv text-[var(--rb-red)] font-['var(--font-heading)'] font-black leading-none select-none"
          style={{
            fontSize: "clamp(80px,12vw,180px)",
            opacity: 0,
            transform: "translateY(30px)",
          }}
          aria-hidden="true"
        >
          &ldquo;
        </div>

        {/* The iconic quote — massive display type */}
        <h2
          className="rv font-['var(--font-heading)'] font-black tracking-[-0.03em] leading-[0.9] text-white"
          style={{
            fontSize: "clamp(56px,8vw,130px)",
            opacity: 0,
            transform: "translateY(30px)",
          }}
        >
          REDBULL
          <br />
          GIVES YOU
          <br />
          <span className="text-[var(--rb-red)]">WIIINGS</span>
        </h2>

        {/* Descriptor — bigger */}
        <p
          className="rv text-[clamp(18px,2.2vw,28px)] text-white/30 mt-10 max-w-[520px] ml-auto leading-relaxed font-['var(--font-body)'] font-light"
          style={{ opacity: 0, transform: "translateY(30px)" }}
        >
          Enhances performance, concentration, and reaction speed. The choice of
          champions — from F1 pilots to esports athletes.
        </p>

        {/* Accent line */}
        <div
          className="rv flex items-center justify-end gap-5 mt-10"
          style={{ opacity: 0, transform: "translateY(30px)" }}
        >
          <span className="text-[clamp(13px,1.4vw,18px)] tracking-[0.5em] uppercase text-white/25 font-['var(--font-body)'] font-medium">
            Performance &amp; Focus
          </span>
          <div className="w-14 h-[2px] bg-white/20" aria-hidden="true" />
        </div>
      </div>
    </section>
  );
}
