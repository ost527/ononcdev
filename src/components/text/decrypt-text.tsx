"use client";

import { useEffect, useRef, useState } from "react";
import { useInView } from "motion/react";
import { cn, prefersReducedMotion } from "@/lib/utils";

export interface DecryptTextProps {
  text: string;
  className?: string;
  /** Glyph pool shown while a character is still encrypted. */
  glyphs?: string;
  /** Milliseconds per reveal step. */
  speed?: number;
  /** Reveal left-to-right instead of in a scattered order. */
  sequential?: boolean;
  /** What starts the effect. */
  trigger?: "view" | "hover" | "mount";
}

const DEFAULT_GLYPHS =
  "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!<>-_\\/[]{}=+*^?#";

function shuffle(arr: number[]) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

/**
 * DecryptText — characters resolve out of random glyphs in a scattered order
 * (or left-to-right when sequential), like a decrypting cipher. The final text
 * is exposed via aria-label and the animated output is aria-hidden; reduced
 * motion shows the text immediately.
 */
export function DecryptText({
  text,
  className,
  glyphs = DEFAULT_GLYPHS,
  speed = 45,
  sequential = false,
  trigger = "view",
}: DecryptTextProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.4 });
  const [output, setOutput] = useState(text);
  const timer = useRef<ReturnType<typeof setInterval> | null>(null);

  const run = () => {
    if (prefersReducedMotion()) return;
    if (timer.current) clearInterval(timer.current);
    const indices = Array.from(text)
      .map((_, i) => i)
      .filter((i) => text[i] !== " ");
    const order = sequential ? indices : shuffle(indices);
    const revealed = new Set<number>();
    let step = 0;
    timer.current = setInterval(() => {
      if (step < order.length) {
        revealed.add(order[step]);
        step += 1;
      }
      let out = "";
      for (let i = 0; i < text.length; i++) {
        if (text[i] === " ") out += " ";
        else if (revealed.has(i)) out += text[i];
        else out += glyphs[Math.floor(Math.random() * glyphs.length)];
      }
      setOutput(out);
      if (step >= order.length) {
        setOutput(text);
        if (timer.current) clearInterval(timer.current);
      }
    }, speed);
  };

  useEffect(() => {
    if (trigger === "mount") run();
    else if (trigger === "view" && inView) run();
    return () => {
      if (timer.current) clearInterval(timer.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inView, trigger]);

  return (
    <span
      ref={ref}
      aria-label={text}
      onMouseEnter={trigger === "hover" ? run : undefined}
      className={cn("tabular-nums", className)}
    >
      <span aria-hidden>{output}</span>
    </span>
  );
}
