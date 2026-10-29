"use client";

import React from "react";
import { motion, useReducedMotion } from "motion/react";
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
import { Modal } from "@/components/common/Modal";

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

const LEGEND_ITEMS = [
  {
    id: "correct",
    title: "Verde — Acerto exato",
    description: "Mesmo país, mesmo clube atual, mesma liga, mesma posição, idade ou gols cravados.",
    badgeClass: "tile-status-correct",
    icon: CheckCircle2
  },
  {
    id: "partial",
    title: "Âmbar — Parcial ou ex-clube",
    description: "Mesmo continente, anel aceso em ex-clube em comum ou diferença de até ±25 gols.",
    badgeClass: "tile-status-partial",
    icon: AlertTriangle
  },
  {
    id: "neutral",
    title: "Cinza — Sem vínculo / Direcional",
    description: "Em Idade e Gols, as setas indicam se o craque secreto tem número maior (↑) ou menor (↓).",
    badgeClass: "tile-status-neutral",
    icon: ArrowUpDown
  }
];

const EASE_OUT: [number, number, number, number] = [0.22, 1, 0.36, 1];

/**
 * @example
 * <ModalViewRules isOpen={rulesModal.isOpen} onClose={rulesModal.close} />
 */
export function ModalViewRules({ isOpen, onClose }: ModalViewRulesProps) {
  const reduceMotion = useReducedMotion();

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Como jogar o Footle"
      subtitle="Descubra o atleta secreto do dia em até 10 tentativas"
      maxWidth="lg"
      closeLabel="Entendi"
      icon={<HelpCircle className="w-5 h-5 text-ds-brand" />}
    >
      <div className="flex flex-col gap-5">
        <section aria-labelledby="rules-attributes-title" className="flex flex-col gap-2.5">
          <h3 id="rules-attributes-title" className="text-xs font-bold uppercase tracking-wider text-ds-muted">
            6 atributos comparados a cada chute
          </h3>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
            {ATTRIBUTES.map((attr, idx) => {
              const Icon = attr.icon;
              return (
                <motion.div
                  key={attr.label}
                  initial={reduceMotion ? false : { opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.22, delay: idx * 0.03, ease: EASE_OUT }}
                  className="flex items-center gap-2.5 px-3 py-2.5 rounded-xl bg-ds-inset border border-ds-border text-ds-ink text-xs"
                >
                  <Icon className="w-4 h-4 text-ds-brand shrink-0" aria-hidden="true" />
                  <span className="font-semibold truncate">{attr.label}</span>
                </motion.div>
              );
            })}
          </div>
        </section>

        <section aria-labelledby="rules-legend-title" className="flex flex-col gap-2.5">
          <h3 id="rules-legend-title" className="text-xs font-bold uppercase tracking-wider text-ds-muted">
            Código de cores e dicas
          </h3>

          <div className="flex flex-col gap-2">
            {LEGEND_ITEMS.map((item, idx) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={item.id}
                  initial={reduceMotion ? false : { opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.24, delay: 0.12 + idx * 0.04, ease: EASE_OUT }}
                  className="flex items-start gap-3.5 p-3.5 rounded-xl bg-ds-inset border border-ds-border"
                >
                  <div className={`w-9 h-9 rounded-lg flex items-center justify-center shrink-0 ${item.badgeClass}`}>
                    <Icon className="w-4 h-4 text-white" aria-hidden="true" />
                  </div>

                  <div className="flex flex-col min-w-0">
                    <strong className="text-ds-ink text-xs sm:text-sm font-bold">{item.title}</strong>
                    <p className="text-ds-muted text-xs sm:text-sm mt-0.5">{item.description}</p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </section>
      </div>
    </Modal>
  );
}
