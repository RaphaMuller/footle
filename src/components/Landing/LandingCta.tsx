"use client";

import React from "react";
import Link from "next/link";
import { Button } from "@/components/common/Button";
import { Section } from "@/components/Landing/Section";
import { SectionContainer } from "@/components/Landing/SectionContainer";
import { Play, Activity } from "lucide-react";

/**
 * @description Seção de fechamento com CTA de conversão e créditos técnicos.
 */
export function LandingCta() {
  return (
    <Section variant="default" size="md" className="py-12 sm:py-20">
      <SectionContainer size="sm" centered padded className="flex flex-col items-center text-center">
        
        {/* Botão de Grande Formato */}
        <Link href="/play" className="w-full sm:w-auto">
          <Button
            variant="gradient"
            size="lg"
            className="w-full sm:w-auto min-w-[280px] sm:min-w-[360px] gap-3 py-4 sm:py-5 px-10 text-base sm:text-lg font-bold shadow-2xl shadow-emerald-950/80 hover:scale-[1.02] transition-transform"
          >
            <Play className="w-5 h-5 fill-white shrink-0" />
            <span>JOGAR O DESAFIO DE HOJE</span>
          </Button>
        </Link>

        {/* Microtexto Inspirado no Spotle */}
        <span className="text-[11px] sm:text-xs font-semibold text-slate-400 tracking-[0.28em] uppercase mt-4">
          FOOTLE • UM NOVO JOGADOR A CADA 24 HORAS
        </span>

        {/* Rodapé Técnico Sutil */}
        <div className="w-full max-w-xl border-t border-white/10 mt-12 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-400">
          <span>© 2026 Footle. Projeto aberto.</span>
          
          <div className="flex items-center gap-4">
            <a
              href="/api/health"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 text-emerald-400 hover:text-emerald-300 transition-colors"
            >
              <Activity className="w-3.5 h-3.5" />
              <span>Status do Banco</span>
            </a>
            <span className="text-white/20">•</span>
            <span>Dados FotMob & Wikidata</span>
          </div>
        </div>

      </SectionContainer>
    </Section>
  );
}
