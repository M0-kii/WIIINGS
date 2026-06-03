"use client";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0a0505] px-6">
      <div className="text-center">
        <h1 className="text-[clamp(48px,8vw,96px)] font-black tracking-[-0.03em] leading-none text-white font-['var(--font-heading)']">
          <span className="text-[var(--rb-red)]">OOPS</span>.
        </h1>
        <p className="text-[clamp(14px,1.6vw,20px)] text-white/30 mt-6 max-w-md font-['var(--font-body)'] font-light leading-relaxed">
          Something went wrong. The can got dented.
          <br />
          Try again or head back home.
        </p>
        <button
          onClick={reset}
          className="inline-flex items-center gap-3 mt-10 px-10 py-5 border border-white/15 text-white text-[clamp(12px,1.2vw,15px)] font-['var(--font-body)'] font-semibold tracking-[0.3em] uppercase transition-all duration-500 hover:border-[var(--rb-red)] hover:text-[var(--rb-red)]"
        >
          <span>Try Again</span>
        </button>
      </div>
    </div>
  );
}
