"use client";

import { useEffect, useRef } from "react";
import { animate, useReducedMotion } from "motion/react";

/** Smoothly counts from the previous value to the new one. */
export default function AnimatedNumber({ value, format }: { value: number; format: (n: number) => string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const prev = useRef(value);
  const reduce = useReducedMotion();

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (reduce) {
      el.textContent = format(value);
      prev.current = value;
      return;
    }
    const controls = animate(prev.current, value, {
      duration: 0.6,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (v) => {
        el.textContent = format(Math.round(v));
      },
    });
    prev.current = value;
    return () => controls.stop();
  }, [value, format, reduce]);

  return <span ref={ref}>{format(value)}</span>;
}
