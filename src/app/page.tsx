"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import LoadingScreen from "@/components/LoadingScreen";
import StaggeredMenu from "@/components/StaggeredMenu";
import HeroSection from "@/components/sections/HeroSection";
import CaffeineSection from "@/components/sections/CaffeineSection";
import WiiingsSection from "@/components/sections/WiiingsSection";
import StatsSection from "@/components/sections/StatsSection";
import HeritageSection from "@/components/sections/HeritageSection";
import FuelSection from "@/components/sections/FuelSection";
import CTASection from "@/components/sections/CTASection";
import AuthorSection from "@/components/sections/AuthorSection";

gsap.registerPlugin(ScrollTrigger);

function lerp(a: number, b: number, t: number) {
  return a + (b - a) * t;
}

function smoothstep(t: number) {
  return t * t * (3 - 2 * t);
}

function interpolateKeyframes(
  keyframes: { at: number; x: number; y: number; rot: number; scale: number }[],
  progress: number,
): { x: number; y: number; rot: number; scale: number } {
  for (let i = 0; i < keyframes.length - 1; i++) {
    const a = keyframes[i];
    const b = keyframes[i + 1];
    if (progress >= a.at && progress <= b.at) {
      const range = b.at - a.at;
      const t = range === 0 ? 0 : (progress - a.at) / range;
      const s = smoothstep(t);
      return {
        x: lerp(a.x, b.x, s),
        y: lerp(a.y, b.y, s),
        rot: lerp(a.rot, b.rot, s),
        scale: lerp(a.scale, b.scale, s),
      };
    }
  }
  const last = keyframes[keyframes.length - 1];
  return { x: last.x, y: last.y, rot: last.rot, scale: last.scale };
}

const SECTION_IDS = [
  "hero",
  "caffeine",
  "wiiings",
  "stats",
  "heritage",
  "fuel",
  "cta",
  "author",
] as const;

const MODEL_KEYFRAMES = [
  // Hero — text LEFT → can RIGHT (far edge)
  { at: 0.0,  x: 38,  y: 0,   rot: 0,    scale: 1.0  },
  { at: 0.06, x: 38,  y: 0,   rot: 0,    scale: 1.0  },
  // Caffeine — text RIGHT → can LEFT (far edge)
  { at: 0.13, x: -38, y: -8,  rot: -3,   scale: 1.02 },
  { at: 0.24, x: -38, y: -8,  rot: -3,   scale: 1.02 },
  // Wiiings — text RIGHT → can LEFT (far edge, lower to avoid text)
  { at: 0.31, x: -40, y: 18,   rot: 4,    scale: 0.97 },
  { at: 0.44, x: -40, y: 18,   rot: 4,    scale: 0.97 },
  // Stats — text RIGHT → can LEFT (far edge)
  { at: 0.5,  x: -38, y: -12, rot: -2,   scale: 1.04 },
  { at: 0.62, x: -38, y: -12, rot: -2,   scale: 1.04 },
  // Heritage — text LEFT → can RIGHT (far edge)
  { at: 0.68, x: 38,  y: 4,   rot: 3,    scale: 0.98 },
  { at: 0.8,  x: 38,  y: 4,   rot: 3,    scale: 0.98 },
  // Fuel — text LEFT → can RIGHT (far edge)
  { at: 0.86, x: 36,  y: -6,  rot: -1.5, scale: 1.01 },
  // CTA + Author — center
  { at: 0.93, x: 0,   y: 0,   rot: 0,    scale: 1.0  },
  { at: 1.0,  x: 0,   y: 0,   rot: 0,    scale: 1.0  },
];

/** Glow intensity per section (0–1) */
const GLOW_INTENSITY = [0.3, 0.5, 0.6, 0.4, 0.35, 0.5, 0.7, 0.15];

/** Animate section visibility via DOM — called from GSAP callback */
function applySectionVisibility(idx: number) {
  const sections = document.querySelectorAll<HTMLElement>(".scroll-section");
  sections.forEach((section, i) => {
    const els = section.querySelectorAll<HTMLElement>(".rv");
    if (i === idx) {
      section.style.opacity = "1";
      section.style.pointerEvents = "auto";
      els.forEach((el, j) => {
        el.style.transition = `opacity 0.35s ${j * 0.07}s cubic-bezier(0.16,1,0.3,1), transform 0.4s ${j * 0.07}s cubic-bezier(0.16,1,0.3,1)`;
        el.style.opacity = "1";
        el.style.transform = "translateY(0)";
      });
    } else {
      section.style.opacity = "0";
      section.style.pointerEvents = "none";
      els.forEach((el) => {
        el.style.transition = "opacity 0.2s ease-in, transform 0.2s ease-in";
        el.style.opacity = "0";
        el.style.transform = "translateY(20px)";
      });
    }
  });
}

let wakeRaf: (() => void) | null = null;

export default function Home() {
  const containerRef = useRef<HTMLDivElement>(null);
  const modelElRef = useRef<HTMLDivElement>(null);
  const canWrapperRef = useRef<HTMLDivElement>(null);
  const modelPos = useRef({ x: 0, y: 0, rot: 0, scale: 1 });
  const modelTarget = useRef({ x: 0, y: 0, rot: 0, scale: 1 });
  const rafRef = useRef<number>(0);
  const [loaded, setLoaded] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  const handleReady = useCallback(() => setLoaded(true), []);

  // Detect touch devices
  useEffect(() => {
    setIsTouchDevice(
      "ontouchstart" in window ||
        navigator.maxTouchPoints > 0 ||
        window.matchMedia("(pointer: coarse)").matches,
    );
  }, []);

  useEffect(() => {
    if (!loaded) return;
    applySectionVisibility(0);

    let idle = true;

    const animate = () => {
      const { x: tx, y: ty, rot: tr, scale: ts } = modelTarget.current;
      const { x: px, y: py, rot: pr, scale: ps } = modelPos.current;
      modelPos.current = {
        x: px + (tx - px) * 0.06,
        y: py + (ty - py) * 0.06,
        rot: pr + (tr - pr) * 0.05,
        scale: ps + (ts - ps) * 0.05,
      };
      if (modelElRef.current) {
        const { x, y, rot, scale } = modelPos.current;
        modelElRef.current.style.transform =
          `translateX(${x}vw) translateY(${y}px) rotate(${rot}deg) scale(${scale})`;
      }
      if (
        Math.abs(tx - modelPos.current.x) > 0.01 ||
        Math.abs(ty - modelPos.current.y) > 0.01 ||
        Math.abs(tr - modelPos.current.rot) > 0.01 ||
        Math.abs(ts - modelPos.current.scale) > 0.001
      ) {
        idle = false;
        rafRef.current = requestAnimationFrame(animate);
      } else {
        idle = true;
      }
    };

    const wakeLoop = () => {
      if (idle) {
        idle = false;
        rafRef.current = requestAnimationFrame(animate);
      }
    };

    rafRef.current = requestAnimationFrame(animate);

    // Expose wake for ScrollTrigger
    wakeRaf = wakeLoop;

    return () => {
      cancelAnimationFrame(rafRef.current);
      idle = true;
    };
  }, [loaded]);

  // Handle prefers-reduced-motion
  useEffect(() => {
    if (typeof window === "undefined") return;
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const handler = (e: MediaQueryListEvent | MediaQueryList) => {
      if (e.matches) {
        // Show all sections immediately, no stagger
        const sections = document.querySelectorAll<HTMLElement>(".scroll-section");
        sections.forEach((section) => {
          section.style.opacity = "1";
          section.style.pointerEvents = "auto";
          const els = section.querySelectorAll<HTMLElement>(".rv");
          els.forEach((el) => {
            el.style.transition = "none";
            el.style.opacity = "1";
            el.style.transform = "translateY(0)";
          });
        });
      }
    };
    handler(mq);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, [loaded]);

  useEffect(() => {
    if (!loaded) return;

    const ctx = gsap.context(() => {
      const root = containerRef.current!;

      gsap.to(".rb-progress-fill", {
        scaleX: 1,
        ease: "none",
        scrollTrigger: {
          trigger: root,
          start: "top top",
          end: "bottom bottom",
          scrub: 0.2,
        },
      });

      let activeIdx = 0;

      ScrollTrigger.create({
        trigger: root,
        start: "top top",
        end: "bottom bottom",
        snap: {
          snapTo: 1 / (SECTION_IDS.length - 1),
          duration: { min: 0.15, max: 0.3 },
          delay: 0,
          ease: "power3.inOut",
        },
        onUpdate: (self) => {
          const progress = self.progress;
          const idx = Math.round(progress * (SECTION_IDS.length - 1));

          modelTarget.current = interpolateKeyframes(MODEL_KEYFRAMES, progress);

          const glowEl = modelElRef.current?.querySelector<HTMLElement>(".rb-can-glow");
          if (glowEl) {
            const intensity = GLOW_INTENSITY[idx] ?? 0.3;
            glowEl.style.opacity = String(intensity);
          }

          if (idx !== activeIdx) {
            activeIdx = idx;
            setActiveIndex(idx);
            applySectionVisibility(idx);

            if (wakeRaf) wakeRaf();

            if (canWrapperRef.current) {
              const isAuthor = idx === SECTION_IDS.length - 1;
              canWrapperRef.current.style.transition = `opacity ${isAuthor ? "0.4s" : "0.5s"} ${isAuthor ? "ease-out" : "ease-in"}`;
              canWrapperRef.current.style.opacity = isAuthor ? "0" : "1";
            }
          }
        },
      });

      gsap.fromTo(
        ".sidebar-text",
        { opacity: 0 },
        { opacity: 1, duration: 1, delay: 0.2, ease: "power2.out" },
      );
    }, containerRef);

    return () => ctx.revert();
  }, [loaded]);

  // Keyboard navigation — arrow keys to jump sections
  useEffect(() => {
    if (!loaded) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowDown" || e.key === "PageDown") {
        e.preventDefault();
        const next = Math.min(activeIndex + 1, SECTION_IDS.length - 1);
        scrollToSection(next);
      } else if (e.key === "ArrowUp" || e.key === "PageUp") {
        e.preventDefault();
        const prev = Math.max(activeIndex - 1, 0);
        scrollToSection(prev);
      } else if (e.key === "Home") {
        e.preventDefault();
        scrollToSection(0);
      } else if (e.key === "End") {
        e.preventDefault();
        scrollToSection(SECTION_IDS.length - 1);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [loaded, activeIndex]);

  const scrollToSection = (idx: number) => {
    const totalScroll =
      document.documentElement.scrollHeight - window.innerHeight;
    const target = (idx / (SECTION_IDS.length - 1)) * totalScroll;
    window.scrollTo({ top: target, behavior: "smooth" });
  };

  return (
    <>
      <LoadingScreen onReady={handleReady} />

      {loaded && (
        <>
          {/* Skip to content link for keyboard users */}
          <a
            href="#hero"
            className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[200] focus:bg-[var(--rb-red)] focus:text-white focus:px-4 focus:py-2 focus:rounded"
          >
            Skip to content
          </a>

          <StaggeredMenu
            position="right"
            isFixed={true}
            colors={["#0a0505", "#1a0808", "#120606"]}
            accentColor="#E21B4D"
            logoUrl="/redbull.svg"
            menuButtonColor="#FFD300"
            openMenuButtonColor="#E21B4D"
            items={SECTION_IDS.slice(0, 6).map((id) => ({
              label: id.charAt(0).toUpperCase() + id.slice(1),
              ariaLabel: `Go to ${id}`,
              link: `#${id}`,
            }))}
            socialItems={[
              {
                label: "Instagram",
                link: "https://www.instagram.com/m0_kiii/",
              },
              { label: "Twitter / X", link: "https://x.com/M0kiiii" },
              { label: "Website", link: "https://m0-kii.vercel.app" },
              { label: "GitHub", link: "https://github.com/M0-Kii" },
            ]}
            onMenuClose={() => {}}
          />

          <div
            ref={containerRef}
            className="relative"
            style={{ height: "900vh" }}
          >
            <div
              className="fixed top-0 left-0 right-0 z-50 h-[2px] bg-white/5"
              role="progressbar"
              aria-label="Page scroll progress"
            >
              <div
                className="rb-progress-fill h-full bg-gradient-to-r from-[var(--rb-red)] to-[var(--rb-yellow)] origin-left"
                style={{ transform: "scaleX(0)" }}
              />
            </div>

            <div
              className="sidebar-text fixed right-8 top-1/2 -translate-y-1/2 z-30 pointer-events-none opacity-0"
              aria-hidden="true"
            >
              <div className="flex flex-col items-center gap-4">
                <div className="w-[2px] h-16 bg-gradient-to-b from-transparent via-[var(--rb-red)]/40 to-transparent" />
                <p className="rotate-90 origin-center text-[clamp(11px,1.2vw,14px)] tracking-[0.8em] uppercase text-white/20 font-['var(--font-body)'] font-medium whitespace-nowrap">
                  Wiiings
                </p>
                <div className="w-[2px] h-16 bg-gradient-to-b from-transparent via-[var(--rb-yellow)]/30 to-transparent" />
              </div>
            </div>

            <div
              ref={canWrapperRef}
              className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-[15] pointer-events-none"
              style={{ willChange: "opacity" }}
              aria-hidden="true"
            >
              <div
                ref={modelElRef}
                style={{
                  willChange: "transform",
                  transform: "translateX(0vw)",
                }}
              >
                <div className="rb-can-inner">
                  <div className="rb-can-glow" />
                  <Image
                    src="/redbull.webp"
                    alt="Red Bull energy drink can"
                    width={300}
                    height={620}
                    className="relative h-[clamp(300px,55vh,620px)] w-auto object-contain drop-shadow-[0_30px_60px_rgba(226,27,77,0.25)]"
                    draggable={false}
                    priority
                  />
                </div>
              </div>
            </div>

            <div className="fixed inset-0 z-[4] pointer-events-none bg-[radial-gradient(ellipse_at_center,transparent_20%,rgba(0,0,0,0.7)_100%)]" />

            <div className="fixed inset-0 z-[16] pointer-events-none">
              <HeroSection />
              <CaffeineSection />
              <WiiingsSection />
              <StatsSection />
              <HeritageSection />
              <FuelSection />
              <CTASection />
              <AuthorSection />
            </div>

            <div
              className="fixed bottom-8 left-1/2 -translate-x-1/2 z-20 flex items-center gap-3 opacity-40"
              aria-hidden="true"
            >
              <div className="w-10 h-[1px] bg-white/30" />
              <p className="text-[10px] tracking-[0.3em] uppercase text-white/50 font-['var(--font-body)'] font-medium">
                Scroll
              </p>
              <div className="w-10 h-[1px] bg-white/30" />
            </div>
          </div>
        </>
      )}
    </>
  );
}
