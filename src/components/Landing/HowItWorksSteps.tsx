"use client";

import React from "react";
import { Section } from "@/components/Landing/Section";
import { SectionContainer } from "@/components/Landing/SectionContainer";
import { SectionHeader } from "@/components/Landing/SectionHeader";
import { Search, CheckCircle2, ArrowUp, HelpCircle } from "lucide-react";

export interface StepBadge {
  label: string;
  variant: "correct" | "partial" | "neutral";
}

/**
 * @description Seção com a jornada em 3 passos numerados inspirada no Spotle oficial.
 */
export function HowItWorksSteps() {
  return (
    <Section variant="default" size="lg" className="py-12 sm:py-20">
      <SectionContainer size="lg" centered padded className="flex flex-col gap-8 sm:gap-10">
        
        {/* Cabeçalho da Seção */}
        <SectionHeader
          badge="COMO FUNCIONA"
          icon={<HelpCircle className="w-3.5 h-3.5 text-emerald-400" />}
          title="PASSO A PASSO DO JOGO"
          subtitle="Sem chutes às cegas. Entenda como o sistema de comparação guia seus palpites até o craque misterioso."
          align="center"
        />

        {/* Lista de 3 Passos Verticais */}
        <div className="flex flex-col gap-6 sm:gap-8 w-full max-w-4xl mx-auto">

          {/* PASSO 01: Digite qualquer atleta */}
          <div className="card-silver-glass rounded-3xl p-6 sm:p-8 border border-white/15 shadow-xl flex flex-col gap-4">
            <div className="flex items-start gap-4 sm:gap-5">
              <span className="font-display text-4xl sm:text-5xl text-amber-400 leading-none shrink-0">
                01
              </span>
              <div className="flex flex-col min-w-0">
                <h3 className="font-display text-2xl sm:text-3xl text-white tracking-wide leading-tight">
                  DIGITE QUALQUER ATLETA
                </h3>
                <p className="text-xs sm:text-sm text-slate-300 mt-1 leading-relaxed">
                  Pesquise entre 1.717 jogadores das 5 grandes ligas e selecione um nome da lista suspensa. Os 6 atributos serão comparados instantaneamente.
                </p>
              </div>
            </div>

            {/* Simulação do Input de Busca */}
            <div className="w-full mt-2 p-3 sm:p-3.5 rounded-2xl bg-black/40 border border-white/15 flex items-center gap-3 text-slate-300">
              <Search className="w-4 h-4 text-emerald-400 shrink-0" />
              <span className="font-medium text-xs sm:text-sm text-white">
                Erling Haaland
              </span>
              <span className="ml-auto text-[11px] text-slate-400 uppercase tracking-wider font-semibold hidden sm:inline-block">
                Manchester City • Atacante
              </span>
            </div>
          </div>

          {/* PASSO 02: Leia as pistas comparativas */}
          <div className="card-silver-glass rounded-3xl p-6 sm:p-8 border border-white/15 shadow-xl flex flex-col gap-4">
            <div className="flex items-start gap-4 sm:gap-5">
              <span className="font-display text-4xl sm:text-5xl text-amber-400 leading-none shrink-0">
                02
              </span>
              <div className="flex flex-col min-w-0">
                <h3 className="font-display text-2xl sm:text-3xl text-white tracking-wide leading-tight">
                  LEIA AS PISTAS COMPARATIVAS
                </h3>
                <p className="text-xs sm:text-sm text-slate-300 mt-1 leading-relaxed">
                  A cada palpite, as cores e setas indicam sua proximidade em relação ao atleta do dia:
                </p>

                {/* Legenda das Cores */}
                <div className="flex flex-wrap gap-2 mt-3 text-xs">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/20 border border-emerald-400/80 text-emerald-300 font-medium">
                    <span className="w-2 h-2 rounded-full bg-emerald-400" />
                    Verde: Correto
                  </span>

                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/20 border border-amber-400/80 text-amber-300 font-medium">
                    <span className="w-2 h-2 rounded-full bg-amber-400" />
                    Âmbar: Parcial / Próximo
                  </span>

                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 border border-white/20 text-slate-300 font-medium">
                    <span className="w-2 h-2 rounded-full bg-slate-400" />
                    Cinza: Direcional (⬆/⬇)
                  </span>
                </div>
              </div>
            </div>

            {/* Simulação Visual de Palpite Parcial (Rodri) */}
            <div className="w-full mt-2 p-4 sm:p-5 rounded-2xl bg-black/40 border border-white/15 flex flex-col gap-3">
              <div className="flex items-center justify-between border-b border-white/10 pb-2 text-xs">
                <span className="font-display text-sm sm:text-base text-white tracking-wide">
                  RODRI <span className="text-slate-400 text-xs font-sans font-normal">• Manchester City</span>
                </span>
                <span className="text-amber-400 font-semibold text-xs">
                  Tentativa #02 • 4/6 Acertos
                </span>
              </div>

              {/* Grid de 6 Atributos com Pistas Reais */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-xs">
                <div className="p-2.5 rounded-xl bg-emerald-500/20 border border-emerald-400/80 text-center flex flex-col items-center">
                  <span className="text-[9px] uppercase font-bold text-emerald-300">Nacionalidade</span>
                  <span className="font-semibold text-white mt-0.5">Espanha 🇪🇸</span>
                  <span className="text-[9px] text-emerald-200">Exato</span>
                </div>

                <div className="p-2.5 rounded-xl bg-emerald-500/20 border border-emerald-400/80 text-center flex flex-col items-center">
                  <span className="text-[9px] uppercase font-bold text-emerald-300">Clube Atual</span>
                  <span className="font-semibold text-white mt-0.5">Man. City 🛡️</span>
                  <span className="text-[9px] text-emerald-200">Exato</span>
                </div>

                <div className="p-2.5 rounded-xl bg-emerald-500/20 border border-emerald-400/80 text-center flex flex-col items-center">
                  <span className="text-[9px] uppercase font-bold text-emerald-300">Liga</span>
                  <span className="font-semibold text-white mt-0.5">Premier 🏆</span>
                  <span className="text-[9px] text-emerald-200">Exato</span>
                </div>

                <div className="p-2.5 rounded-xl bg-emerald-500/20 border border-emerald-400/80 text-center flex flex-col items-center">
                  <span className="text-[9px] uppercase font-bold text-emerald-300">Posição</span>
                  <span className="font-semibold text-white mt-0.5">Meio-campo ⚽</span>
                  <span className="text-[9px] text-emerald-200">Exato</span>
                </div>

                <div className="p-2.5 rounded-xl bg-white/5 border border-white/15 text-center flex flex-col items-center">
                  <span className="text-[9px] uppercase font-bold text-slate-400">Idade</span>
                  <div className="flex items-center gap-1 mt-0.5">
                    <span className="font-semibold text-white">28 anos</span>
                    <span className="text-amber-400 font-bold">⬇</span>
                  </div>
                  <span className="text-[9px] text-slate-400">Mais novo</span>
                </div>

                <div className="p-2.5 rounded-xl bg-white/5 border border-white/15 text-center flex flex-col items-center">
                  <span className="text-[9px] uppercase font-bold text-slate-400">Gols Carreira</span>
                  <div className="flex items-center gap-1 mt-0.5">
                    <span className="font-semibold text-white">35 gols</span>
                    <span className="text-cyan-400 font-bold">⬆</span>
                  </div>
                  <span className="text-[9px] text-slate-400">Mais gols</span>
                </div>
              </div>
            </div>
          </div>

          {/* PASSO 03: Acerte o craque secreto */}
          <div className="card-silver-glass rounded-3xl p-6 sm:p-8 border border-emerald-500/30 shadow-xl flex flex-col gap-4">
            <div className="flex items-start gap-4 sm:gap-5">
              <span className="font-display text-4xl sm:text-5xl text-emerald-400 leading-none shrink-0">
                03
              </span>
              <div className="flex flex-col min-w-0">
                <h3 className="font-display text-2xl sm:text-3xl text-white tracking-wide leading-tight">
                  ACERTE O CRAQUE SECRETO E VENÇA
                </h3>
                <p className="text-xs sm:text-sm text-slate-300 mt-1 leading-relaxed">
                  Use os direcionamentos acumulados para refinar seu palpite. Você tem até 10 tentativas. Ao acertar todos os 6 atributos, a vitória é sua!
                </p>
              </div>
            </div>

            {/* Simulação Visual do Card 100% Verde (Haaland) */}
            <div className="w-full mt-2 p-4 sm:p-5 rounded-2xl bg-emerald-950/30 border border-emerald-500/40 flex flex-col gap-3 shadow-inner">
              <div className="flex items-center justify-between border-b border-emerald-500/30 pb-2 text-xs">
                <span className="font-display text-sm sm:text-base text-white tracking-wide">
                  ERLING HAALAND <span className="text-emerald-200 text-xs font-sans font-normal">• Manchester City</span>
                </span>
                <div className="flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-500/30 border border-emerald-400/80 text-emerald-300 font-bold text-xs uppercase tracking-wide">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Vitória • 6/6 Acertos</span>
                </div>
              </div>

              {/* Grid 100% Verde */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-xs">
                <div className="p-2.5 rounded-xl bg-emerald-500/25 border border-emerald-400/80 text-center flex flex-col items-center">
                  <span className="text-[9px] uppercase font-bold text-emerald-300">Nacionalidade</span>
                  <span className="font-semibold text-white mt-0.5">Noruega 🇳🇴</span>
                  <span className="text-[9px] text-emerald-200">Exato</span>
                </div>

                <div className="p-2.5 rounded-xl bg-emerald-500/25 border border-emerald-400/80 text-center flex flex-col items-center">
                  <span className="text-[9px] uppercase font-bold text-emerald-300">Clube Atual</span>
                  <span className="font-semibold text-white mt-0.5">Man. City 🛡️</span>
                  <span className="text-[9px] text-emerald-200">Exato</span>
                </div>

                <div className="p-2.5 rounded-xl bg-emerald-500/25 border border-emerald-400/80 text-center flex flex-col items-center">
                  <span className="text-[9px] uppercase font-bold text-emerald-300">Liga</span>
                  <span className="font-semibold text-white mt-0.5">Premier 🏆</span>
                  <span className="text-[9px] text-emerald-200">Exato</span>
                </div>

                <div className="p-2.5 rounded-xl bg-emerald-500/25 border border-emerald-400/80 text-center flex flex-col items-center">
                  <span className="text-[9px] uppercase font-bold text-emerald-300">Posição</span>
                  <span className="font-semibold text-white mt-0.5">Atacante ⚽</span>
                  <span className="text-[9px] text-emerald-200">Exato</span>
                </div>

                <div className="p-2.5 rounded-xl bg-emerald-500/25 border border-emerald-400/80 text-center flex flex-col items-center">
                  <span className="text-[9px] uppercase font-bold text-emerald-300">Idade</span>
                  <span className="font-semibold text-white mt-0.5">24 anos</span>
                  <span className="text-[9px] text-emerald-200">Exato</span>
                </div>

                <div className="p-2.5 rounded-xl bg-emerald-500/25 border border-emerald-400/80 text-center flex flex-col items-center">
                  <span className="text-[9px] uppercase font-bold text-emerald-300">Gols Carreira</span>
                  <span className="font-semibold text-white mt-0.5">260+ gols</span>
                  <span className="text-[9px] text-emerald-200">Exato</span>
                </div>
              </div>
            </div>
          </div>

        </div>
      </SectionContainer>
    </Section>
  );
}
