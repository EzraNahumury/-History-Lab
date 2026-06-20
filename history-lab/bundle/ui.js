// ui.js — pure DOM rendering. No inline handlers / styles (CSP-safe): everything is
// built with createElement + addEventListener. Function signatures match app.js.

function h(tag, attrs = {}, children = []) {
  const el = document.createElement(tag);
  for (const [k, v] of Object.entries(attrs)) {
    if (k === "class") el.className = v;
    else if (k === "text") el.textContent = v;
    else if (k.startsWith("on") && typeof v === "function") el.addEventListener(k.slice(2).toLowerCase(), v);
    else if (v !== undefined && v !== null) el.setAttribute(k, v);
  }
  for (const c of [].concat(children)) {
    if (c == null) continue;
    el.appendChild(typeof c === "string" ? document.createTextNode(c) : c);
  }
  return el;
}

function mount(view, node) { view.replaceChildren(node); }
function inner(node) { return h("div", { class: "view-inner" }, node); }

export function setHud(text, accuracy) {
  const e = document.getElementById("hud");
  if (!e) return;
  e.textContent = text;
  e.classList.remove("good", "mid", "low");
  if (typeof accuracy === "number") {
    e.classList.add(accuracy >= 80 ? "good" : accuracy >= 50 ? "mid" : "low");
  }
}
export function setStatus(text) { const e = document.getElementById("status"); if (e) e.textContent = text; }

function badge(live) { return h("span", { class: "tag " + (live ? "live" : "mock"), text: live ? "AI-generated" : "scripted" }); }

function pips(current, total) {
  return h("div", { class: "pips" }, Array.from({ length: total }, (_, i) =>
    h("span", { class: "pip" + (i < current - 1 ? " done" : "") + (i === current - 1 ? " active" : "") })));
}

// ---------- scenario picker ----------
export function renderScenePicker(view, scenarios, onPick) {
  const cards = scenarios.map((s) =>
    h("button", { class: "option scenario", onClick: () => onPick(s.id) }, [
      h("span", { class: "opt-key", text: "▶" }),
      h("span", { class: "opt-label" }, [
        h("div", { class: "tl-choice", text: s.name }),
        h("div", { class: "tl-sub", text: s.blurb || "" }),
      ]),
      h("span", { class: "opt-arrow", text: "→" }),
    ]));

  mount(view, inner(h("div", { class: "card" }, [
    h("div", { class: "hero" }, [
      h("div", { class: "eyebrow", text: "History Lab" }),
      h("h2", { class: "title", text: "Choose a moment to step into" }),
      h("p", { class: "muted", text: "Live a real historical decision. The catch: before the timeline advances, fact-check the AI's ruling — Approve it, or Flag it as a hallucination." }),
    ]),
    h("div", { class: "options" }, cards),
  ])));
}

// ---------- thinking ----------
export function renderThinking(view, label) {
  mount(view, inner(h("div", { class: "card" }, [
    h("div", { class: "thinking" }, [
      h("span", { class: "dots" }, [h("span", { class: "dot" }), h("span", { class: "dot" }), h("span", { class: "dot" })]),
      h("span", { text: label || "Thinking…" }),
    ]),
    h("div", { class: "skeleton art" }),
    h("div", { class: "skeleton w80" }),
    h("div", { class: "skeleton w60" }),
  ])));
}

// ---------- turn ----------
export function renderTurn(view, data, onChoose) {
  const art = data.imageUrl
    ? h("img", { class: "art", src: data.imageUrl, alt: "Period illustration" })
    : h("div", { class: "art-ph" }, [
        h("div", { class: "ph-ico", text: "🏛️" }),
        h("div", { class: "ph-txt", text: "Period illustration appears in Live mode" }),
      ]);

  const options = data.options.map((label, i) =>
    h("button", { class: "option", onClick: () => onChoose(i) }, [
      h("span", { class: "opt-key", text: String.fromCharCode(65 + i) }),
      h("span", { class: "opt-label", text: label }),
      h("span", { class: "opt-arrow", text: "→" }),
    ]));

  mount(view, inner(h("div", { class: "card" }, [
    h("div", { class: "eyebrow" }, [`Turn ${data.turnNumber} of ${data.totalTurns}`, badge(data.live), pips(data.turnNumber, data.totalTurns)]),
    art,
    h("p", { class: "scene-text", text: data.scene }),
    h("p", { class: "prompt-q", text: "What do you do?" }),
    h("div", { class: "options" }, options),
  ])));
}

// ---------- historian's ruling (the human-review gate) ----------
export function renderRuling(view, data, onVerdict) {
  mount(view, inner(h("div", { class: "card" }, [
    h("div", { class: "ruling-head" }, [
      h("div", { class: "avatar", text: "🎓" }),
      h("div", { class: "ruling-who" }, [
        h("strong", { text: "The Historian" }),
        h("span", { text: "proposes a ruling" }),
      ]),
      badge(data.live),
    ]),
    h("div", { class: "chose", text: "You chose: " + data.choiceLabel }),
    h("p", { class: "ruling-text", text: data.ruling }),
    h("p", { class: "gate-q", text: "Is this ruling historically accurate?" }),
    h("div", { class: "gate" }, [
      h("button", { class: "btn btn-approve", onClick: () => onVerdict("approve") }, [h("span", { class: "ico", text: "✓" }), "Approve"]),
      h("button", { class: "btn btn-flag", onClick: () => onVerdict("flag") }, [h("span", { class: "ico", text: "⚑" }), "Flag hallucination"]),
    ]),
  ])));
}

// ---------- verdict result ----------
export function renderVerdictResult(view, data, onNext) {
  const verdictWord = data.verdict === "approve" ? "You approved the ruling" : "You flagged it as a hallucination";
  const explain = data.correct
    ? (data.verdict === "flag" ? "You caught the AI in a hallucination." : "You correctly trusted an accurate ruling.")
    : (data.verdict === "flag" ? "That ruling was actually accurate — flagging it cost you." : "You approved a ruling that was actually wrong.");
  const advances = data.advances;
  const btnLabel = advances ? (data.isLastTurn ? "See your storybook →" : "Continue →") : "Re-decide this turn ↺";

  mount(view, inner(h("div", { class: "card" }, [
    h("div", { class: "verdict-head" }, [
      h("div", { class: "verdict-ico " + (data.correct ? "good" : "bad"), text: data.correct ? "✓" : "✗" }),
      h("div", {}, [
        h("div", { class: "verdict-title " + (data.correct ? "good" : "bad"), text: data.correct ? "Good fact-check" : "Accuracy took a hit" }),
        h("div", { class: "muted", text: verdictWord }),
      ]),
    ]),
    h("p", { class: "muted", text: explain }),
    h("div", { class: "truth" }, [
      h("div", { class: "truth-label", text: "📜 What really happened" }),
      h("div", { class: "truth-body", text: data.whatReallyHappened }),
    ]),
    h("button", { class: "btn btn-primary btn-block", onClick: () => onNext(advances ? "advance" : "redecide") }, btnLabel),
  ])));
}

// ---------- storybook ----------
export function renderStorybook(view, { scenarioName, run }, onRestart) {
  const ring = h("div", { class: "ring" }, h("div", { class: "ring-inner" }, [
    h("div", { class: "ring-score", text: run.accuracyScore + "%" }),
    h("div", { class: "ring-label", text: "accuracy" }),
  ]));
  ring.style.setProperty("--p", String(run.accuracyScore)); // CSSOM write (CSP-safe)

  const steps = run.branchPath.map((s) =>
    h("div", { class: "tl-step" }, [
      h("span", { class: "tl-dot " + (s.correct ? "ok" : "bad") }),
      h("div", {}, [
        h("div", {}, [
          h("span", { class: "chip", text: "Turn " + s.turn }),
          h("span", { class: "chip " + (s.correct ? "ok" : "bad"), text: s.correct ? "good check" : "missed" }),
        ]),
        h("div", { class: "tl-choice", text: s.choice }),
        h("div", { class: "tl-sub", text: s.whatReallyHappened }),
      ]),
    ]));

  mount(view, inner(h("div", { class: "card" }, [
    h("div", { class: "eyebrow", text: "Storybook" }),
    h("div", { class: "story-head" }, [
      ring,
      h("div", { class: "story-meta" }, [
        h("h2", { class: "title", text: scenarioName }),
        h("p", { class: "muted", text: `${run.correctVerdicts} of ${run.totalVerdicts} rulings judged correctly.` }),
      ]),
    ]),
    h("div", { class: "story-note" }, [h("span", { text: "📨" }), h("span", { text: "Your illustrated decision-storybook was posted to the chat thread." })]),
    h("div", { class: "timeline" }, steps),
    h("button", { class: "btn btn-primary btn-block", onClick: () => onRestart() }, "Play again ↺"),
  ])));
}
