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
    <div className="min-h-screen bg-canvas">
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
  );
}
