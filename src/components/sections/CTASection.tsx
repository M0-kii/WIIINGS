export default function CTASection() {
  return (
    <section
      id="cta"
      className="scroll-section absolute inset-0 flex items-center justify-center"
      style={{ opacity: 0 }}
      role="region"
      aria-label="Call to action"
    >
      <div className="text-center max-w-[800px]">
        {/* Headline — commanding */}
        <h2
          className="rv font-['var(--font-heading)'] font-black tracking-[-0.04em] leading-[0.9] text-white"
          style={{
            fontSize: "clamp(72px,12vw,180px)",
            opacity: 0,
            transform: "translateY(30px)",
          }}
        >
          FIND YOUR
          <br />
          <span className="text-[var(--rb-red)]">WIIINGS.</span>
        </h2>

        {/* Descriptor */}
        <p
          className="rv text-[clamp(18px,2.2vw,28px)] text-white/35 mt-12 max-w-[550px] mx-auto leading-relaxed font-['var(--font-body)'] font-light"
          style={{ opacity: 0, transform: "translateY(30px)" }}
        >
          Available at retailers worldwide. Find your nearest Red Bull and unlock
          your potential.
        </p>

        {/* CTA button — refined with corner accents */}
        <a
          href="#"
          className="rv pointer-events-auto group relative inline-flex items-center gap-5 mt-14 px-20 py-7 border-2 border-white/15 text-white text-[clamp(14px,1.6vw,20px)] font-['var(--font-body)'] font-bold tracking-[0.35em] uppercase transition-all duration-500 hover:border-[var(--rb-red)] hover:text-[var(--rb-red)]"
          style={{ opacity: 0, transform: "translateY(30px)" }}
        >
          <span>Store Locator</span>
          <span className="transition-transform duration-300 group-hover:translate-x-2 text-xl">
            →
          </span>
          {/* Corner accents */}
          <span className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-white/15 group-hover:border-[var(--rb-red)] transition-colors duration-500" />
          <span className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-white/15 group-hover:border-[var(--rb-red)] transition-colors duration-500" />
          <span className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-white/15 group-hover:border-[var(--rb-red)] transition-colors duration-500" />
          <span className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-white/15 group-hover:border-[var(--rb-red)] transition-colors duration-500" />
        </a>
      </div>
    </section>
  );
}
