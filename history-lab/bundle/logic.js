// logic.js — pure game logic (NO SDK / DOM imports), so it is unit-testable in Node.
// This is the real code path the app uses for scoring and storybook assembly.

// A correct fact-check = Approve an accurate ruling, OR Flag an inaccurate one.
export function isCorrectFactCheck(verdict, accurate) {
  return (verdict === "approve" && accurate === true) ||
         (verdict === "flag" && accurate === false);
}

export function recomputeAccuracy(correctVerdicts, totalVerdicts) {
  return totalVerdicts > 0 ? Math.round((correctVerdicts / totalVerdicts) * 100) : 100;
}

// Update a run's tallies for one verdict; returns whether the fact-check was correct.
export function tallyVerdict(run, verdict, ruling) {
  const correct = isCorrectFactCheck(verdict, ruling.accurate);
  run.totalVerdicts += 1;
  if (correct) run.correctVerdicts += 1;
  run.accuracyScore = recomputeAccuracy(run.correctVerdicts, run.totalVerdicts);
  return correct;
}

// The compact payload posted to chat via chat.append_artifact at the end of a run.
export function buildStorybookPayload(scenario, run) {
  return {
    scenario: scenario.name,
    accuracy: run.accuracyScore,
    correctVerdicts: run.correctVerdicts,
    totalVerdicts: run.totalVerdicts,
    path: run.branchPath.map((s) => ({ turn: s.turn, choice: s.choice, verdict: s.verdict, correct: s.correct })),
    flagged: run.flaggedRulings,
  };
}
