import React from "react";
import { HeroScoreboard } from "@/components/Landing/HeroScoreboard";
import { HowItWorksSteps } from "@/components/Landing/HowItWorksSteps";
import { AttributesGrid } from "@/components/Landing/AttributesGrid";
import { FaqSection } from "@/components/Landing/FaqSection";
import { LandingCta } from "@/components/Landing/LandingCta";
import { SectionDivider } from "@/components/Landing/SectionDivider";

export const metadata = {
  title: "Footle | Spotle de Futebol das 5 Grandes Ligas",
  description: "Adivinhe o jogador secreto da Premier League, La Liga, Serie A, Bundesliga e Ligue 1 em até 10 tentativas.",
};

export default function LandingPage() {
  return (
    <div className="min-h-screen w-full relative z-20 flex flex-col text-white selection:bg-emerald-500 selection:text-black bg-landing-gradient">
      <main className="flex-1 flex flex-col w-full">
        {/* Seção 1: Hero Scoreboard */}
        <HeroScoreboard />

        {/* Divisor com ponto de luz */}
        <SectionDivider variant="glow" />

        {/* Seção 2: Como Funciona (Passos 01, 02 e 03) */}
        <HowItWorksSteps />

        {/* Divisor elegante */}
        <SectionDivider variant="gradient" />

        {/* Seção 3: Os 6 Atributos do Jogo */}
        <AttributesGrid />

        {/* Divisor com ponto de luz */}
        <SectionDivider variant="glow" />

        {/* Seção 4: Perguntas Frequentes (FAQ) */}
        <FaqSection />

        {/* Divisor elegante */}
        <SectionDivider variant="gradient" />

        {/* Seção 5: CTA Final de Conversão & Rodapé */}
        <LandingCta />
      </main>
    </div>
  );
}
