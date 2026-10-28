import React from "react";
import { HeroScoreboard } from "@/components/Landing/HeroScoreboard";
import { HowItWorksSteps } from "@/components/Landing/HowItWorksSteps";
import { AttributesGrid } from "@/components/Landing/AttributesGrid";
import { FaqSection } from "@/components/Landing/FaqSection";
import { LandingCta } from "@/components/Landing/LandingCta";
import { LandingFooter } from "@/components/Landing/LandingFooter";

export const metadata = {
  title: "Footle | Desafio Diário das 5 Grandes Ligas",
  description:
    "Descubra o jogador secreto da Premier League, La Liga, Serie A, Bundesliga e Ligue 1 em até 10 chutes."
};

export default function LandingPage() {
  return (
    <div
      id="topo"
      className="relative w-full landing-root selection:bg-emerald-400 selection:text-black"
    >
      {/* Capítulo 1: Palco do Campo Animado (100dvh, sticky) */}
      <HeroScoreboard />

      {/* Capítulo 2: Painel Tático Sólido deslizando sobre o campo */}
      <div className="relative z-20 tactical-sheet-section">
        <main className="w-full max-w-4xl mx-auto px-4 sm:px-8 py-14 sm:py-20 flex flex-col gap-16 sm:gap-20">
          <HowItWorksSteps />
          <AttributesGrid />
          <FaqSection />
          <LandingCta />
          <LandingFooter />
        </main>
      </div>
    </div>
  );
}
