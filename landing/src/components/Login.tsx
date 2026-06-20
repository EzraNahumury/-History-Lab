import { useState } from "react";

export default function Login({ onSuccess, onBack }: { onSuccess: (name: string) => void; onBack: () => void }) {
  const [name, setName] = useState("");

  function submit(e: React.FormEvent) {
    e.preventDefault();
    onSuccess(name.trim() || "Historian");
  }

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-canvas px-5">
      {/* soft decorative glows */}
      <div className="pointer-events-none absolute -left-24 -top-24 h-72 w-72 rounded-full bg-gradient-to-br from-[#7c8cff]/20 to-transparent blur-3xl" />
      <div className="pointer-events-none absolute -bottom-24 -right-24 h-72 w-72 rounded-full bg-gradient-to-br from-[#b07bff]/20 to-transparent blur-3xl" />

      <div className="relative w-full max-w-md rounded-3xl border border-ink/10 bg-white p-8 shadow-card sm:p-10">
        <div className="flex items-center gap-2.5">
          <span className="grid h-9 w-9 place-items-center rounded-xl bg-ink text-canvas">
            <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none"><path d="M12 3l8 4v2H4V7l8-4z" fill="currentColor" /><path d="M6 10v7M10 10v7M14 10v7M18 10v7M4 19h16" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" /></svg>
          </span>
          <span className="text-[17px] font-extrabold tracking-tight">History Lab</span>
        </div>

        <h1 className="mt-7 text-2xl font-black tracking-tight">Sign in to play</h1>
        <p className="mt-2 text-sm text-ink/55">Step into the lab as the reviewing historian. No account needed — this is the offline demo.</p>

        <form onSubmit={submit} className="mt-7 space-y-4">
          <label className="block">
            <span className="text-xs font-semibold uppercase tracking-wide text-ink/45">Your name</span>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Ezra"
              autoFocus
              className="mt-2 w-full rounded-xl border border-ink/15 bg-canvas px-4 py-3 text-sm text-ink outline-none transition focus:border-ink/50"
            />
          </label>

          <button type="submit" className="w-full rounded-xl bg-ink px-6 py-3.5 text-sm font-semibold text-canvas transition hover:opacity-90">
            Enter the Lab →
          </button>

          <div className="flex items-center gap-3 py-1">
            <span className="h-px flex-1 bg-ink/10" />
            <span className="text-[11px] uppercase tracking-wide text-ink/35">or</span>
            <span className="h-px flex-1 bg-ink/10" />
          </div>

          <button type="button" onClick={() => onSuccess("Historian")} className="flex w-full items-center justify-center gap-2 rounded-xl border border-ink/15 bg-white px-6 py-3.5 text-sm font-semibold text-ink/80 transition hover:border-ink/40">
            <span className="h-2 w-2 rounded-full bg-gradient-to-br from-[#7c8cff] to-[#b07bff]" />
            Continue with Anna
          </button>
        </form>

        <button onClick={onBack} className="mt-6 text-xs font-medium text-ink/45 transition hover:text-ink">← Back to home</button>
      </div>
    </div>
  );
}
