export default function HeroSection() {
  return (
    <section
      id="hero"
      className="scroll-section absolute inset-0 flex flex-col justify-center pl-[clamp(60px,8vw,160px)] pt-[clamp(80px,12vh,140px)]"
      style={{ opacity: 1 }}
      role="region"
      aria-label="Hero"
    >
      <div className="max-w-[700px]">
        {/* Eyebrow — refined mono accent */}
        <div
          className="rv flex items-center gap-4 mb-10"
          style={{ opacity: 0, transform: "translateY(30px)" }}
        >
          <div className="w-12 h-[2px] bg-[var(--rb-red)]" aria-hidden="true" />
          <span className="text-[clamp(14px,1.6vw,20px)] tracking-[0.6em] uppercase text-[var(--rb-red)] font-['var(--font-body)'] font-semibold">
            Est. 1987 · Austria
          </span>
        </div>

        {/* Logo — clean brand mark */}
        <img
          src="/redbull.svg"
          alt="Red Bull"
          className="rv h-[clamp(50px,7vw,100px)] w-auto mb-10"
          style={{ opacity: 0, transform: "translateY(30px)" }}
        />

        {/* Headline — massive editorial display */}
        <h1
          className="rv font-['var(--font-heading)'] font-black leading-[0.88] tracking-[-0.04em] text-white"
          style={{
            fontSize: "clamp(68px,10vw,150px)",
            opacity: 0,
            transform: "translateY(30px)",
          }}
        >
          Gives You
          <br />
          <span className="text-[var(--rb-red)]">Wiiings</span>
        </h1>

        {/* Subline — whispered descriptor */}
        <p
          className="rv text-[clamp(18px,2.2vw,28px)] text-white/40 mt-10 max-w-[550px] leading-relaxed font-['var(--font-body)'] font-light"
          style={{ opacity: 0, transform: "translateY(30px)" }}
        >
          The world&apos;s most iconic energy drink. Trusted by athletes,
          creators, and dreamers across 172 countries.
        </p>

        {/* Accent line — editorial finish */}
        <div
          className="rv flex items-center gap-5 mt-12"
          style={{ opacity: 0, transform: "translateY(30px)" }}
        >
          <div className="w-16 h-[2px] bg-white/15" aria-hidden="true" />
          <span className="text-[clamp(13px,1.4vw,18px)] tracking-[0.5em] uppercase text-white/25 font-['var(--font-body)'] font-medium">
            Energy Redefined
          </span>
        </div>
      </div>
    </section>
  );
}
