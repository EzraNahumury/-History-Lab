import { site } from "../data/content";
import { Container } from "./ui";

export default function Footer() {
  return (
    <footer className="border-t border-ink/10 bg-white/50">
      <Container className="py-12">
        <div className="flex flex-col justify-between gap-10 sm:flex-row">
          <div className="max-w-sm">
            <div className="flex items-center gap-2.5">
              <span className="grid h-8 w-8 place-items-center rounded-lg bg-ink text-canvas">
                <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" aria-hidden="true">
                  <path d="M12 3l8 4v2H4V7l8-4z" fill="currentColor" />
                  <path d="M6 10v7M10 10v7M14 10v7M18 10v7" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
                  <path d="M4 19h16" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
                </svg>
              </span>
              <span className="text-base font-extrabold tracking-tight">History Lab</span>
            </div>
            <p className="mt-4 text-sm leading-relaxed text-ink/55">{site.oneLiner}</p>
          </div>

          <div className="flex gap-12">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wide text-ink/40">Project</p>
              <ul className="mt-3 space-y-2 text-sm font-medium text-ink/70">
                <li><a href={site.github} target="_blank" rel="noreferrer" className="transition hover:text-ink">GitHub</a></li>
                <li><a href={site.github} target="_blank" rel="noreferrer" className="transition hover:text-ink">Docs</a></li>
                <li><a href="#how" className="transition hover:text-ink">How it works</a></li>
              </ul>
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-wide text-ink/40">Platform</p>
              <ul className="mt-3 space-y-2 text-sm font-medium text-ink/70">
                <li><a href={site.anna} target="_blank" rel="noreferrer" className="transition hover:text-ink">Anna</a></li>
                <li><a href={site.anna} target="_blank" rel="noreferrer" className="transition hover:text-ink">Hackathon</a></li>
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-10 flex flex-col gap-3 border-t border-ink/10 pt-6 text-xs text-ink/45 sm:flex-row sm:items-center sm:justify-between">
          <p>© 2026 History Lab · {site.tagline}</p>
          <p>Built for the {site.hackathon}</p>
        </div>
      </Container>
    </footer>
  );
}
