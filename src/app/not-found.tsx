import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0a0505] px-6">
      <div className="text-center">
        <h1 className="text-[clamp(64px,12vw,140px)] font-black tracking-[-0.04em] leading-none text-white font-['var(--font-heading)']">
          4<span className="text-[var(--rb-red)]">0</span>4
        </h1>
        <p className="text-[clamp(14px,1.6vw,20px)] text-white/30 mt-6 max-w-md font-['var(--font-body)'] font-light leading-relaxed">
          Looks like this page doesn&apos;t give you wings.
          <br />
          It doesn&apos;t exist at all.
        </p>
        <Link
          href="/"
          className="inline-flex items-center gap-3 mt-10 px-10 py-5 border border-white/15 text-white text-[clamp(12px,1.2vw,15px)] font-['var(--font-body)'] font-semibold tracking-[0.3em] uppercase transition-all duration-500 hover:border-[var(--rb-red)] hover:text-[var(--rb-red)]"
        >
          <span>Back to Home</span>
          <span className="transition-transform duration-300 group-hover:translate-x-2">
            →
          </span>
        </Link>
      </div>
    </div>
  );
}
