"use client";

import React from "react";
import { Section } from "@/components/Landing/Section";
import { SectionContainer } from "@/components/Landing/SectionContainer";
import { SectionHeader } from "@/components/Landing/SectionHeader";
import { Globe, Shield, Trophy, Activity, Calendar, Target, Layers } from "lucide-react";

export interface PlayerAttributeItem {
  id: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  exactMatch: string;
  partialMatch?: string;
  directionalMatch?: string;
}

const ATTRIBUTES: PlayerAttributeItem[] = [
  {
    id: "01",
    label: "Nacionalidade",
    icon: Globe,
    exactMatch: "Mesmo país de nascimento ou nacionalidade esportiva.",
    partialMatch: "Mesmo continente (ex: América do Sul, Europa)."
  },
  {
    id: "02",
    label: "Clube Atual",
    icon: Shield,
    exactMatch: "Mesmo clube da temporada 2026/2027.",
    partialMatch: "Ex-clube em comum no histórico da carreira do atleta."
  },
  {
    id: "03",
    label: "Liga Nacional",
    icon: Trophy,
    exactMatch: "Mesma liga nacional (Premier, La Liga, Serie A, Bundesliga ou Ligue 1)."
  },
  {
    id: "04",
    label: "Posição em Campo",
    icon: Activity,
    exactMatch: "Mesma posição exata (Goleiro, Defensor, Meio-campista ou Atacante).",
    partialMatch: "Posição adjacente ou setor semelhante do campo."
  },
  {
    id: "05",
    label: "Idade",
    icon: Calendar,
    exactMatch: "Idade exata em anos.",
    directionalMatch: "Setas indicam se o jogador secreto é mais velho (⬆) ou mais novo (⬇)."
  },
  {
    id: "06",
    label: "Gols na Carreira",
    icon: Target,
    exactMatch: "Total exato de gols oficiais.",
    partialMatch: "Margem próxima de até ±25 gols de diferença.",
    directionalMatch: "Setas indicam se o atleta tem mais gols (⬆) ou menos gols (⬇)."
  }
];

/**
 * @description Grid explicativo com os 6 atributos avaliados em cards numerados.
 */
export function AttributesGrid() {
  return (
    <Section variant="default" size="lg" className="py-12 sm:py-20">
      <SectionContainer size="lg" centered padded className="flex flex-col gap-8 sm:gap-10">
        
        {/* Cabeçalho */}
        <SectionHeader
          badge="CRITÉRIOS DE AVALIAÇÃO"
          icon={<Layers className="w-3.5 h-3.5 text-emerald-400" />}
          title="OS 6 ATRIBUTOS DO JOGO"
          subtitle="Cada tentativa compara simultaneamente 6 atributos oficiais de cada atleta no banco de dados."
          align="center"
        />

        {/* Grid 2x3 de Cards Numerados */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 w-full max-w-5xl mx-auto">
          {ATTRIBUTES.map((attr) => {
            const Icon = attr.icon;
            return (
              <div
                key={attr.id}
                className="card-silver-glass rounded-2xl p-5 sm:p-6 border border-white/10 hover:border-white/25 flex flex-col justify-between transition-all group"
              >
                <div>
                  {/* Topo do Card: Número e Ícone */}
                  <div className="flex items-center justify-between border-b border-white/10 pb-3 mb-3.5">
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-emerald-400 group-hover:scale-105 transition-transform">
                        <Icon className="w-4 h-4" />
                      </div>
                      <h3 className="font-display text-lg sm:text-xl text-white tracking-wide">
                        {attr.label}
                      </h3>
                    </div>
                    <span className="font-mono text-xs font-semibold text-slate-400">
                      {attr.id}
                    </span>
                  </div>

                  {/* Detalhes dos Critérios */}
                  <div className="flex flex-col gap-2 text-xs">
                    {/* Correto */}
                    <div className="flex items-start gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 shrink-0 mt-1.5" />
                      <p className="text-slate-300 leading-snug">
                        <strong className="text-emerald-300 font-medium">Verde:</strong> {attr.exactMatch}
                      </p>
                    </div>

                    {/* Parcial */}
                    {attr.partialMatch && (
                      <div className="flex items-start gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-amber-400 shrink-0 mt-1.5" />
                        <p className="text-slate-300 leading-snug">
                          <strong className="text-amber-300 font-medium">Âmbar:</strong> {attr.partialMatch}
                        </p>
                      </div>
                    )}

                    {/* Direcional */}
                    {attr.directionalMatch && (
                      <div className="flex items-start gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-slate-400 shrink-0 mt-1.5" />
                        <p className="text-slate-300 leading-snug">
                          <strong className="text-slate-200 font-medium">Setas:</strong> {attr.directionalMatch}
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

      </SectionContainer>
    </Section>
  );
}
