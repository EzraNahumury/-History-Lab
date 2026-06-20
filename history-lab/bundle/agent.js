// agent.js — AI generation with graceful degradation.
//
// Strategy per call:  agent.session (streamed)  ->  llm.complete (one-shot)  ->  scripted mock.
// The app stays fully playable no matter which layer is available, so the human-review
// gate, accuracy, storage and storybook always work. When connected to a real Nexus,
// the scene and the Historian's Ruling are genuinely generated; offline they are scripted
// from the grounded scenario file.
import { getApi } from "./sdk.js";

const ENVELOPE = /<<<BEGIN>>>([\s\S]*?)<<<END>>>/;

function parseJson(text) {
  if (!text) return null;
  const m = text.match(ENVELOPE);
  const raw = m ? m[1] : (text.match(/\{[\s\S]*\}/)?.[0] ?? null);
  if (!raw) return null;
  try { return JSON.parse(raw.trim()); } catch { return null; }
}

// ---- low-level: streamed agent session (handles both SDK surfaces) ----
async function runAgentStream(content, systemPrompt, sessionRef) {
  const A = getApi();
  if (!sessionRef.sess) {
    if (typeof A?.agent?.session === "function") {
      sessionRef.sess = await A.agent.session({ submode: "auto", systemPrompt });
    } else if (A?.agent?.session?.create) {
      sessionRef.sess = await A.agent.session.create({ submode: "auto", systemPrompt });
    } else {
      throw new Error("no agent.session surface");
    }
    sessionRef.uuid = sessionRef.sess?.app_session_uuid ?? sessionRef.sess?.appSessionUuid ?? null;
  }
  const sess = sessionRef.sess;
  let ret = sess?.run
    ? sess.run({ content })
    : await A.agent.session.run({ app_session_uuid: sessionRef.uuid, content });
  const iterable = (ret && ret[Symbol.asyncIterator]) ? ret : await ret;

  let buf = "";
  for await (const frame of iterable) {
    if (frame?.event === "error") throw new Error("agent error frame: " + JSON.stringify(frame));
    if (frame?.event === "sse") {
      const piece = frame?.choices?.[0]?.delta?.content ?? "";
      buf += piece;
      if (piece && sessionRef.onToken) sessionRef.onToken(buf);
    }
    if (frame?.event === "end") break;
  }
  return buf;
}

// ---- low-level: one-shot completion fallback ----
async function runLlm(content, systemPrompt) {
  const A = getApi();
  const messages = [];
  if (systemPrompt) messages.push({ role: "system", content: systemPrompt });
  messages.push({ role: "user", content });
  const r = await A.llm.complete({ messages, maxTokens: 800 });
  return r?.content?.text ?? (typeof r?.content === "string" ? r.content : "");
}

async function generate(content, systemPrompt, sessionRef) {
  // Try streamed agent first, then one-shot llm. Throw if both fail -> caller uses mock.
  try {
    return await runAgentStream(content, systemPrompt, sessionRef);
  } catch (e1) {
    console.warn("[agent] stream failed, trying llm.complete", e1);
    return await runLlm(content, systemPrompt);
  }
}

// ---- high-level: scene + 3 options ----
export async function generateScene(scenario, turnIndex, sessionRef, opts = {}) {
  const turn = scenario.turns[turnIndex];
  if (!opts.mock) {
    try {
      const prompt =
        `Turn ${turnIndex + 1}. Situation: ${turn.context}\n` +
        `Respond ONLY with JSON between <<<BEGIN>>> and <<<END>>> with keys: ` +
        `"scene" (2-3 vivid, historically accurate sentences), ` +
        `"image_prompt" (a short period-illustration prompt), ` +
        `"options" (array of EXACTLY 3 short decision labels).`;
      const text = await generate(prompt, scenario.systemPrompt, sessionRef);
      const j = parseJson(text);
      if (j && j.scene && Array.isArray(j.options) && j.options.length >= 2) {
        return { scene: j.scene, image_prompt: j.image_prompt || turn.image_prompt, options: j.options.slice(0, 3), live: true };
      }
      console.warn("[agent] scene parse failed; using scripted", text);
    } catch (e) {
      console.warn("[agent] live scene failed; using scripted", e);
    }
  }
  // scripted fallback
  return {
    scene: turn.scene,
    image_prompt: turn.image_prompt,
    options: turn.options.map((o) => o.label),
    live: false,
  };
}

// ---- high-level: Historian's Ruling for a chosen option ----
// Returns { ruling, whatReallyHappened, accurate, live }.
//
// GROUND TRUTH IS CURATED, NEVER SELF-REPORTED. The scenario file decides (via
// `scripted.accurate`) whether THIS choice's ruling should be accurate or a hallucination.
// In Live mode the model is told which register to write in and only produces the prose;
// scoring uses the curated `accurate` flag — so the fact-check can never be gamed by the
// model grading its own honesty.
export async function generateRuling(scenario, turnIndex, optionIndex, sessionRef, opts = {}) {
  const turn = scenario.turns[turnIndex];
  const scripted = turn.options[optionIndex];
  if (!opts.mock) {
    try {
      const instruction = scripted.accurate
        ? "Write a historically ACCURATE Historian's Ruling about this choice — faithful to the documented record."
        : "Write a Historian's Ruling about this choice that contains a SUBTLE BUT PLAUSIBLE factual error (a confident hallucination). Do not hint that it is wrong.";
      const prompt =
        `The player chose: "${scripted.label}". ${instruction} ` +
        `Respond ONLY with JSON between <<<BEGIN>>> and <<<END>>> with a single key "ruling" (1-2 sentences). ` +
        `Do not reveal whether the ruling is accurate.`;
      const text = await generate(prompt, scenario.systemPrompt, sessionRef);
      const j = parseJson(text);
      if (j && j.ruling) {
        return {
          ruling: j.ruling,
          whatReallyHappened: scripted.whatReallyHappened, // curated ground-truth reveal
          accurate: scripted.accurate, // curated ground truth — NOT a model self-report
          live: true,
        };
      }
      console.warn("[agent] ruling parse failed; using scripted", text);
    } catch (e) {
      console.warn("[agent] live ruling failed; using scripted", e);
    }
  }
  // scripted fallback
  return {
    ruling: scripted.ruling,
    whatReallyHappened: scripted.whatReallyHappened,
    accurate: scripted.accurate,
    live: false,
  };
}
