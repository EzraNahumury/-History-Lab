import { useState } from "react";
import { explore, site } from "../data/content";
import { Container, Eyebrow, ArrowIcon } from "./ui";
import Reveal from "./Reveal";

export default function ExploreTabs() {
  const [active, setActive] = useState(0);
  const tab = explore[active];

  return (
    <section className="py-16 sm:py-24">
      <Container>
        <Reveal>
          <h2 className="text-3xl font-black tracking-tight sm:text-4xl">Explore the platform</h2>
        </Reveal>

        <div className="no-scrollbar mt-8 flex gap-2 overflow-x-auto pb-1">
          {explore.map((t, i) => (
            <button
              key={t.id}
              onClick={() => setActive(i)}
              className={
                active === i
                  ? "shrink-0 rounded-full bg-ink px-5 py-2.5 text-sm font-semibold text-canvas"
                  : "shrink-0 rounded-full border border-ink/15 bg-white px-5 py-2.5 text-sm font-medium text-ink/65 transition hover:border-ink/40"
              }
            >
              {t.label}
            </button>
          ))}
        </div>

        <Reveal key={tab.id}>
          <div className="mt-8 grid gap-8 rounded-3xl border border-ink/10 bg-white p-7 sm:p-10 lg:grid-cols-2">
            <div className="flex flex-col justify-center">
              <Eyebrow>{tab.label}</Eyebrow>
              <h3 className="mt-3 text-2xl font-black tracking-tight">{tab.title}</h3>
              <p className="mt-3 text-ink/60">{tab.body}</p>
              <a
                href={site.github}
                target="_blank"
                rel="noreferrer"
                className="group mt-6 inline-flex w-fit items-center gap-2 text-sm font-semibold text-ink"
              >
                Read the docs
                <ArrowIcon className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </a>
            </div>
            <ul className="grid content-center gap-3">
              {tab.points.map((p) => (
                <li key={p} className="flex items-center gap-3 rounded-2xl border border-ink/10 bg-canvas px-4 py-3.5 text-sm font-medium text-ink/80">
                  <span className="grid h-6 w-6 shrink-0 place-items-center rounded-full bg-ink text-canvas">
                    <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="none"><path d="M5 13l4 4L19 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
                  </span>
                  {p}
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
