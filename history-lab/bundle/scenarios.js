// scenarios.js — grounded scenario content used by the app (and as the scripted/mock source).
// Canonical copies mirrored in ../scenarios/*.json — keep in sync.
//
// Per option:  label              = the decision shown to the player
//              ruling             = the Historian's Ruling about that choice (the AI "says" this)
//              accurate           = whether that ruling is factually correct (the GROUND TRUTH used
//                                   for scoring — in Live mode the curated flag here decides scoring,
//                                   never a model self-report; the model is only asked to write prose
//                                   matching this intended accuracy).
//              whatReallyHappened = the ground-truth reveal shown after the verdict
//
// A correct fact-check = Approve an accurate ruling, OR Flag an inaccurate one.

const RULING_CONTRACT =
  "For a SCENE, return ONLY JSON between <<<BEGIN>>> and <<<END>>> with keys: scene (2-3 vivid, " +
  "accurate sentences), image_prompt (short period-illustration prompt), options (array of exactly 3 " +
  "short, historically-plausible decision labels). For a HISTORIAN'S RULING, follow the instruction you " +
  "are given (write an accurate ruling, or one containing a subtle plausible factual error) and return " +
  "ONLY JSON with a single key: ruling (1-2 sentences). Never reveal whether a ruling is accurate, and " +
  "never advance the timeline yourself.";

export const SCENARIOS = {
  "cuban-missile-1962": {
    id: "cuban-missile-1962",
    name: "Cuban Missile Crisis (1962)",
    blurb: "Thirteen days in October 1962 that brought the world to the brink of nuclear war.",
    systemPrompt:
      "You are History Lab's Game Master and Historian for the 1962 Cuban Missile Crisis. Stay strictly " +
      "within documented history. " + RULING_CONTRACT,
    turns: [
      {
        context: "October 16, 1962. U-2 spy photos reveal Soviet nuclear missile sites under construction in Cuba.",
        scene:
          "October 16, 1962. A U-2 reconnaissance flight has brought back undeniable photographs: the Soviets are secretly building nuclear missile launch sites in Cuba, ninety miles from Florida. President Kennedy gathers ExComm behind closed doors. The missiles are not yet operational — but the clock is running.",
        image_prompt: "1962 White House situation room, advisors studying aerial reconnaissance photographs, dramatic period illustration",
        options: [
          { label: "Order an immediate air strike on the missile sites", ruling: "The Joint Chiefs pressed for air strikes, but the Air Force could not guarantee destroying every missile and a strike risked igniting war — so Kennedy held back.", whatReallyHappened: "Kennedy rejected the immediate-strike option for exactly these reasons.", accurate: true },
          { label: "Impose a naval 'quarantine' (blockade) of Cuba", ruling: "Plausible — Kennedy chose a naval 'quarantine' (a blockade would be an act of war) to halt shipments while leaving room to negotiate.", whatReallyHappened: "This is the path Kennedy actually took, announced on October 22, 1962.", accurate: true },
          { label: "Stay quiet and pursue only secret back-channel talks", ruling: "Quiet diplomacy alone was weighed but feared too weak, so it was rejected as the sole response.", whatReallyHappened: "Back-channels were used — but only alongside the very public quarantine.", accurate: true },
        ],
      },
      {
        context: "October 24, 1962. Soviet cargo ships steam toward the U.S. quarantine line around Cuba.",
        scene:
          "October 24, 1962. The quarantine is live. Soviet cargo ships steam toward the invisible line the U.S. Navy has drawn around Cuba. On the bridge of every American destroyer, captains wait for orders. The world holds its breath.",
        image_prompt: "1962 US Navy destroyer facing distant Soviet cargo ships, tense naval standoff, period illustration",
        options: [
          { label: "Sink the first Soviet ship that crosses the line", ruling: "Correct — the U.S. Navy sank a Soviet freighter as it tried to run the line, and the Soviets promptly backed down.", whatReallyHappened: "No ship was ever sunk. Most Soviet ships stopped or turned back; the freighter Marucla was boarded peacefully.", accurate: false },
          { label: "Hold the line and board suspicious ships for inspection", ruling: "Plausible — ships were stopped and inspected; on October 26 a boarding party peacefully searched the freighter Marucla and let it continue.", whatReallyHappened: "This restrained enforcement is what actually happened.", accurate: true },
          { label: "Quietly pull the quarantine line closer to Cuba", ruling: "Accurate — Kennedy quietly moved the line inward (roughly 800 to 500 miles) to give Khrushchev more time to turn his ships around.", whatReallyHappened: "The line was indeed pulled in to buy time — a deliberate de-escalation.", accurate: true },
        ],
      },
      {
        context: "October 27, 1962 — 'Black Saturday.' A U-2 is shot down and two letters arrive from Khrushchev.",
        scene:
          "October 27, 1962 — 'Black Saturday.' A U-2 is shot down over Cuba, killing its pilot. Two contradictory messages arrive from Khrushchev: one conciliatory, one demanding the U.S. remove its Jupiter missiles from Turkey. ExComm teeters between invasion and a deal.",
        image_prompt: "1962 tense war room at night, advisors reading two telegrams, clock near midnight, period illustration",
        options: [
          { label: "Publicly announce a missile trade: Turkey for Cuba", ruling: "Correct — Kennedy publicly announced a straight swap, openly trading the Jupiter missiles in Turkey for the Cuban missiles, and the press celebrated.", whatReallyHappened: "The Turkey side was kept SECRET for decades. Publicly it looked like a Soviet climbdown; the Jupiters were quietly withdrawn months later.", accurate: false },
          { label: "Answer only the softer letter and ignore the harder demand", ruling: "Plausible — the 'Trollope ploy': Kennedy replied only to Khrushchev's first, softer message and ignored the tougher public demand.", whatReallyHappened: "This is exactly what Kennedy did, opening a path to resolution.", accurate: true },
          { label: "Launch the prepared invasion of Cuba now", ruling: "An invasion was ready and the military pressed for it, but Kennedy resisted, fearing Soviet retaliation — possibly nuclear.", whatReallyHappened: "Kennedy held off. We later learned tactical nuclear weapons were already on Cuba, so an invasion could have gone nuclear.", accurate: true },
        ],
      },
    ],
  },

  "roman-senate-63bc": {
    id: "roman-senate-63bc",
    name: "The Catiline Debate (63 BC)",
    blurb: "Rome, 63 BC. Consul Cicero confronts a conspiracy to overthrow the Republic — and the Senate must decide how far the law can bend.",
    systemPrompt:
      "You are History Lab's Game Master and Historian for the Catilinarian Conspiracy of 63 BC (Cicero, Catiline, Cato, Caesar). Stay strictly " +
      "within documented history. " + RULING_CONTRACT,
    turns: [
      {
        context: "November 63 BC. Cicero, as consul, has evidence that Catiline plots armed revolt, but lacks proof to execute a senator.",
        scene:
          "November 63 BC. The Senate convenes in the temple of Jupiter Stator. Consul Cicero has informants warning that the patrician Catiline is raising an army to seize Rome — yet hard proof against a senator is thin. Catiline himself sits among the senators, watching. The Republic's fate may hinge on the next move.",
        image_prompt: "ancient Roman senate chamber, a consul addressing senators in togas, tense, classical period illustration",
        options: [
          { label: "Denounce Catiline openly before the Senate", ruling: "Accurate — Cicero delivered his First Catilinarian oration ('Quo usque tandem abutere, Catilina, patientia nostra?'), and Catiline fled Rome that night to his army in Etruria.", whatReallyHappened: "Cicero's speech drove Catiline out of Rome without bloodshed in the chamber.", accurate: true },
          { label: "Have Catiline struck down on the Senate floor", ruling: "Correct — Cicero ordered Catiline killed where he sat, ending the conspiracy on the spot.", whatReallyHappened: "Cicero did NOT have him killed — he lacked proof to execute a senator and instead exposed him in a speech, prompting Catiline to flee.", accurate: false },
          { label: "Invoke the senatus consultum ultimum and prepare the city", ruling: "Plausible — the Senate had already passed its 'final decree' empowering the consuls to protect the Republic by any means.", whatReallyHappened: "The senatus consultum ultimum was indeed in force, pressuring Cicero to act decisively.", accurate: true },
        ],
      },
      {
        context: "December 5, 63 BC. Five conspirators are caught with letters proving treason. The Senate debates their fate.",
        scene:
          "December 5, 63 BC. Five of Catiline's allies in Rome have been seized with incriminating letters under seal. They are citizens, and Roman law guarantees a citizen's right to trial — yet the city fears an uprising. In the Senate, Caesar rises to argue one way, Cato the Younger another. Cicero must guide the vote.",
        image_prompt: "Roman senate debate at night by torchlight, a young senator speaking passionately, classical period illustration",
        options: [
          { label: "Vote for execution without trial", ruling: "Plausible — after Cato's fierce speech the Senate voted for death, and the five were strangled in the Tullianum prison that very night.", whatReallyHappened: "They were executed without trial on December 5, 63 BC — a legally dubious act that would later be used to exile Cicero.", accurate: true },
          { label: "Adopt Caesar's proposal of life imprisonment", ruling: "Accurate — Caesar argued for confiscation of property and lifelong detention in the Italian towns, warning of the dangerous precedent of killing citizens untried.", whatReallyHappened: "Caesar did propose imprisonment; Cato's counter-speech swung the Senate back to execution.", accurate: true },
          { label: "Release them to stand trial in the courts", ruling: "Correct — honoring Roman law, the conspirators were tried in open court and the matter settled by a jury.", whatReallyHappened: "They were NOT tried. The Senate executed them without trial — the very controversy at the heart of this episode.", accurate: false },
        ],
      },
      {
        context: "The aftermath. Cicero is hailed as savior — but the executions will echo for years.",
        scene:
          "The conspirators are dead and Catiline's army will soon be crushed at Pistoria. Cicero is acclaimed in the Forum. Yet he executed Roman citizens without trial, and his enemies are already whispering. How does the story of this consulship end?",
        image_prompt: "Roman forum, a consul honored by a crowd, long shadows, classical period illustration",
        options: [
          { label: "Accept the honor of 'pater patriae'", ruling: "Accurate — Cicero was hailed 'father of the fatherland', the height of his career, though the executions would haunt him.", whatReallyHappened: "He was celebrated then, but the illegal executions led to his exile in 58 BC under the tribune Clodius.", accurate: true },
          { label: "Grant the conspirators a posthumous pardon", ruling: "Correct — to calm the city Cicero issued a formal pardon clearing the executed men's names.", whatReallyHappened: "No such pardon happened; the dead were not rehabilitated, and the legality of the executions stayed bitterly disputed.", accurate: false },
          { label: "Brace for the political backlash", ruling: "Plausible — acting against citizens untried, Cicero knew his enemies could one day turn the deed against him.", whatReallyHappened: "Exactly so: Clodius later exiled him on the charge of executing citizens without trial.", accurate: true },
        ],
      },
    ],
  },

  "apollo11-go-nogo": {
    id: "apollo11-go-nogo",
    name: "Apollo 11: Go / No-Go (1969)",
    blurb: "July 20, 1969. The lunar module Eagle is minutes from the Moon — and every alarm forces a split-second go/no-go call.",
    systemPrompt:
      "You are History Lab's Game Master and Historian for the Apollo 11 lunar landing of July 20, 1969 (Armstrong, Aldrin, Mission Control, the 1202 alarms). Stay strictly " +
      "within documented history. " + RULING_CONTRACT,
    turns: [
      {
        context: "Powered descent. The guidance computer flashes a '1202' program alarm. Continue or abort?",
        scene:
          "July 20, 1969. Eagle is dropping toward the Sea of Tranquility when the guidance computer suddenly flashes a '1202' alarm — then '1201'. Armstrong calls it down tersely. In Mission Control, a 26-year-old guidance officer has seconds to decide whether the alarms are fatal. The descent does not pause for anyone.",
        image_prompt: "1969 NASA mission control room, rows of consoles, tense flight controllers, period illustration",
        options: [
          { label: "Call 'Go' — the alarm is survivable", ruling: "Accurate — Steve Bales and Jack Garman recognized the 1202/1201 as executive-overflow alarms; the computer was shedding low-priority tasks but still flying, so they called 'Go'.", whatReallyHappened: "Mission Control cleared the alarms and the descent continued — the computer was overloaded but never lost control.", accurate: true },
          { label: "Abort the landing and return to orbit", ruling: "Correct — the alarms triggered an abort, and Apollo 11 climbed back to orbit to try the landing the next day.", whatReallyHappened: "They did NOT abort. The alarms were judged safe and Eagle pressed on to a successful landing.", accurate: false },
          { label: "Keep descending while engineers diagnose the alarm", ruling: "Plausible — the crew kept the computer in the loop and pressed on while Mission Control confirmed the alarms were non-fatal.", whatReallyHappened: "They continued the descent with the computer flying, exactly as Mission Control advised.", accurate: true },
        ],
      },
      {
        context: "Near the surface, the computer is steering Eagle into a boulder field — and fuel is running low.",
        scene:
          "Two thousand feet up, Armstrong sees where the computer is taking them: a crater rimmed with car-sized boulders. The fuel gauge is dropping fast. Aldrin calls altitude and velocity in a steady stream. There are seconds, not minutes, to decide.",
        image_prompt: "view from lunar module window over grey cratered moon surface with boulders, 1969, period illustration",
        options: [
          { label: "Take semi-manual control and fly past the boulders", ruling: "Accurate — Armstrong took semi-manual control, skimming over the boulder field to find smoother ground as the fuel dwindled.", whatReallyHappened: "Armstrong manually extended the flight to clear the rocks, landing with only a slim fuel margin.", accurate: true },
          { label: "Let the autopilot land on its chosen spot", ruling: "The computer's target was strewn with boulders that could tip the lander, so Armstrong overrode it rather than trust the auto-target.", whatReallyHappened: "He overrode the automatic landing point to reach safer ground.", accurate: true },
          { label: "Abort to orbit because fuel is low", ruling: "Correct — fuel reached the red line, so Armstrong aborted and rendezvoused with Collins in the command module.", whatReallyHappened: "They did NOT abort. After the '30 seconds' fuel call, Eagle touched down with roughly 25 seconds of margin to spare.", accurate: false },
        ],
      },
      {
        context: "Eagle is down. Now Mission Control must make the immediate Stay / No-Stay decision.",
        scene:
          "\"Houston, Tranquility Base here. The Eagle has landed.\" Relief floods the control room — but the job isn't done. In the first minutes on the surface, flight controllers must poll the room for a 'Stay' or 'No-Stay', ready to launch Eagle straight back to orbit if anything is wrong.",
        image_prompt: "lunar module on the moon surface with Earth in black sky, 1969, period illustration",
        options: [
          { label: "Poll the room and give a 'Stay'", ruling: "Accurate — Mission Control ran two stay/no-stay polls in the first minutes; both came back 'Stay', and the crew remained.", whatReallyHappened: "Two stay/no-stay decisions were passed and Eagle stayed on the surface.", accurate: true },
          { label: "Lift off again at once as a precaution", ruling: "Correct — as a safety measure Eagle lifted off within minutes and re-landed once the systems checked out.", whatReallyHappened: "No precautionary liftoff happened. Eagle stayed on the surface for about 21.5 hours.", accurate: false },
          { label: "Begin the moonwalk ahead of schedule", ruling: "Plausible — though the flight plan called for a rest period, Armstrong and Aldrin chose to begin the EVA early.", whatReallyHappened: "They skipped the scheduled rest and started the historic moonwalk hours ahead of plan.", accurate: true },
        ],
      },
    ],
  },
};

export function getScenario(id) { return SCENARIOS[id]; }
export function listScenarios() {
  return Object.values(SCENARIOS).map((s) => ({ id: s.id, name: s.name, blurb: s.blurb }));
}
