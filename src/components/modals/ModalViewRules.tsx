"use client";

import React from "react";
import { Modal } from "@/components/common/Modal";
import { Button } from "@/components/common/Button";
import { HelpCircle, CheckCircle2, AlertTriangle, ArrowUpDown } from "lucide-react";

export interface ModalViewRulesProps {
  /** Determina se o modal está aberto */
  isOpen: boolean;
  /** Callback para fechar o modal */
  onClose: () => void;
}

/**
 * @description View de Regras do Jogo instanciada na página principal.
 * Renderiza em escala ampliada (maxWidth="lg") com design system consistente.
 * 
 * @param {ModalViewRulesProps} props - Propriedades da view.
 */
export function ModalViewRules({ isOpen, onClose }: ModalViewRulesProps) {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Regras do Footle"
      subtitle="Adivinhe o craque do dia das 5 grandes ligas em até 10 tentativas"
      maxWidth="lg"
      icon={<HelpCircle className="w-5 h-5 text-emerald-400" />}
    >
      <div className="flex flex-col gap-3.5 text-xs sm:text-sm text-slate-200 mt-2">
        <p className="text-slate-300 leading-relaxed">
          A cada tentativa, 6 atributos comparativos são avaliados contra o atleta secreto:
        </p>

        {/* Feedback Correto */}
        <div className="flex items-start gap-3 p-3 rounded-2xl bg-white/5 border border-emerald-500/30">
          <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
          <div className="flex flex-col">
            <strong className="text-emerald-300 text-sm">Verde (Correto):</strong>
            <p className="text-slate-300 text-xs mt-0.5 leading-relaxed">
              Mesmo país, mesmo clube atual, mesma liga ou mesma posição.
            </p>
          </div>
        </div>

        {/* Feedback Parcial */}
        <div className="flex items-start gap-3 p-3 rounded-2xl bg-white/5 border border-amber-500/30">
          <AlertTriangle className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
          <div className="flex flex-col">
            <strong className="text-amber-300 text-sm">Amarelo (Parcial):</strong>
            <p className="text-slate-300 text-xs mt-0.5 leading-relaxed">
              Mesmo continente, clube passado em comum no histórico ou margem de gols próxima.
            </p>
          </div>
        </div>

        {/* Feedback Incorreto / Setas */}
        <div className="flex items-start gap-3 p-3 rounded-2xl bg-white/5 border border-white/10">
          <ArrowUpDown className="w-5 h-5 text-slate-400 shrink-0 mt-0.5" />
          <div className="flex flex-col">
            <strong className="text-slate-200 text-sm">Cinza / Setas (Incorreto ou Direcional):</strong>
            <p className="text-slate-300 text-xs mt-0.5 leading-relaxed">
              Não coincide. Para Idade e Gols, as setas indicam se o valor do jogador secreto é mais alto (⬆) ou mais baixo (⬇).
            </p>
          </div>
        </div>

        {/* Botão de Fechamento */}
        <Button onClick={onClose} className="w-full mt-2">
          Entendido
        </Button>
      </div>
    </Modal>
  );
}
