// ui.js — pure DOM rendering. No inline handlers / styles (CSP-safe): everything is
// built with createElement + addEventListener.

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

function clear(view) { view.replaceChildren(); }

export function setHud(text) { const e = document.getElementById("hud"); if (e) e.textContent = text; }
export function setStatus(text) { const e = document.getElementById("status"); if (e) e.textContent = text; }

function liveBadge(live) {
  return h("span", { class: "live-badge " + (live ? "live" : "mock"), text: live ? "AI-generated" : "scripted" });
}

export function renderScenePicker(view, scenarios, onPick) {
  clear(view);
  const list = scenarios.map((s) =>
    h("button", { class: "option", onClick: () => onPick(s.id) }, [
      h("div", { class: "title", text: s.name }),
      h("div", { class: "muted", text: s.blurb || "" }),
    ])
  );
  view.appendChild(h("div", { class: "card" }, [
    h("div", { class: "eyebrow", text: "History Lab" }),
    h("h2", { class: "title", text: "Choose a moment to step into" }),
    h("p", { class: "muted", text: "You will live a real historical decision. The catch: before the timeline advances, you must fact-check the AI's ruling — Approve it, or Flag it as a hallucination." }),
    h("div", { class: "options" }, list),
  ]));
}

export function renderThinking(view, label) {
  clear(view);
  view.appendChild(h("div", { class: "card" }, [
    h("div", { class: "thinking" }, [
      h("span", { class: "dot" }), h("span", { class: "dot" }), h("span", { class: "dot" }),
      h("span", { text: " " + (label || "Thinking…") }),
    ]),
  ]));
}

export function renderTurn(view, data, onChoose) {
  clear(view);
  const art = data.imageUrl
    ? h("img", { class: "art", src: data.imageUrl, alt: "Period illustration" })
    : h("div", { class: "art-placeholder", text: "🖼️  period illustration (enable live mode for generated art)" });

  const options = data.options.map((label, i) =>
    h("button", { class: "option", onClick: () => onChoose(i) }, [
      h("span", { class: "opt-key", text: String.fromCharCode(65 + i) }),
      h("span", { text: label }),
    ])
  );

  view.appendChild(h("div", { class: "card" }, [
    h("div", { class: "eyebrow" }, [
      `Turn ${data.turnNumber} of ${data.totalTurns}  `,
      liveBadge(data.live),
    ]),
    art,
    h("p", { class: "scene-text", text: data.scene }),
    h("div", { class: "gate-q", text: "What do you do?" }),
    h("div", { class: "options" }, options),
  ]));
}

export function renderRuling(view, data, onVerdict) {
  clear(view);
  view.appendChild(h("div", { class: "card ruling" }, [
    h("div", { class: "eyebrow" }, ["Historian's Ruling  ", liveBadge(data.live)]),
    h("p", { class: "muted", text: `You chose: ${data.choiceLabel}` }),
    h("p", { class: "ruling-text", text: data.ruling }),
    h("div", { class: "gate-q", text: "Is this ruling historically accurate?" }),
    h("div", { class: "gate" }, [
      h("button", { class: "btn btn-approve", onClick: () => onVerdict("approve") }, "✓ Approve — it's accurate"),
      h("button", { class: "btn btn-flag", onClick: () => onVerdict("flag") }, "⚑ Flag — it's a hallucination"),
    ]),
  ]));
}

export function renderVerdictResult(view, data, onNext) {
  clear(view);
  const verdictWord = data.verdict === "approve" ? "Approved" : "Flagged as hallucination";
  const headline = data.correct
    ? h("div", { class: "verdict-correct", text: "✓ Good fact-check!" })
    : h("div", { class: "verdict-wrong", text: "✗ Not quite — accuracy took a hit." });

  const explain = data.correct
    ? (data.verdict === "flag"
        ? "You caught the AI in a hallucination."
        : "You correctly trusted an accurate ruling.")
    : (data.verdict === "flag"
        ? "That ruling was actually accurate — flagging it cost you."
        : "You approved a ruling that was actually wrong.");

  const advances = data.advances;
  const btnLabel = advances
    ? (data.isLastTurn ? "See your storybook →" : "Continue →")
    : "Re-decide this turn ↺";

  view.appendChild(h("div", { class: "card" }, [
    h("div", { class: "eyebrow", text: verdictWord }),
    headline,
    h("p", { class: "muted", text: explain }),
    h("div", { class: "truth" }, [
      h("div", { class: "label", text: "What really happened" }),
      h("div", { text: data.whatReallyHappened }),
    ]),
    h("button", {
      class: "btn btn-primary",
      onClick: () => onNext(advances ? "advance" : "redecide"),
    }, btnLabel),
  ]));
}

export function renderStorybook(view, { scenarioName, run }, onRestart) {
  clear(view);
  const steps = run.branchPath.map((s) =>
    h("div", { class: "story-step" + (s.verdict === "flag" ? " flagged" : "") }, [
      h("div", {}, [
        h("span", { class: "chip", text: `Turn ${s.turn}` }),
        h("span", { class: "chip " + (s.correct ? "ok" : "bad"), text: s.correct ? "good check" : "missed" }),
      ]),
      h("p", { text: `Choice: ${s.choice}` }),
      h("p", { class: "muted", text: `Ruling: ${s.ruling}` }),
      h("p", { class: "muted", text: `Truth: ${s.whatReallyHappened}` }),
    ])
  );

  view.appendChild(h("div", { class: "card" }, [
    h("div", { class: "eyebrow", text: "Storybook" }),
    h("h2", { class: "title", text: scenarioName }),
    h("div", { class: "final-score", text: `${run.accuracyScore}%` }),
    h("p", { class: "muted", text: `Fact-check accuracy — ${run.correctVerdicts} of ${run.totalVerdicts} rulings judged correctly.` }),
    h("p", { class: "muted", text: "📨 Your illustrated decision-storybook has been posted to the chat thread." }),
    ...steps,
    h("button", { class: "btn btn-primary", onClick: () => onRestart() }, "Play again ↺"),
  ]));
}
