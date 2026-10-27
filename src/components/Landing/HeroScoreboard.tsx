"use client";

import React from "react";
import Link from "next/link";
import { Button } from "@/components/common/Button";
import { Section } from "@/components/Landing/Section";
import { SectionContainer } from "@/components/Landing/SectionContainer";
import { Play, CheckCircle2 } from "lucide-react";

/**
 * @description Bola de futebol com geometria vetorial euclidiana exata.
 */
function SoccerBallIcon({ className = "w-[0.85em] h-[0.85em]" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`inline-block align-middle shrink-0 ${className}`}
      aria-hidden="true"
    >
      {/* Contorno externo da bola */}
      <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="1.6" />

      {/* Pentágono regular central */}
      <polygon
        points="12,8 15.8,10.76 14.35,15.24 9.65,15.24 8.2,10.76"
        fill="currentColor"
        stroke="currentColor"
        strokeWidth="0.5"
      />

      {/* 5 Linhas de costura radiais simétricas conectadas diretamente à borda */}
      <line x1="12" y1="8" x2="12" y2="2" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
      <line x1="15.8" y1="10.76" x2="21.51" y2="8.91" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
      <line x1="14.35" y1="15.24" x2="17.88" y2="20.09" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
      <line x1="9.65" y1="15.24" x2="6.12" y2="20.09" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
      <line x1="8.2" y1="10.76" x2="2.49" y2="8.91" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
    </svg>
  );
}

const LEAGUES = [
  {
    name: "Premier League",
    logo: "https://images.fotmob.com/image_resources/logo/leaguelogo/dark/47.png"
  },
  {
    name: "La Liga",
    logo: "https://images.fotmob.com/image_resources/logo/leaguelogo/dark/87.png"
  },
  {
    name: "Serie A",
    logo: "https://images.fotmob.com/image_resources/logo/leaguelogo/dark/55.png"
  },
  {
    name: "Bundesliga",
    logo: "https://images.fotmob.com/image_resources/logo/leaguelogo/dark/54.png"
  },
  {
    name: "Ligue 1",
    logo: "https://images.fotmob.com/image_resources/logo/leaguelogo/dark/53.png"
  }
];

/**
 * @description Seção Hero no formato vertical (flex-col) com card de gramado e CTA centralizado.
 */
export function HeroScoreboard() {
  return (
    <Section variant="default" size="lg" className="pt-10 sm:pt-16 pb-12 sm:pb-20">
      <SectionContainer size="lg" centered padded className="flex flex-col items-center text-center">
        {/* Título Principal com a Bola no 2º O */}
        <div className="flex flex-col items-center">
          <div className="flex items-center justify-center text-white font-display text-7xl sm:text-8xl md:text-9xl tracking-wider leading-none select-none drop-shadow-md">
            <span>FO</span>
            <span className="mx-1 sm:mx-1.5 inline-flex items-center justify-center text-white">
              <SoccerBallIcon className="w-[0.82em] h-[0.82em]" />
            </span>
            <span>TLE</span>
          </div>
          <span className="text-xs sm:text-sm font-semibold text-slate-300 tracking-[0.35em] uppercase mt-2">
            5 Grandes Ligas Europeias
          </span>
        </div>

        {/* Apresentação das 5 Ligas com Logos Oficiais e Nomes */}
        <div className="flex flex-wrap items-center justify-center gap-5 sm:gap-8 mt-8 mb-10 sm:mb-12">
          {LEAGUES.map((league) => (
            <div
              key={league.name}
              className="flex flex-col items-center justify-center gap-2 group cursor-default"
            >
              <div className="w-13 h-13 sm:w-16 sm:h-16 p-2.5 rounded-2xl bg-white/5 border border-white/10 group-hover:border-white/30 backdrop-blur-md shadow-md flex items-center justify-center transition-all group-hover:scale-105">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={league.logo}
                  alt={league.name}
                  className="w-full h-full object-contain filter drop-shadow"
                  loading="lazy"
                />
              </div>
              <span className="text-[11px] sm:text-xs text-slate-300 font-medium tracking-wide group-hover:text-white transition-colors">
                {league.name}
              </span>
            </div>
          ))}
        </div>

        {/* Card Principal em Estrutura Vertical (flex-col) */}
        <div className="w-full max-w-4xl rounded-3xl card-silver-glass p-6 sm:p-10 border border-white/20 shadow-2xl backdrop-blur-2xl flex flex-col items-center text-center gap-7 sm:gap-8 relative overflow-hidden">
          
          {/* 1. Bloco de Informações do Modo */}
          <div className="flex flex-col items-center max-w-2xl mx-auto w-full">
            <h2 className="font-display text-4xl sm:text-5xl md:text-6xl text-white tracking-wide leading-tight">
              MODO BIG FIVE EUROPEU
            </h2>

            <p className="text-xs sm:text-sm md:text-base text-slate-300 mt-2.5 leading-relaxed font-normal">
              Adivinhe o atleta secreto de hoje em até 10 chutes. O jogo cruza estatísticas em tempo real de 1.717 jogadores da Premier League, La Liga, Serie A, Bundesliga e Ligue 1.
            </p>

            {/* Contadores da Base */}
            <div className="grid grid-cols-3 gap-2.5 sm:gap-4 w-full max-w-lg mt-5">
              <div className="p-3 sm:p-3.5 rounded-2xl bg-white/5 border border-white/10 text-center shadow-inner">
                <span className="font-sans text-xl sm:text-2xl font-bold tabular-nums text-white">
                  1.717
                </span>
                <span className="block text-[10px] sm:text-[11px] uppercase tracking-wider text-slate-400 font-semibold mt-0.5">
                  Atletas
                </span>
              </div>

              <div className="p-3 sm:p-3.5 rounded-2xl bg-white/5 border border-white/10 text-center shadow-inner">
                <span className="font-sans text-xl sm:text-2xl font-bold tabular-nums text-emerald-400">
                  127
                </span>
                <span className="block text-[10px] sm:text-[11px] uppercase tracking-wider text-slate-400 font-semibold mt-0.5">
                  Clubes
                </span>
              </div>

              <div className="p-3 sm:p-3.5 rounded-2xl bg-white/5 border border-white/10 text-center shadow-inner">
                <span className="font-sans text-xl sm:text-2xl font-bold tabular-nums text-cyan-400">
                  10
                </span>
                <span className="block text-[10px] sm:text-[11px] uppercase tracking-wider text-slate-400 font-semibold mt-0.5">
                  Chutes
                </span>
              </div>
            </div>
          </div>

          {/* 2. Bloco com Fundo de Gramado de Futebol (Pitch Background via classe CSS global) */}
          <div className="pitch-stripes-bg w-full max-w-2xl rounded-2xl border border-white/15 p-4 sm:p-6 shadow-2xl flex flex-col gap-3.5 relative overflow-hidden text-left">
            {/* Topo da Simulação */}
            <div className="flex items-center justify-between border-b border-white/15 pb-2.5 text-xs">
              <span className="font-bold text-slate-300 uppercase tracking-wider text-[11px]">
                Simulação de Chute #03
              </span>
              <div className="flex items-center gap-1.5 text-emerald-400 font-semibold text-xs">
                <CheckCircle2 className="w-4 h-4" />
                <span>4/6 Corretos</span>
              </div>
            </div>

            {/* Atleta do Exemplo */}
            <div className="flex items-center gap-3 p-2.5 rounded-xl bg-black/40 border border-white/15">
              <div className="w-10 h-10 rounded-lg bg-slate-800 border border-white/20 flex items-center justify-center text-xl shrink-0">
                ⚡
              </div>
              <div className="flex flex-col min-w-0">
                <span className="font-display text-base text-white tracking-wide truncate">
                  RODRI
                </span>
                <span className="text-xs text-slate-300 truncate">
                  Manchester City • Espanha
                </span>
              </div>
            </div>

            {/* Grid 2x3 com Feedbacks Coloridos */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-xs">
              {/* Nacionalidade */}
              <div className="p-2.5 rounded-xl bg-emerald-500/25 border border-emerald-400/80 flex flex-col items-center justify-center text-center shadow-sm">
                <span className="text-[9px] uppercase font-bold text-emerald-300">Nacionalidade</span>
                <span className="font-semibold text-white mt-0.5 text-xs">Espanha 🇪🇸</span>
                <span className="text-[9px] text-emerald-200 font-medium">Exato</span>
              </div>

              {/* Clube Atual */}
              <div className="p-2.5 rounded-xl bg-emerald-500/25 border border-emerald-400/80 flex flex-col items-center justify-center text-center shadow-sm">
                <span className="text-[9px] uppercase font-bold text-emerald-300">Clube Atual</span>
                <span className="font-semibold text-white mt-0.5 text-xs">Man. City 🛡️</span>
                <span className="text-[9px] text-emerald-200 font-medium">Exato</span>
              </div>

              {/* Liga */}
              <div className="p-2.5 rounded-xl bg-emerald-500/25 border border-emerald-400/80 flex flex-col items-center justify-center text-center shadow-sm">
                <span className="text-[9px] uppercase font-bold text-emerald-300">Liga</span>
                <span className="font-semibold text-white mt-0.5 text-xs">Premier 🏆</span>
                <span className="text-[9px] text-emerald-200 font-medium">Exato</span>
              </div>

              {/* Posição */}
              <div className="p-2.5 rounded-xl bg-emerald-500/25 border border-emerald-400/80 flex flex-col items-center justify-center text-center shadow-sm">
                <span className="text-[9px] uppercase font-bold text-emerald-300">Posição</span>
                <span className="font-semibold text-white mt-0.5 text-xs">Meio-campo ⚽</span>
                <span className="text-[9px] text-emerald-200 font-medium">Exato</span>
              </div>

              {/* Idade */}
              <div className="p-2.5 rounded-xl bg-black/40 border border-white/20 flex flex-col items-center justify-center text-center shadow-sm">
                <span className="text-[9px] uppercase font-bold text-slate-300">Idade</span>
                <div className="flex items-center gap-1 mt-0.5">
                  <span className="font-semibold text-white text-xs">28 anos</span>
                  <span className="text-amber-400 font-bold">⬆</span>
                </div>
                <span className="text-[9px] text-slate-400">Mais velho</span>
              </div>

              {/* Gols */}
              <div className="p-2.5 rounded-xl bg-black/40 border border-white/20 flex flex-col items-center justify-center text-center shadow-sm">
                <span className="text-[9px] uppercase font-bold text-slate-300">Gols Carreira</span>
                <div className="flex items-center gap-1 mt-0.5">
                  <span className="font-semibold text-white text-xs">35 gols</span>
                  <span className="text-cyan-400 font-bold">⬆</span>
                </div>
                <span className="text-[9px] text-slate-400">Mais gols</span>
              </div>
            </div>

            {/* Rodapé da Simulação */}
            <span className="text-[10px] text-slate-400 text-center italic mt-0.5">
              Cores e setas guiam você até o jogador secreto.
            </span>
          </div>

          {/* 3. Botão de Ação Primária Centralizado */}
          <div className="w-full flex items-center justify-center pt-1">
            <Link href="/play" className="w-full sm:w-auto">
              <Button
                variant="gradient"
                size="lg"
                className="w-full sm:w-auto min-w-[280px] gap-2.5 py-4 px-10 text-base font-bold shadow-xl shadow-emerald-950/70 hover:scale-[1.02] transition-transform"
              >
                <Play className="w-5 h-5 fill-white" />
                <span>ENTRAR EM CAMPO</span>
              </Button>
            </Link>
          </div>

        </div>
      </SectionContainer>
    </Section>
  );
}
