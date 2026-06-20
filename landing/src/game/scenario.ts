// Grounded scenario content, ported from the History Lab Anna App
// (bundle/scenarios.js → cuban-missile-1962). `accurate` is hidden from the player
// and used to score their Approve/Flag verdict. About 1 in 3 rulings are deliberately wrong.
import type { Tone } from "../data/content";

export interface Option {
  label: string;
  ruling: string;
  whatReallyHappened: string;
  accurate: boolean;
}

export interface Turn {
  context: string;
  scene: string;
  tone: Tone;
  options: Option[];
}

export interface Scenario {
  id: string;
  name: string;
  blurb: string;
  turns: Turn[];
}

export const SCENARIO: Scenario = {
  id: "cuban-missile-1962",
  name: "Cuban Missile Crisis",
  blurb: "Thirteen days in October 1962 that brought the world to the brink of nuclear war.",
  turns: [
    {
      tone: "navy",
      context: "October 16, 1962. U-2 spy photos reveal Soviet nuclear missile sites under construction in Cuba.",
      scene:
        "October 16, 1962. A U-2 reconnaissance flight has brought back undeniable photographs: the Soviets are secretly building nuclear missile launch sites in Cuba, ninety miles from Florida. President Kennedy gathers ExComm behind closed doors. The missiles are not yet operational — but the clock is running.",
      options: [
        {
          label: "Order an immediate air strike on the missile sites",
          ruling:
            "The Joint Chiefs pressed for air strikes, but the Air Force admitted it could not guarantee destroying every missile, and a strike risked killing Soviet personnel and igniting war — so Kennedy held back.",
          whatReallyHappened: "Kennedy rejected the immediate-strike option for exactly these reasons.",
          accurate: true,
        },
        {
          label: "Impose a naval 'quarantine' (blockade) of Cuba",
          ruling:
            "Plausible — Kennedy chose a naval 'quarantine' (calling it a blockade would itself be an act of war) to halt further shipments while leaving room to negotiate.",
          whatReallyHappened: "This is the path Kennedy actually took, announced to the nation on October 22, 1962.",
          accurate: true,
        },
        {
          label: "Stay quiet and pursue only secret back-channel talks",
          ruling:
            "Quiet diplomacy alone was weighed, but ExComm feared it would look weak and hand the Soviets time to finish the sites, so it was rejected as the sole response.",
          whatReallyHappened: "Back-channels were used — but only alongside the very public quarantine.",
          accurate: true,
        },
      ],
    },
    {
      tone: "stone",
      context: "October 24, 1962. Soviet cargo ships steam toward the U.S. quarantine line around Cuba.",
      scene:
        "October 24, 1962. The quarantine is live. Soviet cargo ships steam toward the invisible line the U.S. Navy has drawn around Cuba. On the bridge of every American destroyer, captains wait for orders. The world holds its breath.",
      options: [
        {
          label: "Sink the first Soviet ship that crosses the line",
          ruling:
            "Correct — to enforce the quarantine the U.S. Navy sank a Soviet freighter as it tried to run the line, and the Soviets promptly backed down.",
          whatReallyHappened:
            "No ship was ever sunk. Most Soviet ships stopped or turned back; the freighter Marucla was boarded peacefully. Sinking a vessel could have triggered nuclear war.",
          accurate: false,
        },
        {
          label: "Hold the line and board suspicious ships for inspection",
          ruling:
            "Plausible — ships were stopped and inspected; on October 26 a boarding party peacefully searched the freighter Marucla and let it continue.",
          whatReallyHappened: "This restrained enforcement is what actually happened.",
          accurate: true,
        },
        {
          label: "Quietly pull the quarantine line closer to Cuba",
          ruling:
            "Accurate — Kennedy quietly moved the line inward (roughly 800 to 500 miles) to give Khrushchev more time to order his ships to turn around.",
          whatReallyHappened: "The line was indeed pulled in to buy time — a deliberate de-escalation.",
          accurate: true,
        },
      ],
    },
    {
      tone: "violet",
      context: "October 27, 1962 — 'Black Saturday.' A U-2 is shot down and two letters arrive from Khrushchev.",
      scene:
        "October 27, 1962 — 'Black Saturday.' A U-2 is shot down over Cuba, killing its pilot. Two contradictory messages arrive from Khrushchev: one conciliatory, one demanding the U.S. remove its Jupiter missiles from Turkey. ExComm teeters between invasion and a deal.",
      options: [
        {
          label: "Publicly announce a missile trade: Turkey for Cuba",
          ruling:
            "Correct — Kennedy publicly announced a straight swap, openly trading the Jupiter missiles in Turkey for the Cuban missiles, and the press celebrated the deal.",
          whatReallyHappened:
            "The Turkey side of the deal was kept SECRET for decades. Publicly it looked like a Soviet climbdown; the Jupiters were quietly withdrawn months later.",
          accurate: false,
        },
        {
          label: "Answer only the softer letter and ignore the harder demand",
          ruling:
            "Plausible — the so-called 'Trollope ploy': Kennedy replied only to Khrushchev's first, softer message and ignored the tougher public demand.",
          whatReallyHappened: "This is exactly what Kennedy did, opening a path to resolution.",
          accurate: true,
        },
        {
          label: "Launch the prepared invasion of Cuba now",
          ruling:
            "An invasion force was ready and the military pressed for it, but Kennedy resisted, fearing Soviet retaliation — possibly nuclear — in Berlin or beyond.",
          whatReallyHappened: "Kennedy held off. We later learned tactical nuclear weapons were already on Cuba, so an invasion could have gone nuclear.",
          accurate: true,
        },
      ],
    },
  ],
};
