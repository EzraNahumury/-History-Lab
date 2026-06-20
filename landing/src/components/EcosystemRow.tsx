import { ecosystem } from "../data/content";
import { Container } from "./ui";

export default function EcosystemRow() {
  return (
    <section className="mt-16 border-y border-ink/10 bg-white/40 py-8 sm:mt-24">
      <Container>
        <p className="mb-6 text-center text-xs font-semibold uppercase tracking-[0.22em] text-ink/35">
          Built on Anna runtime primitives
        </p>
        <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-4 sm:gap-x-12">
          {ecosystem.map((name) => (
            <span
              key={name}
              className="text-lg font-bold tracking-tight text-ink/30 transition-colors hover:text-ink/60 sm:text-xl"
            >
              {name}
            </span>
          ))}
        </div>
      </Container>
    </section>
  );
}
