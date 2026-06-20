import { useState } from "react";
import { workflows, workflowFilters, type Tone } from "../data/content";
import { Container, TONE_GRADIENT } from "./ui";
import Reveal from "./Reveal";

const tones: Tone[] = ["navy", "violet", "amber", "stone"];

export default function KeyWorkflows() {
  const [active, setActive] = useState(0);

  return (
    <section id="workflows" className="py-16 sm:py-24">
      <Container>
        <div className="flex flex-col items-center gap-6 text-center sm:flex-row sm:items-end sm:justify-between sm:text-left">
          <Reveal>
            <div>
              <h2 className="text-3xl font-black tracking-tight sm:text-4xl">Anna primitives at work</h2>
              <p className="mt-2 max-w-md text-ink/55">The host capabilities History Lab composes into a single, reviewable loop.</p>
            </div>
          </Reveal>
          <div className="flex gap-1 rounded-full border border-ink/10 bg-white p-1">
            {workflowFilters.map((f, i) => (
              <button
                key={f}
                onClick={() => setActive(i)}
                className={
                  active === i
                    ? "rounded-full bg-ink px-4 py-1.5 text-sm font-semibold text-canvas"
                    : "rounded-full px-4 py-1.5 text-sm font-medium text-ink/55 transition hover:text-ink"
                }
              >
                {f}
              </button>
            ))}
          </div>
        </div>

        <div className="mt-10 grid gap-3 md:grid-cols-2">
          {workflows.map((w, i) => (
            <Reveal key={w.name} delay={(i % 2) * 70}>
              <div className="flex items-center gap-4 rounded-2xl border border-ink/10 bg-white p-4 transition hover:-translate-y-0.5 hover:shadow-soft">
                <span className="w-6 text-sm font-bold tabular-nums text-ink/30">{String(i + 1).padStart(2, "0")}</span>
                <span className={`grid h-11 w-11 shrink-0 place-items-center rounded-full bg-gradient-to-br ${TONE_GRADIENT[tones[i % tones.length]]}`}>
                  <span className="h-2.5 w-2.5 rounded-full bg-white/90" />
                </span>
                <div className="min-w-0 flex-1">
                  <p className="truncate font-bold text-ink">{w.name}</p>
                  <p className="truncate text-sm text-ink/50">{w.desc}</p>
                </div>
                <span className="shrink-0 rounded-full border border-ink/15 px-3 py-1 text-xs font-semibold text-ink/70">{w.metric}</span>
              </div>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
