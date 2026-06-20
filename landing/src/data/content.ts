// All copy is derived from D:\anna-hackaton\README.md (the History Lab project).
// Centralised here so every section stays consistent with the source of truth.

export type Tone = "navy" | "violet" | "amber" | "stone";

export const site = {
  name: "History Lab",
  oneLiner:
    "Replay a pivotal moment in history as a branching, illustrated decision game — where fact-checking the AI is the game.",
  tagline: "AI generates · the human ratifies · Anna remembers",
  hackathon: "Anna AI-Native App Hackathon",
  github: "https://github.com/EzraNahumury/-History-Lab",
  anna: "https://anna.partners",
};

export const nav: { label: string; href: string; external?: boolean }[] = [
  { label: "The Game", href: "#features" },
  { label: "How It Works", href: "#how" },
  { label: "Technology", href: "#workflows" },
  { label: "Docs", href: site.github, external: true },
];

export const hero = {
  badge: "Anna AI-Native App Hackathon",
  headline: ["Replay history.", "Fact-check the AI.", "Win the game."],
  sub: "History Lab is an Anna App that turns a pivotal historical moment into a branching, illustrated decision game — where catching the AI's hallucinations is the win condition.",
  primary: { label: "View on GitHub", href: site.github },
  secondary: { label: "Explore the Workflow", href: "#how" },
  stats: [
    { value: "3", label: "Grounded scenarios" },
    { value: "2", label: "AI primitives" },
    { value: "0", label: "API keys, ever" },
    { value: "100%", label: "Human-reviewed" },
  ],
};

export interface HeroCard {
  kicker: string;
  title: string;
  meta: string;
  badge: string;
  status: string;
  tone: Tone;
}
export const heroCards: HeroCard[] = [
  { kicker: "Scene · Turn 2", title: "Cuban Missile Crisis", meta: "1962 · streaming", badge: "AI-generated", status: "Live", tone: "navy" },
  { kicker: "Historian's Ruling", title: "“Plausible — this is what JFK chose.”", meta: "Approve or Flag", badge: "Human review", status: "Gate", tone: "violet" },
  { kicker: "Storybook", title: "Accuracy 100%", meta: "3 / 3 rulings verified", badge: "Cross-device", status: "Saved", tone: "stone" },
];

export const ecosystem = [
  "Anna",
  "agent.session",
  "image.generate",
  "storage",
  "chat.append_artifact",
  "React + Vite",
];

export const useCases = {
  title: "Scenarios & mechanics",
  rows: [
    ["Cuban Missile Crisis", "Roman Senate Vote", "Apollo 11 Go / No-Go", "Branching Timeline", "Historian's Ruling"],
    ["Approve a Ruling", "Flag a Hallucination", "Accuracy Score", "Illustrated Storybook", "Cross-Device Save"],
  ],
};

export interface FeatureCard {
  title: string;
  sub: string;
  meta: string;
  tone: Tone;
}
export const featured: FeatureCard[] = [
  { title: "Streamed Scene Generation", sub: "agent.session.run · no API key", meta: "Live narrative", tone: "navy" },
  { title: "The Historian's Ruling Gate", sub: "Approve or Flag · human-in-the-loop", meta: "Core mechanic", tone: "violet" },
  { title: "Period Art, Generated", sub: "image.generate · zero image key", meta: "Illustrated", tone: "amber" },
  { title: "Durable Storybook", sub: "storage + chat.append_artifact", meta: "Cross-device", tone: "stone" },
];

export interface Workflow {
  name: string;
  desc: string;
  metric: string;
}
export const workflowFilters = ["Overview", "Workflow", "Tech"];
export const workflows: Workflow[] = [
  { name: "agent.session.run", desc: "Streamed narrative + rulings", metric: "Streaming" },
  { name: "image.generate", desc: "Period-accurate illustration", metric: "No key" },
  { name: "storage · if_match", desc: "Timeline + accuracy, cross-device", metric: "Durable" },
  { name: "chat.append_artifact", desc: "Storybook posted back to chat", metric: "Implemented" },
  { name: "window.set_title", desc: "Live “Turn N · Accuracy X%”", metric: "Live" },
  { name: "open_app_view", desc: "Assistant opens the window", metric: "Conversational" },
  { name: "Human-Review Gate", desc: "Approve / Flag before any commit", metric: "Verified" },
  { name: "Graceful Fallback", desc: "agent → llm → scripted content", metric: "Resilient" },
];

export interface ExploreTab {
  id: string;
  label: string;
  title: string;
  body: string;
  points: string[];
}
export const explore: ExploreTab[] = [
  {
    id: "overview",
    label: "Overview",
    title: "One tight, scenario-grounded loop",
    body: "A single schema-2 Anna App. You #-mention it, pick a scenario, and play turn by turn — the timeline cannot advance without your verdict.",
    points: ["#-mention activation", "Three grounded scenarios", "Playable in ~3 minutes"],
  },
  {
    id: "mechanic",
    label: "Mechanic",
    title: "The human-review gate",
    body: "The agent proposes a Historian's Ruling; the human disposes. The UI is the only code path that mutates state, so the gate is structurally unbypassable.",
    points: ["Approve advances the timeline", "Flag freezes it and logs the catch", "Accuracy updates live"],
  },
  {
    id: "ai",
    label: "AI",
    title: "Two host generation primitives",
    body: "agent.session.run streams the narrative and rulings; image.generate renders period art — both billed to the user's own Anna quota, with no API or image key.",
    points: ["Streamed reasoning, not a chatbot", "Period-accurate illustrations", "Avoids every stubbed API"],
  },
  {
    id: "state",
    label: "State",
    title: "Durable, host-owned state",
    body: "Timeline, branch path and accuracy live in anna.storage with if_match concurrency — durable and synced across devices, with no backend to run.",
    points: ["Reload rehydrates the run", "256 KB cap respected (text + refs)", "Cross-device sync"],
  },
  {
    id: "demo",
    label: "Demo",
    title: "Built to demo, every time",
    body: "A graceful-degradation path (agent → llm → scripted) plus a deterministic Mock mode keep the loop, the gate and the storybook working even offline.",
    points: ["Offline Mock mode", "No quota required to demo", "Backup-proof on stage"],
  },
  {
    id: "docs",
    label: "Docs",
    title: "Read the full build",
    body: "Architecture, the human-review gate, host API usage, MVP scope and diagrams — all documented in the project README.",
    points: ["Full README on GitHub", "Mermaid architecture diagrams", "Verified against the Anna CLI"],
  },
];

export const problemSolution = [
  {
    tag: "Problem",
    title: "History is memorized, not felt — and AI hallucinates with confidence",
    body: "Students rarely feel the weight of a real decision in context, while naïve AI story-generators invent facts freely with no learning guardrail.",
  },
  {
    tag: "Solution",
    title: "A decision game where fact-checking the AI is the win condition",
    body: "You live a real historical choice; before the timeline advances you must ratify or reject the AI's Historian's Ruling — teaching the episode and AI-literacy at once.",
  },
  {
    tag: "Why Anna",
    title: "A human-review gate a chatbot can't replicate",
    body: "Built on Anna's agent, image, storage and chat primitives — generation, durable state and a verdict gate that controls the canonical timeline. No keys, no backend.",
  },
];

export interface Step {
  n: string;
  title: string;
  body: string;
}
export const steps: Step[] = [
  { n: "01", title: "Pick a scenario", body: "#-mention History Lab and step into a pivotal moment — the Cuban Missile Crisis, a Roman Senate vote, Apollo 11." },
  { n: "02", title: "AI streams the scene", body: "A grounded, illustrated scene and three real options stream in — generated by Anna's host agent and image model, no API key." },
  { n: "03", title: "Judge the ruling", body: "Choose an option, then Approve the Historian's Ruling — or Flag it as a hallucination. The timeline waits for your verdict." },
  { n: "04", title: "Build your storybook", body: "Approved turns advance the canonical timeline; your accuracy updates live and the illustrated storybook posts back to chat." },
];
