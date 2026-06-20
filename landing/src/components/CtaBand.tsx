import { Container } from "./ui";
import Reveal from "./Reveal";

export default function CtaBand({ onLaunch }: { onLaunch: () => void }) {
  return (
    <section className="py-10 sm:py-16">
      <Container>
        <Reveal>
          <div className="relative overflow-hidden rounded-3xl bg-ink px-7 py-12 text-center text-canvas sm:px-12 sm:py-16">
            <div className="pointer-events-none absolute -right-16 -top-16 h-56 w-56 rounded-full bg-gradient-to-br from-[#7c8cff]/40 to-transparent blur-2xl" />
            <div className="pointer-events-none absolute -bottom-16 -left-16 h-56 w-56 rounded-full bg-gradient-to-br from-[#b07bff]/40 to-transparent blur-2xl" />
            <div className="relative">
              <h2 className="mx-auto max-w-2xl text-3xl font-black tracking-tight sm:text-4xl">Replay history. Catch the AI. Win the game.</h2>
              <p className="mx-auto mt-4 max-w-md text-canvas/65">Play the offline demo of History Lab right in your browser — no account, no keys.</p>
              <button onClick={onLaunch} className="mt-8 inline-flex items-center gap-2 rounded-full bg-canvas px-7 py-3.5 text-sm font-bold text-ink transition hover:opacity-90">
                Launch the demo
                <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none"><path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" /></svg>
              </button>
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
