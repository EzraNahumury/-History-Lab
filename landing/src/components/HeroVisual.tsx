import { heroCards } from "../data/content";
import { TONE_GRADIENT } from "./ui";

function Sparkle({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden="true">
      <path d="M12 0c.6 6 5.4 10.8 12 11.4v1.2C17.4 13.2 12.6 18 12 24c-.6-6-5.4-10.8-12-11.4v-1.2C6.6 10.8 11.4 6 12 0z" />
    </svg>
  );
}

function Stamp() {
  return (
    <div className="absolute -left-6 -top-6 z-30 h-24 w-24 sm:-left-8 sm:-top-8 sm:h-28 sm:w-28">
      <svg viewBox="0 0 120 120" className="h-full w-full animate-spinslow">
        <defs>
          <path id="hl-stamp" d="M60,60 m-46,0 a46,46 0 1,1 92,0 a46,46 0 1,1 -92,0" />
        </defs>
        <text className="fill-ink/70 text-[10px] font-semibold uppercase tracking-[0.18em]">
          <textPath href="#hl-stamp">HISTORY LAB • FACT-CHECK THE AI • HISTORY LAB • </textPath>
        </text>
      </svg>
      <span className="absolute inset-0 m-auto grid h-11 w-11 place-items-center rounded-full bg-ink text-canvas">
        <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" aria-hidden="true">
          <path d="M5 13l4 4L19 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </span>
    </div>
  );
}

function VisualCard({ card, className = "" }: { card: (typeof heroCards)[number]; className?: string }) {
  return (
    <div
      className={`absolute w-60 overflow-hidden rounded-2xl border border-ink/10 bg-white shadow-card transition-transform duration-500 hover:-translate-y-1 sm:w-64 ${className}`}
    >
      <div className={`relative h-28 bg-gradient-to-br ${TONE_GRADIENT[card.tone]}`}>
        <span className="absolute left-3 top-3 rounded-full bg-black/35 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wide text-white/90 backdrop-blur">
          {card.kicker}
        </span>
        <span className="absolute right-3 top-3 rounded-full bg-white/90 px-2.5 py-1 text-[10px] font-bold text-ink">
          {card.status}
        </span>
        <div className="absolute -bottom-8 -right-6 h-24 w-24 rounded-full bg-white/10 blur-xl" />
      </div>
      <div className="p-4">
        <h3 className="text-[15px] font-bold leading-snug text-ink">{card.title}</h3>
        <p className="mt-1 text-xs text-ink/50">{card.meta}</p>
        <div className="mt-3 flex items-center justify-between">
          <span className="rounded-full border border-ink/15 px-2.5 py-1 text-[10px] font-semibold text-ink/60">{card.badge}</span>
          <span className="grid h-7 w-7 place-items-center rounded-full bg-ink/5 text-ink">
            <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="none" aria-hidden="true">
              <path d="M5 13l4 4L19 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </span>
        </div>
      </div>
    </div>
  );
}

export default function HeroVisual() {
  return (
    <div className="relative mx-auto h-[440px] w-full max-w-[520px] sm:h-[480px] lg:h-[540px]">
      {/* orbit */}
      <svg viewBox="0 0 520 520" className="absolute inset-0 h-full w-full text-ink/15" fill="none" aria-hidden="true">
        <ellipse cx="270" cy="260" rx="230" ry="150" stroke="currentColor" strokeWidth="1.2" strokeDasharray="3 7" transform="rotate(-18 270 260)" />
        <ellipse cx="250" cy="270" rx="180" ry="120" stroke="currentColor" strokeWidth="1" strokeDasharray="2 8" transform="rotate(14 250 270)" />
      </svg>

      <Sparkle className="absolute right-6 top-2 h-6 w-6 text-ink animate-float" />
      <Sparkle className="absolute bottom-10 right-2 h-4 w-4 text-ink/70" />
      <Sparkle className="absolute bottom-2 left-12 h-5 w-5 text-ink/80 animate-float" />

      <Stamp />

      <VisualCard card={heroCards[2]} className="left-2 top-8 -rotate-6" />
      <VisualCard card={heroCards[1]} className="right-2 top-2 rotate-[7deg]" />
      <VisualCard card={heroCards[0]} className="bottom-6 left-1/2 -translate-x-1/2 rotate-[2deg] z-20" />
    </div>
  );
}
