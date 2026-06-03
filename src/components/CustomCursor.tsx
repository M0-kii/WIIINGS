"use client";

import { useEffect, useRef, useState } from "react";

function isTouchDevice() {
  if (typeof window === "undefined") return false;
  return (
    "ontouchstart" in window ||
    navigator.maxTouchPoints > 0 ||
    window.matchMedia("(pointer: coarse)").matches
  );
}

export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const posRef = useRef({ x: 0, y: 0 });
  const targetRef = useRef({ x: 0, y: 0 });
  const angleRef = useRef(0);
  const prevRef = useRef({ x: 0, y: 0 });
  const rafRef = useRef<number>(0);
  const isHoverRef = useRef(false);
  const [touchDevice, setTouchDevice] = useState(true); // default true to avoid flash

  useEffect(() => {
    setTouchDevice(isTouchDevice());
  }, []);

  useEffect(() => {
    if (touchDevice) return; // skip entirely on touch

    const cursor = cursorRef.current;
    if (!cursor) return;

    const handleMouseMove = (e: MouseEvent) => {
      targetRef.current = { x: e.clientX, y: e.clientY };
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const isHoverable =
        target.closest("a") ||
        target.closest("button") ||
        target.closest("[role='button']") ||
        target.closest(".sm-panel-item") ||
        target.closest(".sm-toggle");

      if (isHoverable && !isHoverRef.current) {
        isHoverRef.current = true;
        const img = cursor.querySelector("img");
        if (img) img.src = "/cursors/link.cur";
      } else if (!isHoverable && isHoverRef.current) {
        isHoverRef.current = false;
        const img = cursor.querySelector("img");
        if (img) img.src = "/cursors/pointer.cur";
      }
    };

    let idle = true;

    const animate = () => {
      const { x: tx, y: ty } = targetRef.current;
      const { x: px, y: py } = posRef.current;

      posRef.current = {
        x: px + (tx - px) * 0.08,
        y: py + (ty - py) * 0.08,
      };

      const dx = tx - prevRef.current.x;
      const dy = ty - prevRef.current.y;

      if (Math.abs(dx) > 0.3 || Math.abs(dy) > 0.3) {
        const targetAngle = Math.atan2(dy, dx) * (180 / Math.PI) + 90;
        let currentAngle = angleRef.current;
        let diff = targetAngle - currentAngle;

        while (diff > 180) diff -= 360;
        while (diff < -180) diff += 360;

        angleRef.current += diff * 0.04;
      }

      prevRef.current = { x: tx, y: ty };

      const scale = isHoverRef.current ? "scale(1.3)" : "scale(1)";
      cursor.style.transform = `translate(${posRef.current.x}px, ${posRef.current.y}px) translate(-50%, -50%) rotate(${angleRef.current}deg) ${scale}`;

      // Idle detection: stop looping if target matches position closely
      if (
        Math.abs(tx - posRef.current.x) > 0.01 ||
        Math.abs(ty - posRef.current.y) > 0.01
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

    window.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseover", handleMouseOver);
    rafRef.current = requestAnimationFrame(animate);

    // Re-wake on any mouse movement
    const onMouseMove = () => wakeLoop();
    window.addEventListener("mousemove", onMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseover", handleMouseOver);
      window.removeEventListener("mousemove", onMouseMove);
      cancelAnimationFrame(rafRef.current);
    };
  }, [touchDevice]);

  // Don't render anything on touch devices
  if (touchDevice) return null;

  return (
    <div
      ref={cursorRef}
      className="fixed top-0 left-0 z-[9999] pointer-events-none"
      style={{ willChange: "transform" }}
      aria-hidden="true"
    >
      <img
        src="/cursors/pointer.cur"
        alt=""
        className="w-12 h-12"
        draggable={false}
      />
    </div>
  );
}
