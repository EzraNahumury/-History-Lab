import { useCases, site } from "../data/content";
import { Container, TONE_GRADIENT, ArrowIcon } from "./ui";
import Reveal from "./Reveal";

const dotTones = ["navy", "violet", "amber", "stone"] as const;

function Pill({ label, index }: { label: string; index: number }) {
  return (
    <span className="inline-flex shrink-0 items-center gap-2.5 rounded-full border border-ink/15 bg-white px-4 py-2.5 text-sm font-semibold text-ink/80 shadow-sm transition hover:-translate-y-0.5 hover:border-ink/40">
      <span className={`h-5 w-5 rounded-full bg-gradient-to-br ${TONE_GRADIENT[dotTones[index % dotTones.length]]}`} />
      {label}
    </span>
  );
}

export default function UseCasePills() {
  return (
    <section className="py-16 sm:py-24">
      <Container>
        <Reveal>
          <h2 className="text-center text-3xl font-black tracking-tight sm:text-4xl">{useCases.title}</h2>
        </Reveal>

        <div className="mt-10 space-y-4">
          {useCases.rows.map((row, r) => (
            <Reveal key={r} delay={r * 80}>
              <div className="no-scrollbar flex gap-3 overflow-x-auto pb-1 sm:flex-wrap sm:justify-center sm:overflow-visible">
                {row.map((label, i) => (
                  <Pill key={label} label={label} index={r * 5 + i} />
                ))}
              </div>
            </Reveal>
          ))}
        </div>

        <div className="mt-10 flex justify-center">
          <a
            href={site.github}
            target="_blank"
            rel="noreferrer"
            className="group inline-flex items-center gap-2 rounded-full bg-ink px-5 py-3 text-sm font-semibold text-canvas transition hover:opacity-90"
          >
            All Features
            <ArrowIcon className="h-4 w-4 -rotate-45 transition-transform group-hover:rotate-0" />
          </a>
        </div>
      </Container>
    </section>
  );
}
