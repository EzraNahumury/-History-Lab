import { problemSolution } from "../data/content";
import { Container, Eyebrow } from "./ui";
import Reveal from "./Reveal";

export default function ProblemSolution() {
  return (
    <section className="py-16 sm:py-24">
      <Container>
        <Reveal>
          <div className="max-w-2xl">
            <Eyebrow>Why it matters</Eyebrow>
            <h2 className="mt-3 text-3xl font-black tracking-tight sm:text-4xl">From a teaching problem to a playable solution</h2>
          </div>
        </Reveal>

        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {problemSolution.map((c, i) => {
            const dark = i === 1;
            return (
              <Reveal key={c.tag} delay={i * 80}>
                <div
                  className={`flex h-full flex-col rounded-3xl border p-7 transition duration-300 hover:-translate-y-1 hover:shadow-card ${
                    dark ? "border-ink bg-ink text-canvas" : "border-ink/10 bg-white"
                  }`}
                >
                  <span
                    className={`w-fit rounded-full px-3 py-1 text-[11px] font-bold uppercase tracking-wide ${
                      dark ? "bg-canvas/15 text-canvas" : "bg-ink/5 text-ink/60"
                    }`}
                  >
                    {c.tag}
                  </span>
                  <h3 className="mt-4 text-xl font-bold leading-snug">{c.title}</h3>
                  <p className={`mt-3 text-sm leading-relaxed ${dark ? "text-canvas/70" : "text-ink/55"}`}>{c.body}</p>
                </div>
              </Reveal>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
