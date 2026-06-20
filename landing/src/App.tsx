import { useState } from "react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import EcosystemRow from "./components/EcosystemRow";
import UseCasePills from "./components/UseCasePills";
import Featured from "./components/Featured";
import KeyWorkflows from "./components/KeyWorkflows";
import ExploreTabs from "./components/ExploreTabs";
import ProblemSolution from "./components/ProblemSolution";
import HowItWorks from "./components/HowItWorks";
import CtaBand from "./components/CtaBand";
import Footer from "./components/Footer";
import Login from "./components/Login";
import Game from "./game/Game";
import Particles from "./components/Particles";

type View = "home" | "login" | "app";

export default function App() {
  const [view, setView] = useState<View>("home");
  const [player, setPlayer] = useState("Historian");

  if (view === "login") {
    return (
      <Login
        onBack={() => setView("home")}
        onSuccess={(name) => {
          setPlayer(name);
          setView("app");
        }}
      />
    );
  }

  if (view === "app") {
    return <Game player={player} onExit={() => setView("home")} />;
  }

  const launch = () => setView("login");

  return (
    <div className="relative min-h-screen overflow-x-hidden bg-canvas">
      {/* site-wide animated particle background (fixed, behind everything, non-interactive) */}
      <div className="pointer-events-none fixed inset-0 z-0 opacity-40">
        <Particles
          particleColors={["#1b2540", "#7c8cff", "#b07bff", "#2b2222"]}
          particleCount={180}
          particleSpread={14}
          speed={0.1}
          particleBaseSize={80}
          sizeRandomness={1}
          alphaParticles={true}
          moveParticlesOnHover={false}
          disableRotation={false}
        />
      </div>

      {/* foreground content */}
      <div className="relative z-10">
        <Navbar onLaunch={launch} />
        <main>
          <Hero onLaunch={launch} />
          <EcosystemRow />
          <UseCasePills />
          <Featured />
          <KeyWorkflows />
          <ExploreTabs />
          <ProblemSolution />
          <HowItWorks />
          <CtaBand onLaunch={launch} />
        </main>
        <Footer />
      </div>
    </div>
  );
}
