"use client";

import React from "react";
import { Modal } from "@/components/common/Modal";
import { HelpCircle, CheckCircle2, AlertTriangle, ArrowUpDown, Globe, Shield, Trophy, Activity, Calendar, Target } from "lucide-react";

export interface ModalViewRulesProps {
  /** Determina se o modal está aberto */
  isOpen: boolean;
  /** Callback para fechar o modal */
  onClose: () => void;
}

const ATTRIBUTES = [
  { label: "Nacionalidade", icon: Globe },
  { label: "Clube Atual", icon: Shield },
  { label: "Liga", icon: Trophy },
  { label: "Posição", icon: Activity },
  { label: "Idade", icon: Calendar },
  { label: "Gols", icon: Target },
];

/**
 * @description View de Regras do Jogo instanciada na página principal.
 * Apresenta chips dos atributos e feedbacks cromáticos com hierarquia limpa, sem redundância de botões.
 * 
 * @param {ModalViewRulesProps} props - Propriedades da view.
 */
export function ModalViewRules({ isOpen, onClose }: ModalViewRulesProps) {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Regras do Footle"
      subtitle="Adivinhe o craque do dia das 5 grandes ligas em até 10 palpites"
      maxWidth="lg"
      icon={<HelpCircle className="w-5 h-5 text-emerald-400" />}
    >
      <div className="flex flex-col gap-4 pt-1">
        {/* Atributos Avaliados em Chips */}
        <div className="flex flex-col gap-2">
          <span className="text-[11px] sm:text-xs uppercase tracking-wider text-slate-400 font-semibold">
            6 Atributos avaliados a cada palpite:
          </span>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
            {ATTRIBUTES.map((attr) => {
              const Icon = attr.icon;
              return (
                <div
                  key={attr.label}
                  className="flex items-center gap-2 p-2 rounded-xl bg-white/5 border border-white/10 text-slate-200 text-xs"
                >
                  <Icon className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <span className="font-medium truncate">{attr.label}</span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Feedback Cards */}
        <div className="flex flex-col gap-2.5">
          {/* Feedback Correto */}
          <div className="flex items-start gap-3 p-3 sm:p-3.5 rounded-2xl bg-emerald-950/20 border border-emerald-500/30">
            <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
            <div className="flex flex-col">
              <strong className="text-emerald-300 text-xs sm:text-sm font-semibold">
                Verde (Correto)
              </strong>
              <p className="text-slate-300 text-xs sm:text-sm mt-0.5 leading-relaxed">
                Mesmo país, mesmo clube atual, mesma liga ou mesma posição exata.
              </p>
            </div>
          </div>

          {/* Feedback Parcial */}
          <div className="flex items-start gap-3 p-3 sm:p-3.5 rounded-2xl bg-amber-950/20 border border-amber-500/30">
            <AlertTriangle className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
            <div className="flex flex-col">
              <strong className="text-amber-300 text-xs sm:text-sm font-semibold">
                Âmbar (Parcial)
              </strong>
              <p className="text-slate-300 text-xs sm:text-sm mt-0.5 leading-relaxed">
                Mesmo continente, ex-clube em comum no histórico ou margem de até ±25 gols.
              </p>
            </div>
          </div>

          {/* Feedback Incorreto / Setas */}
          <div className="flex items-start gap-3 p-3 sm:p-3.5 rounded-2xl bg-white/5 border border-white/10">
            <ArrowUpDown className="w-5 h-5 text-slate-400 shrink-0 mt-0.5" />
            <div className="flex flex-col">
              <strong className="text-slate-200 text-xs sm:text-sm font-semibold">
                Cinza / Setas (Incorreto ou Direcional)
              </strong>
              <p className="text-slate-300 text-xs sm:text-sm mt-0.5 leading-relaxed">
                Sem vínculo direto. Para Idade e Gols, as setas indicam se o jogador secreto é mais velho/novo (⬆/⬇) ou tem mais/menos gols (⬆/⬇).
              </p>
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
}
