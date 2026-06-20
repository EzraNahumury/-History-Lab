import { steps } from "../data/content";
import { Container, Eyebrow } from "./ui";
import Reveal from "./Reveal";

export default function HowItWorks() {
  return (
    <section id="how" className="py-16 sm:py-24">
      <Container>
        <Reveal>
          <div className="max-w-2xl">
            <Eyebrow>How it works</Eyebrow>
            <h2 className="mt-3 text-3xl font-black tracking-tight sm:text-4xl">Four beats, one tight loop</h2>
          </div>
        </Reveal>

        <div className="mt-12 grid gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((s, i) => (
            <Reveal key={s.n} delay={i * 90}>
              <div className="relative">
                <div className="flex items-center gap-3">
                  <span className="text-5xl font-black leading-none text-ink/10">{s.n}</span>
                  {i < steps.length - 1 && <span className="hidden h-px flex-1 bg-ink/10 lg:block" />}
                </div>
                <div className="mt-5 h-px w-full bg-ink/10 lg:hidden" />
                <h3 className="mt-4 text-lg font-bold">{s.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-ink/55">{s.body}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
