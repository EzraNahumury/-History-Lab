import type { ReactNode } from "react";
import type { Tone } from "../data/content";

export const TONE_GRADIENT: Record<Tone, string> = {
  navy: "from-[#1b2540] via-[#243156] to-[#0d1426]",
  violet: "from-[#3a2a5e] via-[#5b3f93] to-[#241a3c]",
  amber: "from-[#5a3d1e] via-[#9a6b2f] to-[#2e2113]",
  stone: "from-[#2a2a2a] via-[#444444] to-[#161616]",
};

export function Container({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <div className={`mx-auto w-full max-w-7xl px-5 sm:px-8 ${className}`}>{children}</div>;
}

export function Pill({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <span
      className={`inline-flex items-center gap-2 rounded-full border border-ink/15 bg-white px-4 py-2 text-sm font-medium text-ink/80 ${className}`}
    >
      {children}
    </span>
  );
}

export function Eyebrow({ children }: { children: ReactNode }) {
  return <p className="text-xs font-semibold uppercase tracking-[0.22em] text-ink/40">{children}</p>;
}

export function ArrowIcon({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
