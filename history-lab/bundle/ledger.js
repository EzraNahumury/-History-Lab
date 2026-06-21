// ledger.js — Anna-native deterministic commit via the history-lab-ledger Executa.
//
//   UI verdict ──► anna.tools.invoke({tool_id, method:"commit_ruling", args})
//             ──► history-lab-ledger plugin (stdio JSON-RPC) ──► accuracyScore
//
// The score is recomputed OUTSIDE the LLM, so it can never be hallucinated.
// Every call is best-effort: in Mock mode, or if the tool isn't installed /
// the call fails, we fall back to the identical pure-JS formula in logic.js, so
// the game never breaks. Same number either way — the Executa path just proves
// the Anna reverse-RPC primitive.
import { getApi } from "./sdk.js";
import { recomputeAccuracy } from "./logic.js";

const HANDLE = "history-lab-ledger";

// Resolve the tool_id the same way the llm-demo bundle does: prefer the
// server-minted id injected by `anna-app dev`/`apps push` into anna-tool-ids.js,
// fall back to the dev placeholder for offline/mock runs.
function toolId() {
  const map = (typeof window !== "undefined" && window.__ANNA_TOOL_IDS__) || {};
  return map[HANDLE] || "tool-test-history-lab-ledger-12345678";
}

// Returns { accuracyScore, source: "ledger" | "local" }.
export async function commitRuling(correctVerdicts, totalVerdicts, opts = {}) {
  const local = recomputeAccuracy(correctVerdicts, totalVerdicts);
  if (opts.mock) return { accuracyScore: local, source: "local" };
  try {
    const reply = await getApi().tools.invoke({
      tool_id: toolId(),
      method: "commit_ruling",
      args: { correctVerdicts, totalVerdicts },
    });
    // tools.invoke unwraps to the tool's `data` payload (sometimes nested under
    // `data`/`result` depending on host version) — read defensively.
    const data = reply?.data ?? reply?.result?.data ?? reply ?? {};
    const score = data.accuracyScore;
    if (typeof score === "number") return { accuracyScore: score, source: "ledger" };
    return { accuracyScore: local, source: "local" };
  } catch (e) {
    console.warn("[ledger] commit_ruling failed; using local score", e);
    return { accuracyScore: local, source: "local" };
  }
}
