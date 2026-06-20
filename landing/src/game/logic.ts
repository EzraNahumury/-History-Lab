// Pure game logic, ported from the History Lab Anna App (bundle/logic.js).
// A correct fact-check = Approve an accurate ruling, OR Flag an inaccurate one.

export type Verdict = "approve" | "flag";

export function isCorrectFactCheck(verdict: Verdict, accurate: boolean): boolean {
  return (verdict === "approve" && accurate) || (verdict === "flag" && !accurate);
}

export function recomputeAccuracy(correct: number, total: number): number {
  return total > 0 ? Math.round((correct / total) * 100) : 100;
}

export interface BranchStep {
  turn: number;
  choice: string;
  ruling: string;
  whatReallyHappened: string;
  correct: boolean;
}

export interface RunState {
  total: number;
  correct: number;
  accuracy: number;
  flags: number;
  branch: BranchStep[];
}

export const initialRun: RunState = { total: 0, correct: 0, accuracy: 100, flags: 0, branch: [] };
