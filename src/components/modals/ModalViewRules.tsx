"use client";

import React from "react";
import { Modal } from "@/components/common/Modal";
import {
  HelpCircle,
  CheckCircle2,
  AlertTriangle,
  ArrowUpDown,
  Globe,
  Shield,
  Trophy,
  Footprints,
  Calendar,
  Flame
} from "lucide-react";

export interface ModalViewRulesProps {
  isOpen: boolean;
  onClose: () => void;
}

const ATTRIBUTES = [
  { label: "Nacionalidade", icon: Globe },
  { label: "Clubes", icon: Shield },
  { label: "Liga", icon: Trophy },
  { label: "Posição", icon: Footprints },
  { label: "Idade", icon: Calendar },
  { label: "Gols", icon: Flame }
];

/**
 * @description Modal de Regras alinhado aos blocos vibrantes do tabuleiro.
 */
export function ModalViewRules({ isOpen, onClose }: ModalViewRulesProps) {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Regras do Footle"
      subtitle="Adivinhe o craque do dia das 5 grandes ligas em até 10 chances"
      maxWidth="lg"
      icon={<HelpCircle className="w-5 h-5 text-stadium-accent" />}
    >
      <div className="flex flex-col gap-4 pt-1">
        <div className="flex flex-col gap-2">
          <span className="text-xs font-bold text-stadium-muted">
            Os 6 atributos avaliados a cada chute:
          </span>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
            {ATTRIBUTES.map((attr) => {
              const Icon = attr.icon;
              return (
                <div
                  key={attr.label}
                  className="flex items-center gap-2 p-2.5 rounded-xl surface-stadium-inset text-stadium-ink text-xs"
                >
                  <Icon className="w-3.5 h-3.5 text-stadium-accent shrink-0" />
                  <span className="font-semibold truncate">{attr.label}</span>
                </div>
              );
            })}
          </div>
        </div>

        <div className="flex flex-col gap-2.5">
          <div className="flex items-start gap-3 p-3.5 rounded-2xl tile-status-correct">
            <CheckCircle2 className="w-5 h-5 text-emerald-300 shrink-0 mt-0.5" />
            <div className="flex flex-col">
              <strong className="text-white text-xs sm:text-sm font-bold">
                Verde (Acerto exato)
              </strong>
              <p className="text-emerald-50/90 text-xs sm:text-sm mt-0.5 leading-relaxed">
                Mesmo país, mesmo clube atual, mesma liga, mesma posição, idade ou gols cravados.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3 p-3.5 rounded-2xl tile-status-partial">
            <AlertTriangle className="w-5 h-5 text-amber-300 shrink-0 mt-0.5" />
            <div className="flex flex-col">
              <strong className="text-white text-xs sm:text-sm font-bold">
                Âmbar (Parcial ou ex-clube)
              </strong>
              <p className="text-amber-50/90 text-xs sm:text-sm mt-0.5 leading-relaxed">
                Mesmo continente, escudo aceso em ex-clube em comum ou margem de até ±25 gols.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3 p-3.5 rounded-2xl tile-status-neutral">
            <ArrowUpDown className="w-5 h-5 text-stadium-muted shrink-0 mt-0.5" />
            <div className="flex flex-col">
              <strong className="text-stadium-ink text-xs sm:text-sm font-bold">
                Neutro / Setas (Direcional)
              </strong>
              <p className="text-stadium-muted text-xs sm:text-sm mt-0.5 leading-relaxed">
                Sem vínculo direto. Em Idade e Gols, as setas apontam se o craque secreto tem um número maior (↑) ou menor (↓).
              </p>
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
}
