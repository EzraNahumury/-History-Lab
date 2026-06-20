import { useState } from "react";
import { SCENARIO } from "./scenario";
import { initialRun, isCorrectFactCheck, recomputeAccuracy, type RunState, type Verdict } from "./logic";
import { TONE_GRADIENT } from "../components/ui";

type Phase = "intro" | "scene" | "ruling" | "verdict" | "storybook";

export default function Game({ player, onExit }: { player: string; onExit: () => void }) {
  const scenario = SCENARIO;
  const [phase, setPhase] = useState<Phase>("intro");
  const [turn, setTurn] = useState(0);
  const [run, setRun] = useState<RunState>(initialRun);
  const [choice, setChoice] = useState<number | null>(null);
  const [vres, setVres] = useState<{ correct: boolean; verdict: Verdict } | null>(null);

  const t = scenario.turns[turn];
  const opt = choice != null ? t.options[choice] : null;

  function pick(i: number) {
    setChoice(i);
    setPhase("ruling");
  }

  function decide(verdict: Verdict) {
    const o = t.options[choice!];
    const correct = isCorrectFactCheck(verdict, o.accurate);
    setRun((r) => {
      const total = r.total + 1;
      const corr = r.correct + (correct ? 1 : 0);
      return { ...r, total, correct: corr, accuracy: recomputeAccuracy(corr, total), flags: r.flags + (verdict === "flag" ? 1 : 0) };
    });
    setVres({ correct, verdict });
    setPhase("verdict");
  }

  function next() {
    const o = t.options[choice!];
    if (vres?.verdict === "approve") {
      setRun((r) => ({
        ...r,
        branch: [...r.branch, { turn: turn + 1, choice: o.label, ruling: o.ruling, whatReallyHappened: o.whatReallyHappened, correct: vres!.correct }],
      }));
      const nt = turn + 1;
      setChoice(null);
      setVres(null);
      if (nt >= scenario.turns.length) setPhase("storybook");
      else { setTurn(nt); setPhase("scene"); }
    } else {
      setChoice(null);
      setVres(null);
      setPhase("scene");
    }
  }

  function restart() {
    setRun(initialRun);
    setTurn(0);
    setChoice(null);
    setVres(null);
    setPhase("intro");
  }

  const acc = run.accuracy;
  const accColor = acc >= 80 ? "text-emerald-600" : acc >= 50 ? "text-amber-600" : "text-rose-600";

  return (
    <div className="flex min-h-screen flex-col bg-canvas">
      {/* top bar */}
      <header className="sticky top-0 z-10 border-b border-ink/10 bg-canvas/85 backdrop-blur-md">
        <div className="mx-auto flex w-full max-w-3xl items-center gap-4 px-5 py-3.5">
          <span className="grid h-8 w-8 place-items-center rounded-lg bg-ink text-canvas">
            <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none"><path d="M12 3l8 4v2H4V7l8-4z" fill="currentColor" /><path d="M6 10v7M10 10v7M14 10v7M18 10v7M4 19h16" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" /></svg>
          </span>
          <span className="text-sm font-extrabold tracking-tight">History Lab</span>
          {phase !== "intro" && phase !== "storybook" && (
            <span className="ml-auto rounded-full border border-ink/15 bg-white px-3.5 py-1.5 text-xs font-semibold tabular-nums">
              Turn {turn + 1} · Accuracy <span className={accColor}>{acc}%</span>
            </span>
          )}
          <button onClick={onExit} className={`${phase === "intro" || phase === "storybook" ? "ml-auto" : ""} rounded-full border border-ink/15 bg-white px-3.5 py-1.5 text-xs font-semibold text-ink/70 transition hover:text-ink`}>
            Exit
          </button>
        </div>
      </header>

      <main className="mx-auto flex w-full max-w-3xl flex-1 items-center px-5 py-10">
        <div className="w-full">
          {/* INTRO */}
          {phase === "intro" && (
            <div className="rounded-3xl border border-ink/10 bg-white p-8 text-center shadow-soft sm:p-12">
              <span className="inline-flex items-center gap-2 rounded-full bg-ink/5 px-3 py-1 text-xs font-bold uppercase tracking-wide text-ink/60">Demo · Mock mode</span>
              <h1 className="mx-auto mt-5 max-w-xl text-3xl font-black tracking-tight sm:text-4xl">{scenario.name}</h1>
              <p className="mx-auto mt-4 max-w-md text-ink/60">{scenario.blurb}</p>
              <p className="mx-auto mt-4 max-w-md text-sm text-ink/50">
                Welcome, <span className="font-semibold text-ink">{player}</span>. You are the reviewing historian. The AI will narrate and rule — your job is to <span className="font-semibold text-ink">Approve</span> what's accurate and <span className="font-semibold text-ink">Flag</span> what it gets wrong.
              </p>
              <button onClick={() => setPhase("scene")} className="mt-8 inline-flex items-center gap-2 rounded-full bg-ink px-7 py-3.5 text-sm font-semibold text-canvas transition hover:opacity-90">
                Begin the run
                <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none"><path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" /></svg>
              </button>
            </div>
          )}

          {/* SCENE + OPTIONS */}
          {phase === "scene" && (
            <div className="rounded-3xl border border-ink/10 bg-white p-6 shadow-soft sm:p-8">
              <div className={`relative mb-6 h-40 overflow-hidden rounded-2xl bg-gradient-to-br ${TONE_GRADIENT[t.tone]}`}>
                <span className="absolute left-4 top-4 rounded-full bg-black/35 px-3 py-1 text-[11px] font-semibold uppercase tracking-wide text-white/90 backdrop-blur">Turn {turn + 1} of {scenario.turns.length}</span>
                <span className="absolute right-4 top-4 rounded-full bg-white/90 px-3 py-1 text-[11px] font-bold text-ink">AI scene</span>
                <span className="absolute bottom-3 left-4 text-[11px] text-white/55">Period art is generated live in the full Anna app</span>
              </div>
              <p className="text-[17px] leading-relaxed text-ink/85">{t.scene}</p>
              <p className="mt-6 text-sm font-semibold text-ink/50">What do you do?</p>
              <div className="mt-3 grid gap-3">
                {t.options.map((o, i) => (
                  <button key={i} onClick={() => pick(i)} className="group flex items-center gap-4 rounded-2xl border border-ink/12 bg-canvas px-4 py-4 text-left transition hover:-translate-y-0.5 hover:border-ink/40 hover:bg-white">
                    <span className="grid h-8 w-8 shrink-0 place-items-center rounded-lg bg-ink/5 text-sm font-bold text-ink/70 group-hover:bg-ink group-hover:text-canvas">{String.fromCharCode(65 + i)}</span>
                    <span className="flex-1 text-[15px] font-medium text-ink">{o.label}</span>
                    <svg viewBox="0 0 24 24" className="h-4 w-4 text-ink/30 transition group-hover:translate-x-0.5 group-hover:text-ink" fill="none"><path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" /></svg>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* RULING (the human-review gate) */}
          {phase === "ruling" && opt && (
            <div className="rounded-3xl border border-ink/10 bg-white p-6 shadow-soft sm:p-8">
              <div className="flex items-center gap-3">
                <span className="grid h-11 w-11 place-items-center rounded-xl bg-gradient-to-br from-[#3a2a5e] to-[#241a3c] text-lg">🎓</span>
                <div>
                  <p className="font-bold leading-tight">The Historian</p>
                  <p className="text-xs text-ink/45">proposes a ruling — verify it</p>
                </div>
              </div>
              <p className="mt-5 inline-block rounded-full bg-ink/5 px-3 py-1.5 text-xs text-ink/60">You chose: {opt.label}</p>
              <p className="mt-4 border-l-[3px] border-ink/80 pl-4 text-[17px] leading-relaxed text-ink/85">{opt.ruling}</p>
              <p className="mt-6 text-sm font-semibold">Is this ruling historically accurate?</p>
              <div className="mt-3 grid grid-cols-1 gap-3 sm:grid-cols-2">
                <button onClick={() => decide("approve")} className="flex items-center justify-center gap-2 rounded-xl border border-emerald-300 bg-emerald-50 px-5 py-3.5 text-sm font-bold text-emerald-700 transition hover:bg-emerald-100">
                  ✓ Approve — it's accurate
                </button>
                <button onClick={() => decide("flag")} className="flex items-center justify-center gap-2 rounded-xl border border-rose-300 bg-rose-50 px-5 py-3.5 text-sm font-bold text-rose-700 transition hover:bg-rose-100">
                  ⚑ Flag — it's a hallucination
                </button>
              </div>
            </div>
          )}

          {/* VERDICT RESULT */}
          {phase === "verdict" && vres && opt && (
            <div className="rounded-3xl border border-ink/10 bg-white p-6 shadow-soft sm:p-8">
              <div className="flex items-center gap-4">
                <span className={`grid h-12 w-12 place-items-center rounded-xl text-2xl font-black ${vres.correct ? "bg-emerald-50 text-emerald-600" : "bg-rose-50 text-rose-600"}`}>{vres.correct ? "✓" : "✗"}</span>
                <div>
                  <p className={`text-lg font-extrabold ${vres.correct ? "text-emerald-600" : "text-rose-600"}`}>{vres.correct ? "Good fact-check" : "Accuracy took a hit"}</p>
                  <p className="text-sm text-ink/55">
                    {vres.correct
                      ? vres.verdict === "flag" ? "You caught the AI in a hallucination." : "You correctly trusted an accurate ruling."
                      : vres.verdict === "flag" ? "That ruling was actually accurate — flagging it cost you." : "You approved a ruling that was actually wrong."}
                  </p>
                </div>
              </div>
              <div className="mt-5 rounded-2xl border border-ink/10 bg-canvas p-4">
                <p className="text-[11px] font-semibold uppercase tracking-wide text-ink/40">📜 What really happened</p>
                <p className="mt-1.5 text-sm text-ink/80">{opt.whatReallyHappened}</p>
              </div>
              <button onClick={next} className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-ink px-6 py-3.5 text-sm font-semibold text-canvas transition hover:opacity-90">
                {vres.verdict === "approve" ? (turn >= scenario.turns.length - 1 ? "See your storybook →" : "Continue →") : "Re-decide this turn ↺"}
              </button>
            </div>
          )}

          {/* STORYBOOK */}
          {phase === "storybook" && (
            <div className="rounded-3xl border border-ink/10 bg-white p-6 shadow-soft sm:p-10">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-ink/40">Storybook</p>
              <div className="mt-4 flex flex-wrap items-center gap-6">
                <div className="grid h-32 w-32 place-items-center rounded-full" style={{ background: `conic-gradient(#111 ${run.accuracy * 3.6}deg, #e6e6e3 0)` }}>
                  <div className="grid h-[104px] w-[104px] place-items-center rounded-full bg-white text-center">
                    <div>
                      <div className="text-3xl font-black leading-none">{run.accuracy}%</div>
                      <div className="text-[10px] uppercase tracking-wide text-ink/40">accuracy</div>
                    </div>
                  </div>
                </div>
                <div className="flex-1">
                  <h2 className="text-2xl font-black tracking-tight">{scenario.name}</h2>
                  <p className="mt-1 text-ink/55">{run.correct} of {run.total} rulings judged correctly · {run.flags} hallucination{run.flags === 1 ? "" : "s"} flagged.</p>
                </div>
              </div>
              <div className="mt-8 space-y-3">
                {run.branch.map((s, i) => (
                  <div key={i} className="flex gap-3 rounded-2xl border border-ink/10 bg-canvas p-4">
                    <span className={`mt-0.5 h-3 w-3 shrink-0 rounded-full ${s.correct ? "bg-emerald-500" : "bg-rose-500"}`} />
                    <div>
                      <p className="text-sm font-bold">Turn {s.turn}: {s.choice}</p>
                      <p className="mt-1 text-xs text-ink/50">{s.whatReallyHappened}</p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-8 flex flex-wrap gap-3">
                <button onClick={restart} className="inline-flex items-center gap-2 rounded-full bg-ink px-6 py-3 text-sm font-semibold text-canvas transition hover:opacity-90">Play again ↺</button>
                <button onClick={onExit} className="inline-flex items-center gap-2 rounded-full border border-ink/20 bg-white px-6 py-3 text-sm font-semibold text-ink transition hover:border-ink/50">Back to home</button>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
