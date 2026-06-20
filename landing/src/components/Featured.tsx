import { useRef } from "react";
import { featured, site } from "../data/content";
import { Container, TONE_GRADIENT } from "./ui";
import Reveal from "./Reveal";

export default function Featured() {
  const trackRef = useRef<HTMLDivElement>(null);
  const scroll = (dir: number) => trackRef.current?.scrollBy({ left: dir * 320, behavior: "smooth" });

  return (
    <section id="features" className="py-16 sm:py-24">
      <Container>
        <div className="flex items-end justify-between gap-4">
          <Reveal>
            <h2 className="text-3xl font-black tracking-tight sm:text-4xl">Featured</h2>
          </Reveal>
          <div className="flex items-center gap-4">
            <a href={site.github} target="_blank" rel="noreferrer" className="hidden text-sm font-semibold text-ink/55 transition hover:text-ink sm:inline">
              See all
            </a>
            <div className="flex gap-2">
              <button onClick={() => scroll(-1)} aria-label="Previous" className="grid h-10 w-10 place-items-center rounded-full border border-ink/15 bg-white text-ink transition hover:bg-ink hover:text-canvas">
                <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none"><path d="M15 6l-6 6 6 6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /></svg>
              </button>
              <button onClick={() => scroll(1)} aria-label="Next" className="grid h-10 w-10 place-items-center rounded-full bg-ink text-canvas transition hover:opacity-90">
                <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none"><path d="M9 6l6 6-6 6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /></svg>
              </button>
            </div>
          </div>
        </div>

        <div ref={trackRef} className="no-scrollbar mt-8 flex snap-x gap-5 overflow-x-auto pb-2">
          {featured.map((card) => (
            <article
              key={card.title}
              className="group w-[280px] shrink-0 snap-start overflow-hidden rounded-2xl border border-ink/10 bg-white transition hover:-translate-y-1 hover:shadow-card sm:w-[300px]"
            >
              <div className={`relative h-48 bg-gradient-to-br ${TONE_GRADIENT[card.tone]}`}>
                <span className="absolute right-3 top-3 rounded-full bg-white/90 px-2.5 py-1 text-[10px] font-bold text-ink">{card.meta}</span>
                <div className="absolute -bottom-10 -left-8 h-32 w-32 rounded-full bg-white/10 blur-2xl transition-transform duration-500 group-hover:scale-125" />
              </div>
              <div className="p-5">
                <h3 className="text-[16px] font-bold leading-snug text-ink">{card.title}</h3>
                <p className="mt-1.5 text-sm text-ink/50">{card.sub}</p>
                <div className="mt-4 flex items-center justify-between">
                  <span className="rounded-full border border-ink/15 px-3 py-1 text-[11px] font-semibold text-ink/60">Anna-native</span>
                  <span className="grid h-8 w-8 place-items-center rounded-full bg-ink/5 text-ink transition group-hover:bg-ink group-hover:text-canvas">
                    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none"><path d="M7 17L17 7M9 7h8v8" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" /></svg>
                  </span>
                </div>
              </div>
            </article>
          ))}
        </div>
      </Container>
    </section>
  );
}
