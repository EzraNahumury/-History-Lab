import { useState } from "react";
import { nav, site } from "../data/content";

function Logo() {
  return (
    <a href="#top" className="flex items-center gap-2.5">
      <span className="grid h-9 w-9 place-items-center rounded-xl bg-ink text-canvas">
        <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" aria-hidden="true">
          <path d="M12 3l8 4v2H4V7l8-4z" fill="currentColor" />
          <path d="M6 10v7M10 10v7M14 10v7M18 10v7" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
          <path d="M4 19h16" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
        </svg>
      </span>
      <span className="text-[17px] font-extrabold tracking-tight">History Lab</span>
    </a>
  );
}

export default function Navbar({ onLaunch }: { onLaunch: () => void }) {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-ink/10 bg-canvas/80 backdrop-blur-md">
      <div className="mx-auto grid w-full max-w-7xl grid-cols-2 items-center px-5 py-3.5 sm:px-8 md:grid-cols-3">
        {/* left menu */}
        <nav className="hidden items-center gap-7 text-sm font-medium text-ink/70 md:flex">
          {nav.map((item) => (
            <a
              key={item.label}
              href={item.href}
              target={item.external ? "_blank" : undefined}
              rel={item.external ? "noreferrer" : undefined}
              className="transition-colors hover:text-ink"
            >
              {item.label}
            </a>
          ))}
        </nav>

        {/* center logo */}
        <div className="flex md:justify-center">
          <Logo />
        </div>

        {/* right actions */}
        <div className="flex items-center justify-end gap-2.5">
          <button aria-label="Search" className="grid h-9 w-9 place-items-center rounded-full border border-ink/15 bg-white text-ink/70 transition hover:text-ink">
            <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" aria-hidden="true">
              <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="1.7" />
              <path d="M20 20l-3.2-3.2" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
            </svg>
          </button>
          <a
            href={site.github}
            target="_blank"
            rel="noreferrer"
            className="hidden rounded-full border border-ink/15 bg-white px-4 py-2 text-sm font-semibold text-ink/80 transition hover:border-ink/40 lg:inline-flex"
          >
            Docs
          </a>
          <button
            onClick={onLaunch}
            className="hidden rounded-full bg-ink px-4 py-2 text-sm font-semibold text-canvas transition hover:opacity-90 sm:inline-flex"
          >
            Launch App
          </button>
          <button
            aria-label="Menu"
            onClick={() => setOpen((v) => !v)}
            className="grid h-9 w-9 place-items-center rounded-full border border-ink/15 bg-white text-ink transition hover:bg-ink hover:text-canvas md:hidden"
          >
            <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" aria-hidden="true">
              <path d={open ? "M6 6l12 12M18 6L6 18" : "M4 7h16M4 12h16M4 17h16"} stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
            </svg>
          </button>
        </div>
      </div>

      {/* mobile menu */}
      {open && (
        <div className="border-t border-ink/10 bg-canvas md:hidden">
          <div className="mx-auto flex w-full max-w-7xl flex-col gap-1 px-5 py-3 sm:px-8">
            {nav.map((item) => (
              <a
                key={item.label}
                href={item.href}
                target={item.external ? "_blank" : undefined}
                rel={item.external ? "noreferrer" : undefined}
                onClick={() => setOpen(false)}
                className="rounded-lg px-3 py-2.5 text-sm font-medium text-ink/80 transition hover:bg-ink/5"
              >
                {item.label}
              </a>
            ))}
            <button
              onClick={() => {
                setOpen(false);
                onLaunch();
              }}
              className="mt-1 rounded-lg bg-ink px-3 py-2.5 text-center text-sm font-semibold text-canvas"
            >
              Launch App
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
