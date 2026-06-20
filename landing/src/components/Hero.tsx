import { hero } from "../data/content";
import { Container, ArrowIcon } from "./ui";
import HeroVisual from "./HeroVisual";
import Particles from "./Particles";
import Reveal from "./Reveal";

export default function Hero({ onLaunch }: { onLaunch: () => void }) {
  return (
    <section id="top" className="relative overflow-hidden pt-10 sm:pt-16">
      {/* animated particle background (non-interactive, sits behind content) */}
      <div className="pointer-events-none absolute inset-0 -z-0 opacity-[0.55]">
        <Particles
          particleColors={["#1b2540", "#7c8cff", "#b07bff", "#2b2222"]}
          particleCount={150}
          particleSpread={12}
          speed={0.12}
          particleBaseSize={90}
          sizeRandomness={1}
          alphaParticles={true}
          moveParticlesOnHover={false}
          disableRotation={false}
        />
      </div>
      {/* fade the particles into the page edges */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 -z-0 h-32 bg-gradient-to-t from-canvas to-transparent" />

      <Container className="relative z-10">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-8">
          {/* left */}
          <Reveal>
            <span className="inline-flex items-center gap-2 rounded-full border border-ink/15 bg-white/80 px-3.5 py-1.5 text-xs font-semibold text-ink/70 backdrop-blur">
              <span className="h-1.5 w-1.5 rounded-full bg-ink" />
              {hero.badge}
            </span>

            <h1 className="mt-6 text-[44px] font-black leading-[1.02] tracking-tight sm:text-6xl">
              {hero.headline.map((line, i) => (
                <span key={i} className="block">
                  {line}
                </span>
              ))}
            </h1>

            <p className="mt-6 max-w-md text-base leading-relaxed text-ink/60">{hero.sub}</p>

            <div className="mt-8 flex flex-wrap items-center gap-3">
              <button
                onClick={onLaunch}
                className="group inline-flex items-center gap-2 rounded-full bg-ink px-6 py-3.5 text-sm font-semibold text-canvas transition hover:opacity-90"
              >
                Play the Demo
                <ArrowIcon className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </button>
              <a
                href={hero.secondary.href}
                className="inline-flex items-center gap-2 rounded-full border border-ink/20 bg-white/80 px-6 py-3.5 text-sm font-semibold text-ink backdrop-blur transition hover:border-ink/50"
              >
                {hero.secondary.label}
              </a>
            </div>

            <dl className="mt-12 grid max-w-lg grid-cols-2 gap-y-6 sm:grid-cols-4 sm:gap-y-0">
              {hero.stats.map((s, i) => (
                <div key={s.label} className={i > 0 ? "sm:border-l sm:border-ink/10 sm:pl-5" : ""}>
                  <dt className="text-3xl font-black tracking-tight">{s.value}</dt>
                  <dd className="mt-1 text-xs font-medium uppercase tracking-wide text-ink/45">{s.label}</dd>
                </div>
              ))}
            </dl>
          </Reveal>

          {/* right visual */}
          <Reveal delay={120} className="lg:pl-6">
            <HeroVisual />
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
