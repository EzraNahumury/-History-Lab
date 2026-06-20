import { featured, site } from "../data/content";
import { Container, TONE_GRADIENT } from "./ui";
import Reveal from "./Reveal";

export default function Featured() {
  return (
    <section id="features" className="py-16 sm:py-24">
      <Container>
        <div className="flex items-end justify-between gap-4">
          <Reveal>
            <h2 className="text-3xl font-black tracking-tight sm:text-4xl">Featured</h2>
          </Reveal>
          <a href={site.github} target="_blank" rel="noreferrer" className="text-sm font-semibold text-ink/55 transition hover:text-ink">
            See all
          </a>
        </div>

        <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {featured.map((card, i) => (
            <Reveal key={card.title} delay={i * 70}>
              <article className="group h-full overflow-hidden rounded-2xl border border-ink/10 bg-white transition hover:-translate-y-1 hover:shadow-card">
                <div className={`relative h-44 bg-gradient-to-br ${TONE_GRADIENT[card.tone]}`}>
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
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
