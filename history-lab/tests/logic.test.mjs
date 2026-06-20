// Node test of History Lab's real game logic (Mock-mode mechanic).
// Run: node history-lab/tests/logic.test.mjs
// Proves: the turn loop, the Approve/Flag fact-check scoring, and the storybook
// assembly behave correctly — and that the scripted hallucinations are catchable.
import assert from "node:assert/strict";
import { getScenario } from "../bundle/scenarios.js";
import { isCorrectFactCheck, recomputeAccuracy, tallyVerdict, buildStorybookPayload } from "../bundle/logic.js";

let n = 0;
const ok = (label) => { n++; console.log("  ✓", label); };

// --- scoring truth table ---
assert.equal(isCorrectFactCheck("approve", true), true);
assert.equal(isCorrectFactCheck("approve", false), false);
assert.equal(isCorrectFactCheck("flag", false), true);
assert.equal(isCorrectFactCheck("flag", true), false);
ok("fact-check truth table");

assert.equal(recomputeAccuracy(0, 0), 100);
assert.equal(recomputeAccuracy(2, 3), 67);
assert.equal(recomputeAccuracy(5, 5), 100);
ok("accuracy math");

// --- scenario integrity ---
const scenario = getScenario("cuban-missile-1962");
assert.equal(scenario.turns.length, 3, "3 turns");
const halluc = scenario.turns.flatMap((t, ti) =>
  t.options.map((o, oi) => ({ ti, oi, accurate: o.accurate })).filter((o) => o.accurate === false));
assert.equal(halluc.length, 2, "exactly 2 catchable hallucinations scripted");
ok("scenario has 3 turns + 2 catchable hallucinations");

// --- simulate an ideal fact-checker playthrough (the real mechanic) ---
const run = { turn: 0, totalVerdicts: 0, correctVerdicts: 0, accuracyScore: 100, branchPath: [], flaggedRulings: [] };
function play(turnIdx, optIdx, verdict) {
  const opt = scenario.turns[turnIdx].options[optIdx];
  const ruling = { ruling: opt.ruling, whatReallyHappened: opt.whatReallyHappened, accurate: opt.accurate };
  const correct = tallyVerdict(run, verdict, ruling);
  if (verdict === "flag") {
    run.flaggedRulings.push({ turn: turnIdx + 1, choice: opt.label, ruling: opt.ruling, wasAccurate: opt.accurate });
  } else { // approve -> advance the timeline
    run.branchPath.push({ turn: turnIdx + 1, choice: opt.label, ruling: opt.ruling, verdict, accurate: opt.accurate, correct, whatReallyHappened: opt.whatReallyHappened });
    run.turn = turnIdx + 1;
  }
  return correct;
}

assert.equal(play(0, 1, "approve"), true, "T1 approve accurate quarantine ruling");
assert.equal(play(1, 0, "flag"), true, "T2 FLAG the 'we sank a ship' hallucination");
assert.equal(play(1, 1, "approve"), true, "T2 re-decide: approve accurate boarding ruling");
assert.equal(play(2, 0, "flag"), true, "T3 FLAG the 'public Turkey swap' hallucination");
assert.equal(play(2, 1, "approve"), true, "T3 re-decide: approve accurate Trollope-ploy ruling");
ok("ideal playthrough scores every verdict correctly");

assert.equal(run.turn, 3, "timeline finished after 3 advancing approvals");
assert.equal(run.totalVerdicts, 5);
assert.equal(run.correctVerdicts, 5);
assert.equal(run.accuracyScore, 100);
assert.equal(run.flaggedRulings.length, 2, "caught both hallucinations");
assert.equal(run.branchPath.length, 3, "3 turns committed to the timeline");
ok("end state: 100% accuracy, 2 catches, 3 committed turns");

const payload = buildStorybookPayload(scenario, run);
assert.equal(payload.accuracy, 100);
assert.equal(payload.path.length, 3);
assert.equal(payload.flagged.length, 2);
ok("storybook payload assembled");

// --- negative case: approving a hallucination must be wrong & tank accuracy ---
const bad = { turn: 0, totalVerdicts: 0, correctVerdicts: 0, accuracyScore: 100, branchPath: [], flaggedRulings: [] };
const sankShip = scenario.turns[1].options[0]; // accurate:false
assert.equal(tallyVerdict(bad, "approve", { accurate: sankShip.accurate }), false, "approving a lie is wrong");
assert.equal(bad.accuracyScore, 0);
ok("approving a hallucination correctly costs accuracy");

console.log(`\nALL ${n} LOGIC GROUPS PASSED ✓`);
console.log("\nStorybook payload preview:\n" + JSON.stringify(payload, null, 2));
